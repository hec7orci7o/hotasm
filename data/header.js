import {
  BoltIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export const capabilities = {
  name: 'Capabilities',
  icon: BoltIcon,
  items: [
    {
      text: 'Remembers what user said earlier in the conversation',
    },
    {
      text: 'Allows user to provide follow-up corrections',
    },
    {
      text: 'Trained to decline inappropriate requests',
    },
  ],
};
export const limitations = {
  name: 'Limitations',
  icon: ExclamationTriangleIcon,
  items: [
    {
      text: 'May occasionally generate incorrect information',
    },
    {
      text: 'May occasionally produce harmful instructions or biased content',
    },
    {
      text: 'Limited knowledge of world and events after 2021',
    },
  ],
};
