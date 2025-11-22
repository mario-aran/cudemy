import { RoutingKey } from './constants';

export type EventPayload = Record<string, unknown>;

export interface MessageHandlerProps {
  routingKey: RoutingKey;
  payload: EventPayload;
}
