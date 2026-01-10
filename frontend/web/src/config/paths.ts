const SEGMENTS = {
  AUTH: 'auth',
  REGISTER: 'register',
  LOGIN: 'login',
  APP: 'app',
  COURSES: 'courses',
  COURSE_ID: ':courseId',
} as const;

export const paths = {
  root: '/',
  authRegister: `/${SEGMENTS.AUTH}/${SEGMENTS.REGISTER}`,
  authLogin: `/${SEGMENTS.AUTH}/${SEGMENTS.LOGIN}`,
  app: `/${SEGMENTS.APP}`,
  appCourses: `/${SEGMENTS.APP}/${SEGMENTS.COURSES}`,
  appCoursesId: `/${SEGMENTS.APP}/${SEGMENTS.COURSES}/${SEGMENTS.COURSE_ID}`,
} as const;
