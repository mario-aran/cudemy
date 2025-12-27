// docs: https://reactrouter.com/start/data/installation

import { LandingLayout } from '@/components/layouts/landing-layout';
import { MinimalLayout } from '@/components/layouts/minimal-layout';
import { ProtectedLayout } from '@/components/layouts/protected-layout';
import { PATHS } from '@/constants/paths';
import { createBrowserRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { CourseDetailRoute } from './routes/course/detail';
import { CoursePlayerRoute } from './routes/course/player';
import { HomeRoute } from './routes/home';
import { InstructorUploadRoute } from './routes/instructor/upload';
import { NotFoundRoute } from './routes/not-found';

const router = createBrowserRouter([
  {
    Component: MinimalLayout,
    children: [{ path: '*', Component: NotFoundRoute }],
  },
  {
    Component: LandingLayout,
    children: [{ index: true, Component: HomeRoute }],
  },
  {
    Component: ProtectedLayout,
    children: [
      { index: true, Component: HomeRoute },
      { path: PATHS.INSTRUCTOR_UPLOAD, Component: InstructorUploadRoute },
      { path: PATHS.COURSE_ID, Component: CourseDetailRoute },
      { path: PATHS.COURSE_ID_PLAYER, Component: CoursePlayerRoute },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
