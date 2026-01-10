// docs: https://reactrouter.com/start/data/installation

import { AppLayout } from '@/components/layouts/app-layout';
import { BlankLayout } from '@/components/layouts/blank-layout';
import { PublicLayout } from '@/components/layouts/public-layout';
import { PATHS, SEGMENTS } from '@/constants/paths';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { CoursesRoute } from './routes/app/courses';
import { HomeRoute } from './routes/app/home';
import { LandingRoute } from './routes/landing';
import { NotFoundRoute } from './routes/not-found';

const router = createBrowserRouter([
  {
    path: '/',
    Component: PublicLayout,
    children: [{ index: true, Component: LandingRoute }],
  },
  {
    path: PATHS.APP,
    Component: AppLayout,
    children: [
      { index: true, Component: HomeRoute },
      {
        path: SEGMENTS.COURSES,
        children: [
          { index: true, Component: CoursesRoute },
          { path: SEGMENTS.COURSE_ID },
        ],
      },
    ],
  },
  {
    Component: BlankLayout,
    children: [{ path: '*', Component: NotFoundRoute }],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
