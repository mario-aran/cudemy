import { getChannel } from '@/libs/rabbitmq/connection';
import { Exchange, RoutingKey } from '@/libs/rabbitmq/constants';

interface PublishEventProps {
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: Record<string, unknown>;
}

export const publishEvent = ({
  exchange,
  routingKey,
  payload,
}: PublishEventProps) => {
  const channel = getChannel();
  const message = Buffer.from(JSON.stringify(payload));

  channel.publish(exchange, routingKey, message, {
    contentType: 'application/json',
    persistent: true,
    mandatory: true,
  });
};
