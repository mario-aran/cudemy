import { Exchange, Queue, RoutingKey } from '@/constants';
import amqplib from 'amqplib';

export const setupConsumerQueue = async (
  channel: amqplib.Channel,
  obj: { queue: Queue; exchange: Exchange; routingKeys: RoutingKey[] },
) => {
  await channel.assertQueue(obj.queue, { durable: true });

  for (const key of obj.routingKeys) {
    await channel.bindQueue(obj.queue, obj.exchange, key);
  }
};
