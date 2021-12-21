# Filemanager-js

The easy to use Filemanager for CKEditor, Quill, TinyMCE, ...

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

---

## 3. Create API on your backend server

- list( url:string )
- rename( url:string, name:string )
- remove( url:string )
- uploads( url:string, files:array )
- mkdir (url:string, name:string )

Do you have a NodeJS project? Hire me! Implementation for filesystem, S3, Dropbox, Cloudinary, Google Drive, ...

---

## 4. Connect the filemanager to your backend API

- mock [API](/src/api/api.ts)

You can use prepared [Axios](https://www.npmjs.com/package/axios) and some [Utils](/src/utils/Utils.ts).

---

## 5. Build the Filemanager

```
npm run build
```

---

## 6. Connect the Filemanager with your preferred editor

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

## Development

- There is method _onSelect()_ in file _/src/components/Filemenager.vue_. It returns an URL of selected file.

### Node type

- [TypeScript INode interface](/src/types/index.ts)
- mock [filesystem.json](/src/data/filesystem.json)

---

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
