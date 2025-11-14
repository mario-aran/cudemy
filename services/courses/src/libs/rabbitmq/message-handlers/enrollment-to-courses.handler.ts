import { ROUTING_KEYS } from '@/libs/rabbitmq/constants';
import { MessageHandlerProps } from '@/libs/rabbitmq/types';

const { REGISTRATION_CREATED, REGISTRATION_CANCELED } = ROUTING_KEYS.ENROLLMENT;

interface RegistrationCreatedPayload {
  id: string;
}

interface RegistrationCanceledPayload {
  name: string;
}

const registrationCreated = (payload: RegistrationCreatedPayload) => {
  return payload.id;
};

const registrationCanceled = (payload: RegistrationCanceledPayload) => {
  return payload.name;
};

export const enrollmentToCoursesHandler = ({
  routingKey,
  payload,
}: MessageHandlerProps) => {
  switch (routingKey) {
    case REGISTRATION_CREATED:
      registrationCreated(payload as unknown as RegistrationCreatedPayload);
      break;
    case REGISTRATION_CANCELED:
      registrationCanceled(payload as unknown as RegistrationCanceledPayload);
      break;
  }
};
