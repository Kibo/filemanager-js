import Utils from "../utils/Utils";
import { INode } from "../types";

/**
 * Select url for TinyMCE 5
 *
 * @see https://www.tiny.cloud/docs-3x/howto/TinyMCE3x@How-to_implement_a_custom_file_browser/
 *
 * @param {string} url
 */
export function select(url: string): void {
  window.parent.postMessage(
    {
      mceAction: "customAction",
      url: url,
    },
    "*"
  );
}
