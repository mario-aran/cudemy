import { MessageProps, ROUTING_KEYS } from '@scope/rabbitmq';

const { ASSET_AVAILABLE, ASSET_DELETED } = ROUTING_KEYS.MEDIA;

// ---------------------------
// TYPES
// ---------------------------

interface AssetPayload {
  id: string;
}

// ---------------------------
// UTILS
// ---------------------------

const assetAvailable = (payload: AssetPayload) => payload;
const assetDeleted = (payload: AssetPayload) => payload;

export const mediaToCoursesHandler = ({
  routingKey,
  payload,
}: MessageProps) => {
  switch (routingKey) {
    case ASSET_AVAILABLE:
      assetAvailable(payload as unknown as AssetPayload);
      break;
    case ASSET_DELETED:
      assetDeleted(payload as unknown as AssetPayload);
      break;
  }
};
