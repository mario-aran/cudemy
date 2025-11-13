// ---------------------------
// TYPES
// ---------------------------

export type Exchange = (typeof EXCHANGES)[keyof typeof EXCHANGES];
export type RoutingKey = (typeof ROUTING_KEYS)[keyof typeof ROUTING_KEYS];

// ---------------------------
// CONSTANTS
// ---------------------------

export const EXCHANGES = {
  COURSES: 'courses',
  MEDIA: 'media',
  ENROLLMENT: 'enrollment',
} as const;

export const QUEUES = {
  COURSES_MEDIA: 'courses.media',
  COURSES_ENROLLMENT: 'courses.enrollment',
  MEDIA_COURSES: 'media.courses',
  ENROLLMENT_COURSES: 'enrollment.courses',
} as const;

export const ROUTING_KEYS = {
  LECTURE_CREATED: 'lecture.created',
  LECTURE_DELETED: 'lecture.deleted',
  ASSET_CREATED: 'asset.created',
  ASSET_AVAILABLE: 'asset.available',
  ASSET_DELETED: 'asset.deleted',
  ENROLLMENT_CREATED: 'enrollment.created',
  ENROLLMENT_CANCELLED: 'enrollment.cancelled',
} as const;

// ---------------------------
// DERIVED CONSTANTS
// ---------------------------

export const BINDINGS = [
  {
    exchange: EXCHANGES.COURSES,
    queue: QUEUES.COURSES_MEDIA,
    routingKeys: [ROUTING_KEYS.LECTURE_CREATED, ROUTING_KEYS.LECTURE_DELETED],
  },
  {
    exchange: EXCHANGES.MEDIA,
    queue: QUEUES.MEDIA_COURSES,
    routingKeys: [
      ROUTING_KEYS.ASSET_CREATED,
      ROUTING_KEYS.ASSET_AVAILABLE,
      ROUTING_KEYS.ASSET_DELETED,
    ],
  },
  {
    exchange: EXCHANGES.ENROLLMENT,
    queue: QUEUES.ENROLLMENT_COURSES,
    routingKeys: [
      ROUTING_KEYS.ENROLLMENT_CREATED,
      ROUTING_KEYS.ENROLLMENT_CANCELLED,
    ],
  },
] as const;
