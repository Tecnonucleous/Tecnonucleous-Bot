<a href="https://gitlab.com/Tecnonucleous/open-telegram-bot-nodejs"><img src="https://img.shields.io/badge/Gitlab-Tecnonucleous%20Bot-orange.svg"></img></a> <a href="https://github.com/Tecnonucleous/Tecnonucleous-Bot"><img src="https://img.shields.io/badge/Github-Tecnonucleous%20Bot-lightgrey.svg"></img></a>

# 🔑 Requisitos

Debemos hablar con [BotFather](https://t.me/BotFather) para generar el token que utilizaremos para crear nuestro bot y revisar las distintas credenciales que se utilizan en este repo.

---
# ⚙️ Configuraciones previas
Para que funcione nuestro bot, debemos hacer los siguiente:
> * Ve al directorio `settings`
> * Abre `config.js`, revisa y establece tu token previamente solicitado a [BotFather](https://t.me/BotFather)
---

# ⚔️ Comandos disponibles

|Comandos |Descripción |
|--------|------------|
|/start |Comando de inicio del bot|
|Bienvenida y despedida|Da la bienvenida y se despide de los usuarios|
|/ban (respuesta + tiempo) |Banea y expulsa al usuario durante un tiempo determinado|
|/unban o !unban (respuesta) | Desbanea respondiendo al mensaje del usuario
|/export o !export|Exporta el enlace del grupo|
|/pin o !pin (respuesta)|Ancla mensajes en supergrupos|
|/unpin o !unpin|Desancla mensajes en supergrupos|
|@admin o @admins |Avisa a los administradores del grupo |
|/mute o !mute (respuesta + tiempo) |Mutea al usuario respondiendo al mensaje del usuario e introduciendo un dígito|
|/unmute o !unmute (respuesta)| Desmutea al usuario respondiendo a un mensaje suyo|
|/imgur o !imgur (respuesta)| Sube imagenes anónimamente a Imgur|
|/clima (ciudad)| Muestra el tiempo de tu ciudad|
|/progeso o !progreso muestra el porcertaje del progreso actual del año|


Estos son los comandos disponibles hasta ahora, no obstante seguimos implementando fragmentos de código.

---
