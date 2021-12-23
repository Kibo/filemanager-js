import Utils from "../utils/Utils";
import { INode } from "../types";

/**
 * Select url for Quill 1.3.7
 *
 * @see https://quilljs.com/docs/api/#insertembed
 * @see https://quilljs.com/docs/formats/#inline
 * @see https://github.com/quilljs/quill/blob/develop/formats/link.js
 *
 * @see https://quilljs.com/guides/cloning-medium-with-parchment/
 *
 * @param {string} url
 * @param {INode} node
 */
export function select(url: string, node: INode): void {
  let instanceNameParam = Utils.getUrlParam("iname");
  let quill = instanceNameParam ? window.opener[instanceNameParam] : "quill";
  if (!quill) {
    throw new Error(
      "There is not quill instance with name: " + instanceNameParam
    );
  }

  registerImageEmbed(window.opener.Quill);
  registerLinkEmbed(window.opener.Quill);

  const range = quill.getSelection(true);
  if (range != null) {
    const index = range.index + range.length;

    quill.format(
      "kibo-image",
      {
        src: url,
        alt: "123",
        width: "100%",
        height: "",
        class: "ing img2",
      },
      "user"
    );

    /*
    quill.format(
      "kibo-link",
      {
        href: url,
        target: "_bla",
        class: "btn btn2",
      },
      "user"
    );
    */
  }
  window.close();
}

/**
 * Create new Embed - Image (src, alt, width, height, class)
 *
 * @see https://github.com/quilljs/quill/blob/develop/formats/image.js
 */
function registerImageEmbed(Quill: any) {
  let BlockEmbed = Quill.import("blots/block/embed");

  class ImageBlot extends BlockEmbed {
    static create(value: any) {
      let node: any = super.create();
      node.setAttribute("alt", value.alt);
      node.setAttribute("src", value.src);
      value.width && node.setAttribute("width", value.width);
      value.height && node.setAttribute("height", value.height);
      value.class && node.setAttribute("class", value.class);
      return node;
    }

    static value(node: any) {
      return {
        alt: node.getAttribute("alt"),
        src: node.getAttribute("src"),
        width: node.getAttribute("width"),
        height: node.getAttribute("height"),
        class: node.getAttribute("class"),
      };
    }
  }
  ImageBlot.blotName = "kibo-image";
  ImageBlot.tagName = "img";

  Quill.register({ "formats/kibo-image": ImageBlot });
}

/**
 * Create new Embed - Link (href, target, class)
 *
 * @see https://github.com/quilljs/quill/blob/develop/formats/image.js
 */
function registerLinkEmbed(Quill: any) {
  let Inline = Quill.import("blots/inline");

  class LinkBlot extends Inline {
    static create(value: any) {
      let node: any = super.create();
      node.setAttribute("href", value.href);
      value.target && node.setAttribute("target", value.target);
      value.class && node.setAttribute("class", value.class);
      return node;
    }

    static value(node: any) {
      return {
        href: node.getAttribute("href"),
        target: node.getAttribute("target"),
        class: node.getAttribute("class"),
      };
    }
  }
  LinkBlot.blotName = "kibo-link";
  LinkBlot.tagName = "a";

  Quill.register({ "formats/kibo-link": LinkBlot });
}
