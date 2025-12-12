export const USER_ROLES = {
  ADMIN: 'admin',
  MODERATOR: 'moderator',
  USER: 'user'
}

export const EVENT_CATEGORIES = {
  MEETING: 'meeting',
  FORMATION: 'formation',
  SPORT: 'sport',
  CULTURE: 'culture',
  ART: 'art',
  CONFERENCE: 'conference'
}

export const EVENT_STATUS = {
  UPCOMING: 'upcoming',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
}

export const ACTIVITY_CATEGORIES = {
  SPORT: 'sport',
  ART: 'art',
  SCIENCE: 'science',
  PRATIQUE: 'pratique'
}

export const NEWS_CATEGORIES = {
  ANNONCE: 'annonce',
  SPORT: 'sport',
  CULTURE: 'culture',
  FORMATION: 'formation',
  SOLIDARITE: 'solidarité',
  PARTENARIAT: 'partenariat'
}

export const NEWS_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  ARCHIVED: 'archived'
}

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
}

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  EVENTS: '/dashboard/events',
  MEMBERS: '/dashboard/membres',
  CHILDREN: '/dashboard/children',
  ACTIVITIES: '/dashboard/programme',
  NEWS: '/dashboard/actuality',
  STATS: '/dashboard/stats'
}

export const PERMISSIONS = {
  [USER_ROLES.ADMIN]: ['read', 'write', 'delete', 'manage'],
  [USER_ROLES.MODERATOR]: ['read', 'write'],
  [USER_ROLES.USER]: ['read']
}

export const DEFAULT_PAGINATION = {
  page: 1,
  limit: 10,
  total: 0
}

export const FORM_VALIDATION_MESSAGES = {
  REQUIRED: 'Ce champ est requis',
  EMAIL_INVALID: 'Adresse email invalide',
  PASSWORD_MIN_LENGTH: 'Le mot de passe doit contenir au moins 6 caractères',
  PHONE_INVALID: 'Numéro de téléphone invalide',
  DATE_INVALID: 'Date invalide'
}