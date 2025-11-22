import { ROUTING_KEYS } from './constants';
import { MessageHandlerProps } from './types';

const { REGISTRATION_CREATED, REGISTRATION_CANCELED } = ROUTING_KEYS.ENROLLMENT;

interface RegistrationPayload {
  id: string;
}

const registrationCreated = (payload: RegistrationPayload) => payload;
const registrationCanceled = (payload: RegistrationPayload) => payload;

export const enrollmentToCoursesHandler = ({
  routingKey,
  payload,
}: MessageHandlerProps) => {
  switch (routingKey) {
    case REGISTRATION_CREATED:
      registrationCreated(payload as unknown as RegistrationPayload);
      break;
    case REGISTRATION_CANCELED:
      registrationCanceled(payload as unknown as RegistrationPayload);
      break;
  }
};
