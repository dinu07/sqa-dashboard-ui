# hello-world-vue

## Prerequisites

* Should have node v10+ & vue-cli installed. 

To install vue-cli - refer https://cli.vuejs.org/guide/installation.html

```
npm install -g @vue/cli
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Usage

The application requires following parameters to be passed 
for presenting the data

 - fixVersion (the key to identify the JIRA tickets with that particular fixVersion)
 - milestoneId (the key to collate the test runs and plans from TestRail )
 - issueId (the JIRA ID that tracks the entire release )
 - showTestStats (optional, default: false, set it to true for viewing the test rails results)
 - autoPlayTimeout (optional, default: 5000, set it to any number for controlling the speed of the slide)
  - autoPlay (optional, default: true, set it to false, if you don't want the slides to play automatically)
  
An example for getting 8.3 release statistics would be as below
```
http://localhost:8080/?fixVersion=8.3&milestoneId=23&issueId=SQA-2893&autoPlayTimeout=10000&showTestStats=true
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### Containerized application running

 - to build the application, execute ```docker build . -t sqa-dashboard-ui`
 - to run the application, execute ```docker run sqa-dashboard-ui` 