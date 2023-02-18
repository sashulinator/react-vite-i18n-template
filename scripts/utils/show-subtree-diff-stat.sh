#!/usr/bin/bash

# Показать статистику различия файлов
show_subtree_diff_stat() {
  PROJECT_PATH=$1
  REMOTE_ALIAS=$2
  LOCAL_BRANCH=$3

  echo "---- Fetching remote \"$REMOTE_ALIAS\"... ----"
  git fetch $REMOTE_ALIAS master
  git --no-pager diff --stat "$REMOTE_ALIAS/master" "$LOCAL_BRANCH:$PROJECT_PATH"
  echo '-----------------------------------------'
}