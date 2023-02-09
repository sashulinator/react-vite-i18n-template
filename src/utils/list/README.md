# List
## subtree
### pull/push
```bash
# Push
git subtree push --prefix=src/utils/number git@github.com:sashulinator/list.git master
# Pull
git subtree pull --prefix=src/utils/number git@github.com:sashulinator/list.git master
# Force
git push ALIAS_NAME `git subtree split --prefix=src/utils/list @`:master --force
```
### Добавить новый
1. Создать репозиторий
2. Добавить алиас на репозиторий `git remote add ALIAS_NAME git@git.git:name/list.git`
3. Посмотреть список алиасов `git remote -v`
4. Убедиться что проекте НЕТ изменений
```bash
git subtree add --prefix=src/utils/list ALIAS_NAME master
# Если вывод prefix `'src/utils/error' already exists.` то
git subtree push --prefix=src/utils/list ALIAS_NAME master
```
