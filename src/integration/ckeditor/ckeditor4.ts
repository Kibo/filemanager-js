import Utils from "../../utils/Utils";
import { INode } from "../../types";

/**
 * Select url for CKEditor 4
 *
 * This code is from CKEditor4 documentation
 * @see https://ckeditor.com/docs/ckeditor4/latest/guide/dev_file_browser_api.html
 *
 * @param {string} url
 */
export function select(url: string): void {
  window.opener.CKEDITOR.tools.callFunction(
    Utils.getUrlParam("CKEditorFuncNum"),
    url
  );
  window.close();
}
