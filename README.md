# blog

a [Sails](http://sailsjs.org) application

sails new blog --linker
sails generate model Article title:string content:string
sails generate controller Article index show new edit

...

Profit!

# controller
CRUD article
CRUD comment
override, and add redirects

# models
article
comment

# views
index, show, form, edit/new, partials (comment/article)

## prepare database for prod
add relevant database adaptor via npm
set options in connections.js
choose adaptor in models.js

# todo:

authentication
slugs for urls