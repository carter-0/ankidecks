import * as amqp from 'amqplib';
const rabbitmqUrl = process.env.RABBIT_MQ_URL
const queueName = 'anki_decks';

export async function sendRabbitMQMessage(data: any) {
    const connection = await amqp.connect(rabbitmqUrl);
    const channel = await connection.createChannel();
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)));
    console.log(` [x] Message sent to ${queueName}: ${JSON.stringify(data)}`);
    await channel.close();
    await connection.close();
}
