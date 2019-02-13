# 🌁 J F Dietrich Photography Portfolio Site

## Install

We use a private submodule for our assets so clone with `--recursive`

```sh
$ git clone --recursive git@github.com:luhmann/photography-portfolio.git
```

If you need to update the info from the assets do

```sh
$ git submodule update --recursive --remote
```

The expected folder-/file-structure of the data-folder is:

```
|-- galleries
|   |-- gallery-1.yaml
|   |-- gallery-2.yaml
|   `-- gallery-3.yaml
`-- images
    |-- gallery-1
    |-- gallery-2
    `-- gallery-3
```

In `images` are folders of the same name as in galleries, which contain the images in an ordered fashion:

```
|-- 00__DSC2799.jpg
|-- 01__DSC2801.jpg
|-- 02__DSC2977.jpg
|-- 03__DSC2855.jpg
`-- 04__DSC2821.jpg
```

The yaml-files for the galleries have this format:

```
title: Gallery Title
album: Places <-- group galleries in albums
folderName: gallery-1 <-- name of folder in `images`
path: /barcelona/ <-- url this gallery is supposed to be accessible under
order: 20 <-- number thats indicates the position of this album in the menu
```

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

Before you deploy make sure to build the project and test it on a local http-server. What you see in `gatsby develop` is not necessarily how it works in what `gatsby build` generates.

Install gsutil and setup:

```bash
# see https://cloud.google.com/storage/docs/gsutil_install?hl=de
$ curl https://sdk.cloud.google.com | bash
$ reload
$ gcloud init
```

All-in-one build & deploy:

```sh
$ yarn deploy
```

Upload new files:
`$ gsutil -m rsync -d -r -c public gs://www.jfdietrich.com`

That should be enough. But here are some extra commands:

Make objects accessible:
`$ gsutil iam ch allUsers:objectViewer gs://www.jfdietrich.com`

Set `index.html` and 404-page:

`$ gsutil web set -m index.html -e 404.html gs://www.jfdietrich.com`
