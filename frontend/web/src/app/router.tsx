// docs: https://reactrouter.com/start/data/installation

import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { CourseDetailRoute } from './routes/course/detail.route';
import { CoursePlayerRoute } from './routes/course/player.route';
import { HomeRoute } from './routes/home.route';
import { InstructorUploadRoute } from './routes/instructor/upload.route';
import { NotFoundRoute } from './routes/not-found.route';

const router = createBrowserRouter([
  { path: '/', Component: HomeRoute },
  { path: '/course/:courseId', Component: CourseDetailRoute },
  { path: '/course/:courseId/player', Component: CoursePlayerRoute },
  { path: '/instructor/upload', Component: InstructorUploadRoute },
  { path: '*', Component: NotFoundRoute },
]);

export const AppRouter = () => {
  return <RouterProvider router={router} />;
};
