diff_util_module() {
  echo "[src/utils/$1] diff"
  git fetch utils-$1 master
  git --no-pager diff --stat utils-$1/master master:src/utils/$1
  echo "----------------------------------"
}