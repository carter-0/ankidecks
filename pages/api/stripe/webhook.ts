import Cors from 'micro-cors';
import Stripe from "stripe";
import {NextApiRequest, NextApiResponse} from "next";
import { buffer } from 'micro';
import {prisma} from "@/lib/db";

const cors = Cors({
    allowMethods: ['POST', 'HEAD'],
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!

export const config = {
    api: {
        bodyParser: false,
    },
}

const webhookHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
            apiVersion: '2022-11-15',
        })

        const buf = await buffer(req)
        const sig = req.headers['stripe-signature']!

        let event: Stripe.Event

        try {
            event = stripe.webhooks.constructEvent(buf.toString(), sig, webhookSecret)
        } catch (err: any) {
            // On error, log and return the error message
            console.log(`❌ Error message: ${err.message}`)
            res.status(400).send(`Webhook Error: ${err.message}`)
            return
        }

        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object as Stripe.Checkout.Session
                console.log(session)

                const userId = session.metadata.userId
                console.log(session.customer)
                console.log(session.subscription)

                await prisma.user.update({
                    where: {
                        userId: userId
                    },
                    data: {
                        stripeSubscriptionId: session.id,
                        freeAccount: false,
                        tokenAllowance: 10000000
                    }
                })

                break;
        }

        console.log('✅ Success:', event.id)
    }
}

export default cors(webhookHandler as any);
