ASM editor es un pequeño proyecto que permite en base a una pequeña y simple configuración traducir un conjunto de instrucciones a binario.

## Ejemplo

### Datos
Conjunto de instrucciones con las que queremos trabajar
```asm=
mov K rd; SignExt(K) -> BR(rd) K cte de 16 bits
add ra rb rd; BR(ra) + BR(rb) -> BR(rd)
```

### Configuración
configuracion de las instrucciones
```asm=
mov #K rd; 0 22:22 21:5 4:0;
add ra rb rd; 1 22:22 15:10 9:5 4:0;
```
```
INST: 22 bits
```

### Código
Codigo asm escrito en el editor
```asm=
mov 30000 r1;
mov 30000 r2;
mov 30000 r3;
mov  8000 r4;
mov     0 r5;
mov    90 r6;
mov     5 r7;
add r1 r2 r0;
add r3 r0 r0;
add r4 r0 r0;
add r5 r0 r0;
add r6 r0 r0;
add r7 r0 r0;
```

### Salida
Traduccion de las instrucciones a binario
```
0011101010011000000001
0011101010011000000010
0011101010011000000011
0000111110100000000100
0000000000000000000101
0000000000101101000110
0000000000000010100111
1000000000010001000000
1000000000110000000000
1000000001000000000000
1000000001010000000000
1000000001100000000000
1000000001110000000000
```


