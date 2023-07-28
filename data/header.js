import {
  BoltIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

export const capabilities = {
  name: 'Capacidades',
  icon: BoltIcon,
  items: [
    {
      text: 'Guarda el trabajo del usuario para consultarlo más tarde',
    },
    {
      text: 'Permite la traducción a diferentes formatos como: binario, logisim',
    },
    {
      text: 'Permite al usuario definir ISA personalizadas',
    },
  ],
};

export const limitations = {
  name: 'Limitaciones',
  icon: ExclamationTriangleIcon,
  items: [
    {
      text: 'El soporte es limitado y los fallos se resuelven gradualmente',
    },
    {
      text: 'El soporte es limitado y los fallos se resuelven gradualmente',
    },
    {
      text: 'La información no persiste en una base de datos',
    },
  ],
};
