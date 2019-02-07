# J F Dietrich Photography Portfolio Site

## Develop

```sh
$ yarn develop
```

## Build

```sh
$ yarn build
```

## Test

```sh
$ yarn test
```

## Deploy

Install gsutil and setup:

```bash
# see https://cloud.google.com/storage/docs/gsutil_install?hl=de
curl https://sdk.cloud.google.com | bash
reload
gcloud init
```

All-in-one build & deploy:

```sh
$ yarn deploy`
```

Upload new files:
`$ gsutil -m rsync -d -r -c public gs://www.jfdietrich.com`

That should be enough. But here are some extra commands:

Make objects accessible:
`$ gsutil iam ch allUsers:objectViewer gs://www.jfdietrich.com`

Set `index.html` and 404-page:

`$ gsutil web set -m index.html -e 404.html gs://www.jfdietrich.com`
