import { ROUTING_KEYS, RoutingKey } from '@scope/rabbitmq';

const { ASSET_AVAILABLE, ASSET_DELETED } = ROUTING_KEYS.MEDIA;

interface AssetPayload {
  id: string;
}

interface MediaToCoursesHandlerProps {
  routingKey: RoutingKey;
  payload: Record<string, unknown>;
}

const assetAvailable = (payload: AssetPayload) => payload;
const assetDeleted = (payload: AssetPayload) => payload;

export const mediaToCoursesHandler = ({
  routingKey,
  payload,
}: MediaToCoursesHandlerProps) => {
  switch (routingKey) {
    case ASSET_AVAILABLE:
      assetAvailable(payload as unknown as AssetPayload);
      break;
    case ASSET_DELETED:
      assetDeleted(payload as unknown as AssetPayload);
      break;
  }
};
