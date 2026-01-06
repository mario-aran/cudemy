// docs: https://reactrouter.com/start/data/installation

import { AuthenticatedLayout } from '@/components/layouts/authenticated-layout';
import { BlankLayout } from '@/components/layouts/blank-layout';
import { SiteLayout } from '@/components/layouts/site-layout';
import { PATHS } from '@/constants/paths';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { AppRoute } from './routes/app';
import { CoursesRoute } from './routes/app/courses';
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
      { path: PATHS.APP_COURSES, Component: CoursesRoute },
    ],
  },
  {
    Component: BlankLayout,
    children: [{ path: '*', Component: NotFoundRoute }],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
