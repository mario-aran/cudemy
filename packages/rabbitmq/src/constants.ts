// ---------------------------
// TYPES
// ---------------------------

type Values<T> = T[keyof T];
export type Exchange = Values<typeof EXCHANGES>;
export type QueueBinding = Values<typeof QUEUE_BINDINGS>;

type NestedValues<T> = { [K in keyof T]: T[K][keyof T[K]] }[keyof T];
export type RoutingKey = NestedValues<typeof ROUTING_KEYS>;

// ---------------------------
// CONSTANTS
// ---------------------------

// Exchange pattern: 'domain'
export const EXCHANGES = {
  COURSES: 'courses',
  MEDIA: 'media',
  ENROLLMENT: 'enrollment',
} as const;

// RoutingKey pattern: 'domain.entity.action'
export const ROUTING_KEYS = {
  COURSES: {
    LECTURE_CREATED: 'courses.lecture.created',
    LECTURE_DELETED: 'courses.lecture.deleted',
  },
  MEDIA: {
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

// Queue pattern: 'producer.to.consumer'
export const QUEUE_BINDINGS = {
  COURSES_TO_MEDIA: {
    queue: 'courses.to.media',
    exchange: EXCHANGES.COURSES,
    routingKeys: Object.values(ROUTING_KEYS.COURSES),
  },
  COURSES_TO_ENROLLMENT: {
    queue: 'courses.to.enrollment',
    exchange: EXCHANGES.COURSES,
    routingKeys: Object.values(ROUTING_KEYS.COURSES),
  },
  MEDIA_TO_COURSES: {
    queue: 'media.to.courses',
    exchange: EXCHANGES.MEDIA,
    routingKeys: Object.values(ROUTING_KEYS.MEDIA),
  },
  ENROLLMENT_TO_COURSES: {
    queue: 'enrollment.to.courses',
    exchange: EXCHANGES.ENROLLMENT,
    routingKeys: Object.values(ROUTING_KEYS.ENROLLMENT),
  },
} as const;
