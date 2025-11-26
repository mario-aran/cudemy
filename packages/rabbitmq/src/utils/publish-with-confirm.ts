import { Exchange, RoutingKey } from '@/constants';
import { EventPayload } from '@/types';
import amqplib from 'amqplib';

interface PublishWithConfirmProps {
  confirmChannel: amqplib.ConfirmChannel;
  exchange: Exchange;
  routingKey: RoutingKey;
  payload: EventPayload;
}

export const publishWithConfirm = async ({
  confirmChannel,
  exchange,
  routingKey,
  payload,
}: PublishWithConfirmProps) => {
  const content = Buffer.from(JSON.stringify(payload));

  confirmChannel.publish(exchange, routingKey, content, {
    contentType: 'application/json', // Marks payload as JSON
    persistent: true, // Survives broker restarts when enqueued in a durable queue
  });

  await confirmChannel.waitForConfirms(); // Throws if broker fails to enqueue the message
};
