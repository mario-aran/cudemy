import { ROUTING_KEYS } from './constants';
import { MessageHandlerProps } from './types';

const { ASSET_AVAILABLE, ASSET_DELETED } = ROUTING_KEYS.MEDIA;

interface AssetPayload {
  id: string;
}

const assetAvailable = (payload: AssetPayload) => payload;
const assetDeleted = (payload: AssetPayload) => payload;

export const mediaToCoursesHandler = ({
  routingKey,
  payload,
}: MessageHandlerProps) => {
  switch (routingKey) {
    case ASSET_AVAILABLE:
      assetAvailable(payload as unknown as AssetPayload);
      break;
    case ASSET_DELETED:
      assetDeleted(payload as unknown as AssetPayload);
      break;
  }
};
