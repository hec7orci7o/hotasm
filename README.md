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
0x111010100110000xxxx1
0x111010100110000xxx10
0x111010100110000xxx11
0xxx1111101000000xx100
0xxxxxxxxxxxxxxx0xx101
0xxxxxxxxx1011010xx110
0xxxxxxxxxxxxx101xx111
1------xxxx1xxx10xxxx0
1------xxx11xxxx0xxxx0
1------xx100xxxx0xxxx0
1------xx101xxxx0xxxx0
1------xx110xxxx0xxxx0
1------xx111xxxx0xxxx0
```


