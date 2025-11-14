// ---------------------------
// TYPES
// ---------------------------

type Values<T extends object> = T[keyof T];
export type Exchange = Values<typeof EXCHANGES>;
export type Queue = Values<typeof QUEUES>;

type RKs = typeof ROUTING_KEYS;
export type RoutingKey = { [K in keyof RKs]: RKs[K][keyof RKs[K]] }[keyof RKs];

// ---------------------------
// CONSTANTS
// ---------------------------

// Name pattern: domain
export const EXCHANGES = {
  COURSES: 'courses',
  MEDIA: 'media',
  ENROLLMENT: 'enrollment',
} as const;

// Name pattern: producer.to.consumer
export const QUEUES = {
  COURSES_TO_MEDIA: 'courses.to.media',
  COURSES_TO_ENROLLMENT: 'courses.to.enrollment',
  MEDIA_TO_COURSES: 'media.to.courses',
  ENROLLMENT_TO_COURSES: 'enrollment.to.courses',
} as const;

// Name pattern: domain.entity.action
export const ROUTING_KEYS = {
  COURSES: {
    LECTURE_CREATED: 'courses.lecture.created',
    LECTURE_DELETED: 'courses.lecture.deleted',
  },
  MEDIA: {
    ASSET_CREATED: 'media.asset.created',
    ASSET_AVAILABLE: 'media.asset.available',
    ASSET_DELETED: 'media.asset.deleted',
  },
  ENROLLMENT: {
    REGISTRATION_CREATED: 'enrollment.registration.created',
    REGISTRATION_CANCELED: 'enrollment.registration.canceled',
  },
} as const;

// ---------------------------
// DERIVED CONSTANTS
// ---------------------------

export const BINDINGS = {
  COURSES_TO_MEDIA: {
    queue: QUEUES.COURSES_TO_MEDIA,
    exchange: EXCHANGES.COURSES,
    routingKeys: Object.values(ROUTING_KEYS.COURSES),
  },
  COURSES_TO_ENROLLMENT: {
    queue: QUEUES.COURSES_TO_ENROLLMENT,
    exchange: EXCHANGES.COURSES,
    routingKeys: Object.values(ROUTING_KEYS.COURSES),
  },
  MEDIA_TO_COURSES: {
    queue: QUEUES.MEDIA_TO_COURSES,
    exchange: EXCHANGES.MEDIA,
    routingKeys: Object.values(ROUTING_KEYS.MEDIA),
  },
  ENROLLMENT_TO_COURSES: {
    queue: QUEUES.ENROLLMENT_TO_COURSES,
    exchange: EXCHANGES.ENROLLMENT,
    routingKeys: Object.values(ROUTING_KEYS.ENROLLMENT),
  },
} as const;
