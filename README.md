# Filemanager-js

The Filemanager for CKEditor, Quill, TinyMCE.

![Filemanager](/public/screens/screen1.png)

## Commands

- **Select path**
- **Uploads**
- **Create directory**
- **Rename**
- **Delete**
- **Remove**

## Properties

- Lazy loading of directory content
- Responsive layout
- Active breadcrumb
- Sorting by name/ size/ type
- Uploads multiple files

## Node type

- [TypeScript INoder](/src/types/index.ts)
- [filesystem.json](/src/data/filesystem.json)

## How to

1. Create an API on your backed server (filesystem, S3, Dropbox, GDisk, ...)
2. Connect the Filemanager to your API ( [Vuex](/src/store/index.ts) )
3. Build the Filemanager
4. Setup the Filemanger for your prefered WYSIWIG editor. For instance CKEditor.

### CKEditor

- todo

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your unit tests

```
npm run test:unit
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
