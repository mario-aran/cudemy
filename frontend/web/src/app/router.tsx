// docs: https://reactrouter.com/start/data/installation

import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
import { HeadlessLayout } from '@/components/layouts/headless-layout';
import { SiteLayout } from '@/components/layouts/site-layout';
import { PATHS } from '@/constants/paths';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AppRoute } from './routes/app';
import { CourseDetailRoute } from './routes/app/course/course-detail';
import { CoursePlayerRoute } from './routes/app/course/course-player';
import { InstructorUploadRoute } from './routes/app/instructor/instructor-upload';
import { HomeRoute } from './routes/home';
import { NotFoundRoute } from './routes/not-found';

const router = createBrowserRouter([
  {
    Component: SiteLayout,
    children: [{ path: '/', Component: HomeRoute }],
  },
  {
    Component: AuthenticatedLayout,
    children: [
      { path: PATHS.APP, Component: AppRoute },
      { path: PATHS.APP_COURSE_ID, Component: CourseDetailRoute },
      { path: PATHS.APP_COURSE_ID_PLAYER, Component: CoursePlayerRoute },
      { path: PATHS.APP_INSTRUCTOR_UPLOAD, Component: InstructorUploadRoute },
    ],
  },
  {
    Component: HeadlessLayout,
    children: [{ path: '*', Component: NotFoundRoute }],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
