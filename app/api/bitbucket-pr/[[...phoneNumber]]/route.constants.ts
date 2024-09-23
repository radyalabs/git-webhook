export const EVENT_TYPE = {
  created: 'pullrequest:created',
  updated: 'pullrequest:updated',
  approved: 'pullrequest:approved',
  unapproved: 'pullrequest:unapproved',
  cr_created: 'pullrequest:changes_request_created',
  cr_removed: 'pullrequest:changes_request_removed',
  merged: 'pullrequest:fulfilled',
} as const;

export const PHONE_TARGET = process.env.PHONE_TARGET || '';
export const WA_URL = process.env.WA_URL || '';
export const WA_TOKEN = process.env.WA_TOKEN || '';
