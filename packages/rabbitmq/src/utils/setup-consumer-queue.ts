import { Exchange, Queue, RoutingKey } from '@/constants';
import amqplib from 'amqplib';

interface SetupConsumerQueueProps {
  channel: amqplib.Channel;
  queue: Queue;
  exchange: Exchange;
  routingKeys: RoutingKey[];
}

export const setupConsumerQueue = async ({
  channel,
  queue,
  exchange,
  routingKeys,
}: SetupConsumerQueueProps) => {
  await channel.assertQueue(queue, { durable: true });

  for (const key of routingKeys) {
    await channel.bindQueue(queue, exchange, key);
  }
};
