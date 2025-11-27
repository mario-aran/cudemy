import { ROUTING_KEYS, RoutingKey } from '@scope/rabbitmq';

const { ASSET_AVAILABLE, ASSET_DELETED } = ROUTING_KEYS.MEDIA;

// ---------------------------
// TYPES
// ---------------------------

interface AssetPayload {
  id: string;
}

interface CoursesToMediaHandlerProps {
  routingKey: RoutingKey;
  payload: object;
}

// ---------------------------
// UTILS
// ---------------------------

const assetAvailable = (payload: AssetPayload) => payload;
const assetDeleted = (payload: AssetPayload) => payload;

export const coursesToMediaHandler = ({
  routingKey,
  payload,
}: CoursesToMediaHandlerProps) => {
  switch (routingKey) {
    case ASSET_AVAILABLE:
      assetAvailable(payload as AssetPayload);
      break;
    case ASSET_DELETED:
      assetDeleted(payload as AssetPayload);
      break;
  }
};
