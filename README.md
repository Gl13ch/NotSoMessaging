# Not so Messaging
Not so Messaging is a rough draft of a messaging app

https://notsomessaging.netlify.app/

## Technologies Used
  * HTML
  * CSS
  * Javascript
  * AngularJs

## User Stories
* A user should be able to log in and sign up.
* A logged in user should be able to send a message.
* A logged in user should only be able to edit and delete their messages.

## Approach Taken
I tried to make this with AngularTs and hit quite a few road blocks. I decided to start over with AngularJs and was able to get CRUD and user auth working. The end product is not what I want it to be.

## Known Issues
* Need error handling for signup. When a user tries to sign up with an already created username it still logs them in and allows them to interact with the app even though there is no username connected to them.
* Users can login to an account with just the username.

## Features that still need to be implemented
* CSS
* Admin Mode button. When an admin is logged in they should be able to toggled admin mode which will let them delete any message even if it is from other users.
* Friends list.
* Profiles.
* Live Chat.
* Chat rooms.
* localStorage.
