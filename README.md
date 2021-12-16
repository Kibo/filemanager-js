# Filemanager-js

The Filemanager for CKEditor, Quill, TinyMCE.

![Filemanager](/public/screens/screen1.png)

## Commands

- Uploads file or multiple files
- Create Dir
- Select path
- Rename
- Delete

## Properties

- One panel
- Active breadcrumb
- Sorting by name/ size/ type
- Responsive layout

## Node type

- [TypeScript INoder](/src/types/index.ts)
- [filesystem.json](/src/data/filesystem.json)

## How to

1. Create API on your backed server (filesystem, S3, Dropbox, GDisk, ...)
2. Connect Filemanager to your API ( [store](/src/store/index.ts) )
3. Build Filemanager
4. Connect Filemanger to your prefered WYSIWIG editor. For instance CKEditor.

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
