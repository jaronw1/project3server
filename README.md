# MERN Auth Server

Server starter code for project 3

## Getting Setup

### If you are a git manager for the server

* clone this repo down directly, do not fork it
	* you can use `git clone < cloning url > < your project name >` to name the directory it is cloned into
* cd into the directory you just cloned
* run `rm -rf .git` to delete the git repo
* run `git init` to create a fresh git repo
* add and commit the code
* create a new repo on github that will be your origin and your group's upstream
* copy the code chunk from github "...or push an existing repository from the command line." 
* share the repos url with your teammates so they can fork it 

### If you are a contributor

* fork your backend repo manger's code
* clone _your fork_ of the code and cd into the directory
* run `git remote add upstream < your frontend repo manager's cloning url >`
* check your work with `git remote -v`
	* `origin` should refer to your fork 
	* `upstream` should refer to your git manager's repo

### Steps for everyone to get the code running

* `touch .env`
* add the following to the `.env` file:
```
# jwt secret for signing json web tokens -- can be any string
JWT_SECRET="mysecretmessage"
```
* run `npm i` to install the required packages
* run `nodemon` or `node .` start the server







