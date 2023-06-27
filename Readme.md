# iNotes

iNotes is project made with MERN Stack.<br/>
Link: https://644dda38cbc6c4040d1d0c8b--inotebookvorayash.netlify.app/

## Demo

Live: https://inotebookvorayash.netlify.app/

https://user-images.githubusercontent.com/72155000/211793943-ce2ef8f5-068e-4be6-8c37-2617d70ad105.mov

---
## Requirements

For development, you will only need Node.js and a node global package, Yarn, installed in your environement.

## Environment Variables
- NODEMAILER_EMAIL
- NODEMAILER_PASSWORD
- MONGO_USER
- MONGO_PASSWD

### Node
- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###
### Yarn installation
  After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Install

    $ git clone https://github.com/YOUR_USERNAME/PROJECT_TITLE
    $ cd PROJECT_TITLE
    $ yarn install

## Configure app

Open `a/iNotes/index.js` then edit it with your settings. You will need:

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
