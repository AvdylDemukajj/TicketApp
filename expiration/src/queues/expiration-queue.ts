import Queue from 'bull';
import { ExpirationCompletePublisher } from '../events/publishers/expiration-created-publisher';
import { natsWrapper } from '../nats-wrapper';

interface Payload {
    orderId: string;
}

const expirationQueue = new Queue<Payload>('order:expiration',{
    redis: {
        host: process.env.REDIS_HOST,
    },
});
console.log('connected to Redis');

expirationQueue.process(async (job) => {
    const publisher = new ExpirationCompletePublisher(natsWrapper.client);
    await publisher.publish({
        orderId: job.data.orderId,
    });
});

export { expirationQueue };

