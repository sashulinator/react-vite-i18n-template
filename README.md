# Best Template

## Папки в src

### app

1. Содержит верхнеуровневую логику (index.html, layout, providers)
2. Ничего не экспортирует

### lib

1. Выполняет функцию папки 'helpers' т.е. файлы этой папки могут импортировать что угодно
2. Не может содержать в файлы, **только** папки
3. Содержить index файл с импортами **только** на втором уровне
4. Папки классифицируются по:
   a. логике (auth, api, error)
   b. типу данных (dropdownOptions)
   c. библиотекам (i18n, toast)

### pages

1. Страницы

### shared

1. Содержит конфиги (routes)
2. Содержит инстансы (axios, dayjs, i18n, react-query)

### utils

1. Ничего не знает о проекте, т.е. не импортирует в себя ничего кроме файлов папки utils
2. Содержить index файл с импортами **только** на втором уровне
3. Папки классифицируются по:
   a. логике (dom, error)
   b. типу данных (string, number, list)

### widgets

1. Содержит в себе части и логику компонента, которые требуется собирать по месту применения (tree + node + expandable + selectable)

## Папки НЕ в src

### types

1. Каждый тип имеет отдельный файл
2. Не содержит index file

### \_private

1. Может содержаться в себе файлы любого типа, несущие в себе незначительную логику узкой направленности, т.е. есть уверенность что эта логика будет перменена лишь раз и в ее дальнейшей поддержке нет неоходимости (notFoundComponent)
2. Помогает сосредоточиться на важном
