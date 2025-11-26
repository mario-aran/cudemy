import { Exchange } from '@/constants';
import amqplib from 'amqplib';

export const assertExchange = async (
  channel: amqplib.Channel,
  exchange: Exchange,
) => channel.assertExchange(exchange, 'direct', { durable: true });
