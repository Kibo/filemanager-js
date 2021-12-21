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
    getUrlParam("CKEditorFuncNum"),
    url
  );
  window.close();
}

function getUrlParam(paramName: any) {
  let reParam = new RegExp("(?:[?&]|&)" + paramName + "=([^&]+)", "i");
  let match = window.location.search.match(reParam);
  return match && match.length > 1 ? match[1] : null;
}
