import {EVENT_TYPE, PHONE_TARGET, WA_TOKEN, WA_URL} from './route.constants';
import type { PullRequestBase } from './route.types';

const sendMessage = async (message: string) => {
  const formData = new FormData();
  formData.append('phone', PHONE_TARGET);
  formData.append('message', message);
  await fetch(WA_URL, {
    method: 'POST',
    headers: {
      Authorization: WA_TOKEN,
    },
    body: formData,
  });
};

const onCreatedPR = async (data: PullRequestBase) => {
  const {
    actor: {
      display_name: displayName,
    },
    pullrequest: {
      links: {
        html: {
          href: prLink,
        },
      },
      id,
      title,
      reviewers,
    },
    repository: {
      name: repositoryName,
    },
  } = data || {};
  const message = `🆕 *${repositoryName}* PR #${id} created by ${displayName}
 
${title}
${prLink}
*Reviewers*: ${reviewers.length > 0 ? reviewers.map((reviewer) => reviewer.display_name).join(', ') : 'None'}`;
  await sendMessage(message);
};

const onUpdatedPR = async (data: PullRequestBase) => {
  const {
    pullrequest: {
      links: {
        html: {
          href: prLink,
        },
      },
      author: {
        display_name: displayName,
      },
      id,
      title,
      reviewers,
    },
    repository: {
      name: repositoryName,
    },
  } = data || {};
  const message = `🆕 *${repositoryName}* PR #${id} updated
 
${title}
${prLink}
*Author*: ${displayName}
*Reviewers*: ${reviewers.length > 0 ? reviewers.map((reviewer) => reviewer.display_name).join(', ') : 'None'}`;
  await sendMessage(message);
};

const onApproval = async (data: PullRequestBase) => {
  const {
    pullrequest: {
      links: {
        html: {
          href: prLink,
        },
      },
      author: {
        display_name: displayName,
      },
      id,
      title,
      participants,
      comment_count: commentCount = 0,
    },
    repository: {
      name: repositoryName,
    },
  } = data || {};
  const message = `✍🏻 *${repositoryName}* PR #${id} approval status update
 
${title}
${prLink}
*Author*: ${displayName}
*Approval Status*: ${participants.map((p) => (
    `${p.user.display_name}${p.state === 'approved' ? ' ✅' : ''}${p.state === 'changes_requested' ? ' ⛔' : ''}`
  )).join(', ')}
*Comment Count*: ${commentCount}`;
  await sendMessage(message);
};

const onMergedPR = async (data: PullRequestBase) => {
  const {
    actor: {
      display_name: mergedByName,
    },
    pullrequest: {
      links: {
        html: {
          href: prLink,
        },
      },
      author: {
        display_name: displayName,
      },
      id,
      title,
    },
    repository: {
      name: repositoryName,
    },
  } = data || {};
  const message = `🚀 *${repositoryName}* PR #${id} *merged* by ${mergedByName}
 
${title}
${prLink}
*Author*: ${displayName}`;
  await sendMessage(message);
};

export const POST = async (request: Request) => {
  const {
    created,
    merged,
    updated,
  } = EVENT_TYPE;

  const data = await request.json();
  const eventType = request.headers.get('x-event-key');

  if (eventType) {
    switch (eventType) {
      case created: {
        await onCreatedPR(data);
        break;
      }
      case updated: {
        await onUpdatedPR(data);
        break;
      }
      case merged: {
        await onMergedPR(data);
        break;
      }
      default: {
        await onApproval(data);
        break;
      }
    }
  }

  return new Response();
};
