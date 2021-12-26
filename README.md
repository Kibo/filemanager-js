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

![Filemanager](https://raw.githubusercontent.com/Kibo/filemanager-js/master/public/screens/screen1.png)

![Filemanager](https://raw.githubusercontent.com/Kibo/filemanager-js/master/public/screens/screen2.png)

![Filemanager](https://raw.githubusercontent.com/Kibo/filemanager-js/master/public/screens/screen3.png)

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

**2.1) Set editor name** in [filemanager.config.ts](https://github.com/Kibo/filemanager-js/blob/master/src/integration/filemanager.config.ts)

- EDITORS.ckeditor4
- EDITORS.quill
- EDITORS.tinymce5

**2.2) Set OUTPUT_PATH and PUBLIC_PATH** in [vue.config.js](https://github.com/Kibo/filemanager-js/blob/master/vue.config.js)

---

## 3. Connect the filemanager to your backend API

- change _import_ in the top of file [index.ts](https://github.com/Kibo/filemanager-js/blob/master/src/store/index.ts)

```
// Remove this import
import * as API from "../api/api-mock";
```

```
// Uncoment this import for production
//import * as API from "../api/api-axios";
```

There are calls to your backend server in file [/api/api-axios](https://github.com/Kibo/filemanager-js/blob/master/src/api/api-axios.ts). You need to implement appropriate methods on your server.

_Do you have a NodeJS project? Hire me! Implementation for filesystem, S3, Dropbox, Cloudinary, Google Drive, ..._

---

## 4. Build the Filemanager

```
npm run build
```

---

## 5. Connect the Filemanager with your preferred editor

### CKEditor 4

@see https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_browse_upload.html

```
var editor = CKEDITOR.replace( 'ckeditor1', {
  filebrowserBrowseUrl: "/vendor/kibo-filemanager/index.html"
});
```

### Quill 1.3.7

@see https://quilljs.com/docs/modules/toolbar/#handlers

The filemanager creates **image and link dialog** too. You're welcome.

![LinkDialog](https://raw.githubusercontent.com/Kibo/filemanager-js/master/public/screens/quill-link-dialog.png)
![LinkDialog](https://raw.githubusercontent.com/Kibo/filemanager-js/master/public/screens/quill-image-dialog.png)

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

- param _iname_ means instance name, and value is the name of quill variable. In this case _quill1_. This is for case you use multiple instances of quill.
- param _filter_ means filter, and open image or link dialog.

### TyniMCE 5

@see https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback

```
tinymce.init({
  selector: '#mytextarea',
  height: 500,
  plugins: ['link image'],
  toolbar: 'link image',
  file_picker_callback: function (callback, value, meta) {
        var type = meta.filetype;
        var field_name = 'tinymce-5';
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        var cmsURL = '/vendor/kibo-filemanager/index.html?&field_name=' + field_name + '&langCode=en';

        if (type == 'image') {
            cmsURL = cmsURL + "&type=images";
        }
        tinymce.activeEditor.windowManager.openUrl({
            url: cmsURL,
            title: 'Filemanager',
            width: x * 0.8,
            height: y * 0.8,
            resizable: "yes",
            close_previous: "no",
            onMessage: function (api, data) {
                if (data.mceAction === 'customAction') {
                    callback(data.url);
                    api.close();
                }
            }
        });
    }
});
```

---

## 6. Congratulation

<a href="https://www.buymeacoffee.com/Kibo" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: 41px !important;width: 174px !important;box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;-webkit-box-shadow: 0px 3px 2px 0px rgba(190, 190, 190, 0.5) !important;" ></a>

---

## Development

- There is method _onSelect()_ in file _/src/components/Filemenager.vue_. It returns an URL of selected file.
- There are [integration files](https://github.com/Kibo/filemanager-js/tree/master/src/integration) for every editor.
- The Node (file, directory) has to implement this [INode interface](https://github.com/Kibo/filemanager-js/blob/master/src/types/index.ts).

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
