# Instalaciones importantes:

## Nodejs

Nodejs creará el entorno en el cuál React y Express van a ejecutarse.

Se recomienda la version estable. Es una instalación simple de next, next...
Se puede descargar desde: https://nodejs.org/es/

## yarn

Permite instalar las librerias tanto en el Backend como en el Frontend, pero con menos errores que npm.

Se puede ver el manual de instalación aqui: https://yarnpkg.com/getting-started/install
Elige según tu versión de Nodejs. Solo tienes que ejecutar un comando.

# Instalaciones recomendadas:

## Postman

Sirve para probar las llamadas a las API. Necesario si eres Backend, recomendado si eres Frontend.

## Git

Como no tenemos un IDE que nos permita utilizar Git gráficamente lo haremos por consola.
Es posible que ya tenga git instalado en su laptop (comprobar con "git --version"). Si desea, puede descargar el terminal recomendado para trabajar con git: git bash

Se puede descargar desde: https://git-scm.com/downloads
Es una instalación simple de next, next...

# DevPanda Proyect: pasos iniciales

En un terminal donde corra git ejecutar:

1. git clone https://github.com/oscardanielnc/DevPanda_Soft.git

   -- para clonar tanto Front como Back. Puedes usar otro método, lo importente es que esté en tu PC

Tener 2 terminales abiertos, uno para Front y otro para Back

2. yarn

   -- en ambas terminales. Esto es para que se instalen todas las librerías que ambos proyectos necesitan

3. yarn dev

   -- en ambas terminales. Esto es para correr ambos proyectos.

   -- el Client ejecutará React en tu navagador predeterminado.

   -- revisa y prueba el código. Tiene un ejemplo super básico que incluye toda la conección entre front y back. Puedes hacerme cualquier pregunta si gustas.

# Push y Pull

Pull: git pull origin main
Push: git push origin main

NOTA 1: "origin" es el nombre de la rama remota que conectaras con tu rama local "main"
NOTA 2: antes de hacer pull o push, asegurate de que todos tus commits estén al día.
NOTA 3: "git status" sirve para ver si todo esta OK o si falta guardar algo.

Lo siguiente sirve para hacer commits:
git add .
git commit -m "Nombre del commit"
