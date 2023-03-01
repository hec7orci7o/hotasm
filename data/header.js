import {
  BoltIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export const capabilities = {
  name: 'Capabilities',
  icon: BoltIcon,
  items: [
    {
      text: 'Saves user\'s work for later reference',
    },
    {
      text: 'Allows translation to different formats such us: binary, logisim',
    },
    {
      text: 'allows the user to define custom ISAs',
    },
  ],
};

export const limitations = {
  name: 'Limitations',
  icon: ExclamationTriangleIcon,
  items: [
    {
      text: 'Support is limited and bugs are solved gradually',
    },
    {
      text: 'Improper navigation can lead to bugs that can cause you to lose your work',
    },
    {
      text: 'The information does not persist in a database',
    },
  ],
};
