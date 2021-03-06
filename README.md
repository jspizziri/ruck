# Ruck App :school_satchel:

Ruck is an opinionated Scrum PM tool. It is designed to work entirely and directly off of the API's & functionality provided by GitLab. This keeps the code lightweight and fully integrated. Ruck provides a management interface on top of the GitLab issue system:

* Organize issues by list
* Prioritize issues in each list
* Track the status of issues in progress
* Classify the type of each issue
* Comment, describe, assign, etc. issues



## Index
* [Screenshots](#screenshots)
* [Getting Started](#getting-started)



## Screenshots
View all your projects   
![projects](https://gitlab.com/ruck/ruck/raw/master/docs/screenshots/projects.png)   

Organize, prioritize, & label your stories
![project](https://gitlab.com/ruck/ruck/raw/master/docs/screenshots/project.png)   

View comment history & add new comments
![story](https://gitlab.com/ruck/ruck/raw/master/docs/screenshots/story.png)   

Edit stories with markdown and preview in realtime
![markdown](https://gitlab.com/ruck/ruck/raw/master/docs/screenshots/markdown.png)


## Getting Started

#### Install project dependencies
```
npm install && bower install
```

#### Build & run the project
```
gulp serve
```

#### Docker

###### Building locally
```
docker build -t ruck .
docker run --name ruck-web -d -p 80:80 -p 443:8443 ruck
```

###### Deploying image

Update `gulp/conf.js`
```js
/**
 * Docker config
 */
exports.docker = {
  repo: 'ruck/ruck'
};
```

Docker login and gulp build
```
docker login
gulp --env=staging docker:build
```
