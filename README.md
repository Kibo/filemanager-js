# Filemanager-js

The Filemanager for CKEditor, Quill, TinyMCE.

![Filemanager](/public/screens/screen1.png)

### Commands

- **Select path**
- **Uploads**
- **Create directory**
- **Rename**
- **Remove**

### Properties

- Lazy loading of directory content
- Responsive layout
- Active breadcrumb
- Sorting by name/ size/ type
- Uploads multiple files

---

## 1. Try it yourself

**1.1) Clone repository**

```
git@github.com:Kibo/filemanager-js.git
```

**1.2) Install dependencies**

```
npm i
```

**1.3) Run it**

```
npm run serve
```

**1.4) Look at your browser**

```
localhost:8080
```

---

## 2. Integration with your preferred editor

**2.1) Set editor name**

[filemanager.config.ts](/src/integration/filemanager.config.ts)

- EDITORS.ckeditor4
- EDITORS.quill
- EDITORS.tinymce

**2.2) Set OUTPUT_PATH and PUBLIC_PATH**

[vue.config.js](vue.config.js)

**2.3) Build filemanager**

```
npm run build
```

### CKEditor 4

@see https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_browse_upload.html

```
var editor = CKEDITOR.replace( 'ckeditor1', {
  filebrowserBrowseUrl: "/vendor/kibo-filemanager/index.html"
});
```

### Quill

- todo

### TyniMCE

- todo

---

## 3. Create API on your backend server

- list( url:string )
- rename( url:string, name:string )
- remove( url:string )
- uploads( url:string, files:array )
- mkdir (url:string, name:string )

---

## 4. Connect the filemanager to your backend API

- [API](/src/api/api.ts)

You can use prepared [Axios](https://www.npmjs.com/package/axios) and some [Utils](/src/utils/Utils.ts).

---

## 5. Build Filemanager

```
npm run build
```

---

## Node type

- [TypeScript INode interface](/src/types/index.ts)
- [filesystem.json](/src/data/filesystem.json)

## How to

1. Create an API on your backed server (filesystem, S3, Dropbox, GDisk, ...)
2. Connect the Filemanager to your [API](/src/api/api.ts)
3. Build the Filemanager
4. Setup the Filemanger for your prefered WYSIWIG editor. For instance CKEditor.

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
