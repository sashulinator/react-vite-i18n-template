#!/usr/bin/env

pull_subtree() {
  PROJECT_PATH=$1
  ALIAS=$2

  git subtree pull --prefix=$PROJECT_PATH $ALIAS master
}