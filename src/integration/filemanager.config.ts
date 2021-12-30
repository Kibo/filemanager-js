import { EDITORS } from "../types";

export const config = {
  /**
   * @const
   * @type {string}
   * @see /types/index.ts
   */
  EDITOR_NAME: EDITORS.ckeditor4,

  /**
   * @const
   * @type {string}
   *
   * This prefix is added before a selected URL.
   * You can add some folder or domain name too
   *
   * Example:
   * SELECTED_URL_PREFIX:"/uploads/"
   * SELECTED_URL_PREFIX:"http://www.my-domain.eu/uploads/folder123/"
   */
  SELECTED_URL_PREFIX: "/uploads",
};
