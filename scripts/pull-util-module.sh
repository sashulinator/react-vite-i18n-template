#!/usr/bin/env bash

source "$(dirname -- "$0")/utils/pull-subtree.sh"

MODULE_FILE_PATH="$(dirname -- "$0")/../modules"

tr -d '\r' < "$MODULE_FILE_PATH" | 
while read path remote_alias repo; do
  pull_subtree $path $remote_alias
done