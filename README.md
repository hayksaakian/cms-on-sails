# CMS on Sails

A content management system built on top of JavaScript, using [Sails.js](http://sailsjs.org)

1) get started:

    npm install

2) modify the config/application.js file and customize it for yourself

3) lift your sails

    sails lift


## What is this?

a [Sails](http://sailsjs.org) application

sails new blog --linker
sails generate model Article title:string content:string
sails generate controller Article index show new edit

...

Profit!

# business
authentication
slugs for urls

# controller
CRUD article
CRUD comment
override, and add redirects

# models
article
comment
page

# views
article: index, show, form, edit/new, partials (comment/article)
page: index, show, form, edit/new, partials
-- markdown editor

## prepare database for prod
add relevant database adaptor via npm
set options in connections.js
choose adaptor in models.js

# todo:
authorization for page editing
remove epic editor altogther
