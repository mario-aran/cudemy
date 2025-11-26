import { Queue } from '@/constants';
import { MessageHandlerProps } from '@/types';
import amqplib, { ConsumeMessage } from 'amqplib';

interface StartConsumerProps {
  channel: amqplib.Channel;
  queue: Queue;
  handler: (props: MessageHandlerProps) => Promise<void> | void;
  prefetch?: number;
}

export const startConsumer = async ({
  channel,
  queue,
  handler,
  prefetch = 1,
}: StartConsumerProps) => {
  await channel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    if (msg.properties.contentType !== 'application/json') {
      channel.nack(msg, false, false);
      return;
    }

    void (async () => {
      try {
        await handler({
          routingKey: msg.fields
            .routingKey as MessageHandlerProps['routingKey'],
          payload: JSON.parse(
            msg.content.toString(),
          ) as MessageHandlerProps['payload'],
        });
        channel.ack(msg);
      } catch {
        channel.nack(msg, false, false);
      }
    })();
  };

  await channel.consume(queue, onMessage, {
    noAck: false, // Messages require manual acknowledgment
  });
};
