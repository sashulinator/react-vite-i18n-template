#!/usr/bin/env bash

source "$(dirname -- "$0")/utils/show-subtree-diff-stat.sh"

MODULE_FILE_PATH="$(dirname -- "$0")/../modules"

tr -d '\r' < "$MODULE_FILE_PATH" | 
while read path remote_alias repo; do
  show_subtree_diff_stat $path $remote_alias master
done