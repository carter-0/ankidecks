import Navbar from "@/components/global/Navbar";
import {useRouter} from "next/router";
import StandardHero from "@/components/landing/StandardHero";
import StandardHeader from "@/components/landing/StandardHeader";
import {prisma} from "@/lib/db";
import DeckListPreview from "@/components/landing/DeckListPreview";
import FAQ from "@/components/landing/FAQ";
import MainCTA from "@/components/global/MainCTA";

type HomeProps = {
    decks: PartialDeck[],
}

export default function Home(props: HomeProps) {
    const { decks } = props;
    const router = useRouter();

    return (
        <>
            <Navbar />

            <main>
                <StandardHero />
                <StandardHeader />

                <div className={"flex mb-24 flex-col items-center"}>
                    <DeckListPreview decks={decks} />
                </div>

                <FAQ />

                <div className={"max-w-7xl smpp:px-4 mx-auto py-6 sm:px-6 lg:px-8"}>
                    <MainCTA />
                </div>
            </main>
        </>
    )
}

export const getStaticProps: (ctx: any) => Promise<{ redirect: { permanent: boolean; destination: string } } | { redirect: { destination: string } } | { props: {} }> = async (ctx: any) => {
    const decks = await prisma.deck.findMany({
        where: {
            public: true,
        },
        take: 25,
        select: {
            id: true,
            name: true,
            dateCreated: true,
            _count: {
                select: { cards: true }
            }
        },
        orderBy: {
            dateCreated: "desc"
        } as const,
    }) as PartialDeck[];

    console.log(decks)

    return {
        props: {
            decks: JSON.parse(JSON.stringify(decks))
        }
    }
}

export async function getStaticPaths() {
    // When this is true (in preview environments) don't
    // prerender any static pages
    // (faster builds, but slower initial page load)
    if (process.env.SKIP_BUILD_STATIC_GENERATION) {
        return {
            paths: [] as any,
            fallback: 'blocking',
        };
    }

    const topics = await prisma.scrapedTopics.findMany();

    const paths = topics.map((topic) => ({
        params: { subject: topic.name },
    }));

    // { fallback: false } means other routes should 404
    return { paths: [] as any, fallback: 'blocking' };
}