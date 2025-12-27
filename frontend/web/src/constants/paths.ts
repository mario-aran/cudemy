export const SEGMENTS = {
  ID: '/:id',
  COURSE: '/course',
  PLAYER: '/player',
  INSTRUCTOR: '/instructor',
  UPLOAD: '/upload',
} as const;

export const PATHS = {
  COURSE_ID: `${SEGMENTS.COURSE}${SEGMENTS.ID}`,
  COURSE_ID_PLAYER: `${SEGMENTS.COURSE}${SEGMENTS.ID}${SEGMENTS.PLAYER}`,
  INSTRUCTOR_UPLOAD: `${SEGMENTS.INSTRUCTOR}${SEGMENTS.UPLOAD}`,
} as const;
