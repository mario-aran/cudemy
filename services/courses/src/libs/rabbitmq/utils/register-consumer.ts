import { getChannel } from '@/libs/rabbitmq/connection';
import { ConsumeMessage } from 'amqplib';

interface RegisterConsumerProps {
  queue: string;
  handler: (payload: unknown) => Promise<void> | void;
  prefetch?: number;
}

export const registerConsumer = async ({
  queue,
  handler,
  prefetch = 1,
}: RegisterConsumerProps) => {
  const channel = getChannel();
  await channel.prefetch(prefetch);

  const onMessage = (msg: ConsumeMessage | null) => {
    if (!msg) return;

    void (async () => {
      try {
        const rawPayload = msg.content.toString();
        await handler(JSON.parse(rawPayload));
        channel.ack(msg);
      } catch {
        channel.nack(msg, false, false);
      }
    })();
  };
  await channel.consume(queue, onMessage, { noAck: false });
};
