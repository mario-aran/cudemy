import { MessageProps } from '@scope/rabbitmq';

export const enrollmentToCoursesHandler = (props: MessageProps) => {
  console.log(props);
};
