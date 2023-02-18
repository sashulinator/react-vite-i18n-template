#!/usr/bin/env bash

source "$(dirname -- "$0")/utils/pull-subtree.sh"

MODULE_FILE_PATH="$(dirname -- "$0")/../modules"

tr -d '\r' < "$MODULE_FILE_PATH" | 
while read path remote repo; do
  git subtree pull --prefix=$path $remote master
done