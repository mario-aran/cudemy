import { ChannelWrapper } from 'amqp-connection-manager';
import { Exchange, RoutingKey } from './constants';
import { MessagePayload } from './types';

interface PublishProps {
  channelWrapper: ChannelWrapper;
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: MessagePayload;
}

export const publish = async ({
  channelWrapper,
  exchange,
  routingKey,
  payload,
}: PublishProps) => {
  await channelWrapper.publish(exchange, routingKey, payload, {
    persistent: true, // Survives broker restarts when enqueued in a durable queue
  });
};
