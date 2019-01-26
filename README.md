<a href="https://gitlab.com/Tecnonucleous/open-telegram-bot-nodejs"><img src="https://img.shields.io/badge/Gitlab-Tecnonucleous%20Bot-orange.svg"></img></a> <a href="https://github.com/Tecnonucleous/Tecnonucleous-Bot"><img src="https://img.shields.io/badge/Github-Tecnonucleous%20Bot-lightgrey.svg"></img></a>

# 💿 Instalación de las dependencias de Nodejs

Una vez dentro de la carpeta del repositorio solo tenemos que ejecutar el siguiente comando para descargar los módulos:

---
npm install
---

# 🔑 Requisitos

Debemos hablar con [BotFather](https://t.me/BotFather) para generar el token que utilizaremos para crear nuestro bot y revisar las distintas credenciales que se utilizan en este repo.

---
# ⚙️ Configuraciones previas
Para que funcione nuestro bot, debemos hacer los siguiente:
> * Ve al directorio `settings`
> * Encontraras un archivo llamado `config-samples.js` y cambia el nombre por `config.js` (O puedes simplemente hacer una copia y cambiarle el nombre a la copia)
> * Abre `config.js`, revisa y establece tu token previamente solicitado a [BotFather](https://t.me/BotFather)
---

### Listado de webs para obtener las distintas API Key que usa actualmente el bot:

- https://api.imgur.com/
- https://www.pexels.com/api/

# ⚔️ Comandos disponibles

|Comandos |Descripción | Ejemplos|
|--------|------------|----------|
|/start |Comando de inicio del bot|/start|
|Bienvenida y despedida|Da la bienvenida y se despide de los usuarios||
|/ban (respuesta + tiempo) |Banea y expulsa al usuario durante un tiempo determinado respondiendo a un mensaje del usuario en cuestión|/ban 1|
|/unban o !unban (respuesta) | Desbanea respondiendo al mensaje del usuario||
|/link o !link|Exporta el enlace del grupo||
|/pin o !pin (respuesta)|Ancla mensajes en supergrupos||
|/unpin o !unpin|Desancla mensajes en supergrupos||
|@admin o `@admins` |Avisa a los administradores del grupo ||
|/mute o !mute (respuesta + tiempo) |Mutea al usuario respondiendo al mensaje del usuario e introduciendo uno o más dígitos que representan las horas|!mute 5|
|/unmute o !unmute (respuesta)| Desmutea al usuario respondiendo a un mensaje suyo||
|/imgur o !imgur (respuesta)| Sube imagenes anónimamente a Imgur||
|/clima (ciudad)| Muestra el tiempo de tu ciudad|/clima Madrid, España|
|/webshot o !webshot (url)| Muestra una captura del sitio web que le indicas|!webshot https://tecnonucleous.com|
|/qr o !qr (texto)| Convierte texto o enlaces en códigos qr|!qr TEXTO|
|/progeso o !progreso |Muestra el porcertaje del progreso actual del año||

🚨 respuesta 🚨 -> Indica que esos comandos requieren que respondas al mensaje/imagen/... del usuario sobre el que quieres aplicar la acción

Estos son los comandos disponibles hasta ahora, no obstante seguimos implementando fragmentos de código.

---

# Guía: Creación de bots de Telegram en Nodejs

<img src="https://tecnonucleous.com/content/images/2018/03/Guia-creacion-de-bot-de-telegram-en-nodejs.png"></img>

➡️ https://tecnonucleous.com/creacion-de-bots-de-telegram-en-nodejs/
