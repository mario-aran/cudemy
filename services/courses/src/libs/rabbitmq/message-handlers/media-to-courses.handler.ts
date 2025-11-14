import { ROUTING_KEYS } from '@/libs/rabbitmq/constants';
import { MessageHandlerProps } from '@/libs/rabbitmq/types';

const { ASSET_AVAILABLE, ASSET_DELETED } = ROUTING_KEYS.MEDIA;

interface AssetAvailablePayload {
  id: string;
}

interface AssetDeletedPayload {
  name: string;
}

const assetAvailable = (payload: AssetAvailablePayload) => {
  return payload.id;
};

const assetDeleted = (payload: AssetDeletedPayload) => {
  return payload.name;
};

export const mediaToCoursesHandler = ({
  routingKey,
  payload,
}: MessageHandlerProps) => {
  switch (routingKey) {
    case ASSET_AVAILABLE:
      assetAvailable(payload as unknown as AssetAvailablePayload);
      break;
    case ASSET_DELETED:
      assetDeleted(payload as unknown as AssetDeletedPayload);
      break;
  }
};
