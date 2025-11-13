import { getChannel } from '@/libs/rabbitmq/connection';

export const registerConsumer = async (
  queue: string,
  messageHandler: (payload: unknown) => Promise<void> | void,
) => {
  const channel = getChannel();
  await channel.consume(queue, (msg) => {
    if (!msg) return;

    void (async () => {
      const rawPayload = msg.content.toString();
      await messageHandler(JSON.parse(rawPayload));
      channel.ack(msg);
    })();
  });
};
