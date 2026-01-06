export const SEGMENTS = {
  ID: '/:id',
  APP: '/app',
  COURSES: '/courses',
} as const;

export const PATHS = {
  APP: SEGMENTS.APP,
  APP_COURSES: `${SEGMENTS.APP}${SEGMENTS.COURSES}`,
} as const;
