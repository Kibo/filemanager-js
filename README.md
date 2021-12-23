# Filemanager-js

The easy to use Filemanager for CKEditor, Quill, TinyMCE, ...

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

![Filemanager](/public/screens/screen1.png)

![Filemanager](/public/screens/screen2.png)

![Filemanager](/public/screens/screen3.png)

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

**2.1) Set editor name** in [filemanager.config.ts](/src/integration/filemanager.config.ts)

- EDITORS.ckeditor4
- EDITORS.quill
- EDITORS.tinymce

**2.2) Set OUTPUT_PATH and PUBLIC_PATH** in [vue.config.js](vue.config.js)

---

## 3. Create API on your backend server

- list( url:string )
- rename( url:string, name:string )
- remove( url:string )
- uploads( url:string, files:array )
- mkdir (url:string, name:string )

_Do you have a NodeJS project? Hire me! Implementation for filesystem, S3, Dropbox, Cloudinary, Google Drive, ..._

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

@see https://quilljs.com/docs/modules/toolbar/#handlers

The filemanager creates image and link dialog too. You're welcome.

```
var quill1 = new Quill('#editor', {
  theme: 'snow'
});

var toolbar = quill1.getModule('toolbar');
toolbar.addHandler('image', setImage);
function setImage(value){
  window.open("/vendor/kibo-filemanager/index.html?iname=quill1&filter=image", "filemanager", "height=768,width=1024");
}

toolbar.addHandler('link', setLink);
function setLink(value){
  window.open("/vendor/kibo-filemanager/index.html?iname=quill1&filter=link", "filemanager", "height=768,width=1024");
}
```

This creates new handlers for image and link. Pls, notice that there are params in filemanager URL: _iname_ and _filter_.

- param _iname_ means instance name, and value is the name of quill variable. In this case _quill1_.
- param _filter_ means filter, and open image or link dialog.

### TyniMCE

- todo

---

## 7. Congratulation

<a href="https://www.buymeacoffee.com/Kibo" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

---

## Development

- There is method _onSelect()_ in file _/src/components/Filemenager.vue_. It returns an URL of selected file.
- There are [integration files](/src/integration) for every editor.
- The Node (file, directory) has to implement this [INode interface](/src/types/index.ts).
- [Mock filesystem](/src/data/filesystem.json).

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
