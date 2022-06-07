# my-rossum-app
A simple app that uses the Rossum API

## Purpose

Part of Node.js developer hiring process is a requirement to create a simple web app that uses the Rossum API. 

The task description can be found [here](https://docs.google.com/document/d/1qIeffRqRqgc4kvGC0XvwfA-t_qtGAGXsxxGAjFMv7oU)

## My approach

- keep it simple, yet organized
- use linter, formatter & follow naming conventions
- use github-flow, pull-requests & link with issues
- involve a bit of functional programming

## My solution

### API

#### endpoint:

/export/{queue_id}/annotations/{annotation_id}

where:
- queue_id is a quue identifier
- annotation_id is an annotation identifier

#### method:

GET

#### response body:
success:
```json
{
    "success": true,
    "content": "base64-encoded XML string of transformed annotation"
}
```
failure:
```json
{
    "success": false,
    "message": "failure description"
}
```

__Note__: there will be only "succes" field in the production app release:

```json
{
    "success": true,
}
```

#### response status codes:

Those are my-rossum-app driven response status codes:

- 200: Inputs are ok and my-rossum-app works well.\
 However, a rossum-service can return a non-success code, for whatever reason. If so, in the response body json, the "success" fields is set to "false", and the "message" json field contains a brief description of the failure.
- 401: user is not authenticated to view the content

### Application first-time setup

read the `env.template` file for further instructions.

### Run

```bash
npm start
```

### Test

Run unit tests:
```bash
    npm test
```

To run functional tests, do the following:

1. Ensure the app is running.

2. Run functional tests:
    ```bash
    npm run functional-test
    ```


## References

- https://githubflow.github.io/
- https://blog.logrocket.com/organizing-express-js-project-structure-better-productivity/
- https://stackoverflow.com/questions/4024271/rest-api-best-practices-where-to-put-parameters
- https://blog.appsignal.com/2021/09/01/best-practices-for-logging-in-nodejs.html
- https://stackoverflow.com/questions/38821947/how-does-a-node-js-server-compare-with-nginx-or-apache-servers



