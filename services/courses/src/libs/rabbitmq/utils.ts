import { getChannels } from './connection';
import { Exchange, RoutingKey } from './constants';
import { EventPayload } from './types';

export const publishEvent = async (obj: {
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: EventPayload;
}) => {
  const { producerChannel } = getChannels();
  const content = Buffer.from(JSON.stringify(obj.payload));

  producerChannel.publish(obj.exchange, obj.routingKey, content, {
    contentType: 'application/json', // Marks payload as JSON
    persistent: true, // Survives broker restarts when enqueued in a durable queue
  });
  await producerChannel.waitForConfirms(); // Throws if broker fails to enqueue the message
};
