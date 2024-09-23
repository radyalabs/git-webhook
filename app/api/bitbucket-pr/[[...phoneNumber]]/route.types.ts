export interface PullRequestBase {
  repository: Repository;
  actor: Account;
  pullrequest: PullRequest;
}

export interface PullRequestApproval extends PullRequestBase {
  approval: Approval;
}

export interface Approval {
  date: string;
  user: Account;
}

export interface PullRequest {
  comment_count: number;
  task_count: number;
  type: string;
  id: number;
  title: string;
  description: string;
  rendered: Rendered;
  state: string;
  merge_commit?: string;
  close_source_branch: boolean;
  closed_by?: Account;
  author: Account;
  reason: string;
  created_on: string;
  updated_on: string;
  destination: Destination;
  source: Source;
  reviewers: Account[];
  participants: Participant[];
  links: PullRequestLinks;
  summary: Title;
}

export interface PullRequestLinks {
  self: Self;
  html: Self;
  commits: Self;
  approve: Self;
  'request-changes': Self;
  diff: Self;
  diffstat: Self;
  comments: Self;
  activity: Self;
  merge: Self;
  decline: Self;
  statuses: Self;
}

export interface Participant {
  type: string;
  user: Account;
  role: string;
  approved: boolean;
  state: ApprovalKey;
  participated_on?: string;
}

export interface Source {
  branch: SourceBranch;
  commit: Commit;
  repository: ExternalRepo;
}

export interface SourceBranch {
  name: string;
  links: Links;
}

export interface Destination {
  branch: Branch;
  commit: Commit;
  repository: ExternalRepo;
}

export interface ExternalRepo {
  type: string;
  full_name: string;
  links: Links;
  name: string;
  uuid: string;
}

export interface Commit {
  hash: string;
  links: CommitLinks;
  type: string;
}

export interface CommitLinks {
  self: Self;
  html: Self;
}

export interface Branch {
  name: string;
}

export interface Rendered {
  title: Title;
  description: Title;
}

export interface Title {
  type: string;
  raw: string;
  markup: string;
  html: string;
}

export interface Repository {
  type: string;
  full_name: string;
  links: Links;
  name: string;
  scm: string;
  website?: Links;
  owner: Account;
  workspace: Workspace;
  is_private: boolean;
  project: Project;
  uuid: string;
  parent?: Links;
}

export interface Project {
  type: string;
  key: string;
  uuid: string;
  name: string;
  links: Links;
}

export interface Workspace {
  type: string;
  uuid: string;
  name: string;
  slug: string;
  links: Links;
}

export interface Account {
  display_name: string;
  links: Links;
  type: string;
  uuid: string;
  account_id: string;
  nickname: string;
}

export interface Links {
  self: Self;
  html: Self;
  avatar: Self;
}

export interface Self {
  href: string;
}

export type EventKey =
  | 'pullrequest:created'
  | 'pullrequest:updated'
  | 'pullrequest:approved'
  | 'pullrequest:unapproved'
  | 'pullrequest:changes_request_created'
  | 'pullrequest:changes_request_removed'
  | 'pullrequest:fulfilled';

export type ApprovalKey = 'changes_requested' | 'approved' | null;
