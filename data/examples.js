export const defaultConfig = {
  bits: 16,
  rules: [],
};

export const defaultEditor = {
  lines: [],
};

export const exConfig1 = {
  bits: 8,
  rules: [
    'nop; 000 7:5;',
  ],
};

export const exEditor1 = {
  lines: ['nop;'],
};

export const exConfig2 = {
  bits: 16,
  rules: [
    'nop; 000 15:13;',
  ],
};

export const exEditor2 = {
  lines: ['nop;'],
};

export const exConfig3 = {
  bits: 32,
  rules: [
    'nop; 000 31:29;',
    'beq ra rb #K; 001 31:29 28:24 23:19 18:3;',
    'mov #K rb; 010 31:29 18:3 23:19;',
    'add ra rb rd; 011 31:29 28:24 23:19 18:14;',
    'ld ra rb; 100 31:29 28:24 23:19 18:3;',
    'st rb ra; 101 31:29 23:19 28:24 18:3;',
  ],
};

export const exEditor3 = {
  lines: [
    'mov #16 r0;',
    'add r0 r1 r2;',
    'ld r0 r1 r2;',
    'st r0 r1 r2;',
    'beq r0 r1 #10;',
    'nop;',
  ],
};
