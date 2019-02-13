#!/bin/bash

hub release create --message "$(echo $(hub release -L 1) | xargs semver --increment major)" --message "$(git log --oneline $(git describe --tags --abbrev=0 @^)..@ --no-merges)" "$(echo $(hub release -L 1) | xargs semver --increment major)"
