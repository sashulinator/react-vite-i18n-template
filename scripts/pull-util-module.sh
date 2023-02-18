#!/usr/bin/env

pull_util_module() {
  echo "[src/utils/$1] pulling..."
  git subtree pull --prefix=src/utils/$1 utils-$1 master
  echo "[src/utils/$1] pulled!"
  echo "----------------------------------"
}