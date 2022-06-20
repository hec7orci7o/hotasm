# HOT ASM 

## Configuración

**`REQUISITOS`**
 - npm >= 8.3.1
 - node >= v16.14.0

<br>

Clona el repositorio.
```
git clone https://github.com/hec7orci7o/asm-editor.git
```
Instala las dependencias y lanza el servidor de desarrollo.
```
npm i | npm run dev
```

## Acuerdos para desarrollo

A la hora de subir una nueva 'feature' asegurate de seguir la guía de estilos definida con `eslint` usando `npm run lint`, si te sale algún aviso o error arreglalo antes de subir los cambios para intentar mantener el codigo dentro de un orden.
De esto por lo general se encargará el paquete de npm `husky`

## Como funciona

## Como usarlo

Como se ve en la imagen a continuación, la aplicacion consta de 3 partes principales.
 - `Code` - Area de código
 - `Configuration` - Area de configuración
 - `Output` - Area para ver los resultados [binario, hex]

 <!-- insertar imagen -->
 <!-- fin imagen -->

 Para comenzar con el uso de la app deberemos seguir los siguientes pasos:
  1. **Iniciar sesión** en **GitHub**.
  2. Establecer una configuración valida.
  3. Escribir nuestro codigo ASM.

### Configuración 

```
32
```
```
nop; 000 31:29;
beq ra rb #K; 001 31:29 28:24 23:19 18:3;
mov #K rb; 010 31:29 18:3 23:19;
add ra rb rd; 011 31:29 28:24 23:19 18:14;
ld ra rb; 100 31:29 28:24 23:19 18:3;
st rb ra; 101 31:29 23:19 28:24 18:3;
```
