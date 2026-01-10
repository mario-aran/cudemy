export const SEGMENTS = {
  APP: 'app',
  COURSES: 'courses',
  COURSE_ID: ':courseId',
} as const;

export const PATHS = {
  APP: `/${SEGMENTS.APP}`,
  APP_COURSES: `/${SEGMENTS.APP}/${SEGMENTS.COURSES}`,
  APP_COURSES_ID: `/${SEGMENTS.APP}/${SEGMENTS.COURSES}/${SEGMENTS.COURSE_ID}`,
} as const;
