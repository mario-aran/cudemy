import amqplib from 'amqplib';
import { Exchange, RoutingKey } from './constants';
import { EventPayload } from './types';

export const publishWithConfirm = async (
  confirmChannel: amqplib.ConfirmChannel,
  obj: { exchange: Exchange; routingKey: RoutingKey; payload: EventPayload },
) => {
  const content = Buffer.from(JSON.stringify(obj.payload));

  confirmChannel.publish(obj.exchange, obj.routingKey, content, {
    contentType: 'application/json', // Marks payload as JSON
    persistent: true, // Survives broker restarts when enqueued in a durable queue
  });
  await confirmChannel.waitForConfirms(); // Throws if broker fails to enqueue the message
};
