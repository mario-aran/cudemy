// docs: https://reactrouter.com/start/data/installation

import { AppLayout } from '@/components/layouts/app-layout';
import { BlankLayout } from '@/components/layouts/blank-layout';
import { PublicLayout } from '@/components/layouts/public-layout';
import { PATHS } from '@/constants/paths';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AppRoute } from './routes/app';
import { CoursesRoute } from './routes/app/courses';
import { HomeRoute } from './routes/home';
import { NotFoundRoute } from './routes/not-found';

const router = createBrowserRouter([
  {
    Component: PublicLayout,
    children: [{ path: '/', Component: HomeRoute }],
  },
  {
    Component: AppLayout,
    children: [
      { path: PATHS.APP, Component: AppRoute },
      { path: PATHS.APP_COURSES, Component: CoursesRoute },
    ],
  },
  {
    Component: BlankLayout,
    children: [{ path: '*', Component: NotFoundRoute }],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
