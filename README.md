# J F Dietrich Photography Portfolio Site

## Develop

```sh
$ yarn develop
```

## Build

```sh
$ yarn build
```

## Deploy

Install gsutil and setup

Upload new files:
`$ gsutil rsync -R public gs://www.jfdietrich.com`

That should be enough. But here are some extra commands:

Make objects accessible:
`$ gsutil iam ch allUsers:objectViewer gs://www.jfdietrich.com`

Set `index.html` and 404-page:

`$ gsutil web set -m index.html -e 404.html gs://www.jfdietrich.com`
