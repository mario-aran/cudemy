import { ChannelWrapper } from 'amqp-connection-manager';
import { Exchange, RoutingKey } from './constants';
import { MessagePayload } from './types';

interface PublishProps {
  channel: ChannelWrapper;
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: MessagePayload;
}

export const publish = async ({
  channel,
  exchange,
  routingKey,
  payload,
}: PublishProps) => {
  await channel.publish(exchange, routingKey, payload, {
    persistent: true, // Survives broker restarts when enqueued in a durable queue
  });
};
