import { getChannel } from '@/libs/rabbitmq/connection';
import { Exchange, RoutingKey } from '@/libs/rabbitmq/constants';

export const publishEvent = (
  exchange: Exchange,
  routingKey: RoutingKey,
  payload: Record<string, unknown>,
) => {
  const channel = getChannel();
  const message = Buffer.from(JSON.stringify(payload));

  channel.publish(exchange, routingKey, message, { persistent: true });
};
