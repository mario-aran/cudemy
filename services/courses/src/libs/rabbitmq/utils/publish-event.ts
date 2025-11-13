import { channel } from '@/libs/rabbitmq/connection';
import { Exchange, RoutingKey } from '@/libs/rabbitmq/constants';

export const publishEvent = (
  exchange: Exchange,
  routingKey: RoutingKey,
  payload: Record<string, unknown>,
) => {
  if (!channel) throw new Error('RabbitMQ channel not initialized');

  const message = Buffer.from(JSON.stringify(payload));
  return channel.publish(exchange, routingKey, message, { persistent: true });
};
