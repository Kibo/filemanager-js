import { INode } from "../types";
const path = require("path");

const Utils = {
  TYPE_FOLDER: "Folder",

  /**
   * Find INode by key
   *
   * @param {[INode]} nodes
   * @param {String} key
   *
   * @return {INode | undefined }
   */
  findNodeByKey(nodes: INode[], key: string): INode {
    let result: any;

    let lookup = function (list: INode[], id: string) {
      for (const n of list) {
        if (n.key == id) {
          result = n;
          break;
        }

        if (n?.children?.length) {
          lookup(n.children, id);
        }
      }
    };

    lookup(nodes, key);
    return result;
  },

  /**
   * Find parents of node
   *
   * @param {[INode]} nodes
   * @param {INode} node
   *
   * @return {[INode]}
   */
  getPath(nodes: INode[], node: INode): INode[] {
    if (!node) {
      return [];
    }

    const parents: INode[] = [node];

    let lookup = function (list: INode[], child: INode) {
      if (isInArray(list, child?.key)) {
        return;
      }

      for (const n of list) {
        if (n?.children?.length) {
          if (isInArray(n.children, child?.key)) {
            parents.push(n);
            lookup(nodes, n);
            break;
          } else {
            lookup(n.children, child);
          }
        }
      }
    };

    lookup(nodes, node);
    return parents.reverse();
  },

  /**
   *  Remove node from list
   *
   * @param{[INode]} nodes
   * @param{INode} node
   */
  removeNode(nodes: INode[], node: INode): void {
    let lookup = function (list: INode[], child: INode) {
      for (const [idx, n] of list.entries()) {
        if (n.key == child?.key) {
          list.splice(idx, 1);
          break;
        } else {
          n?.children && lookup(n.children, node);
        }
      }
    };

    lookup(nodes, node);
  },

  /**
   * Read value from URL parameter
   *
   * @param {string} paramName
   * @return {string} value or null
   */
  getUrlParam(paramName: string) {
    let reParam = new RegExp("(?:[?&]|&)" + paramName + "=([^&]+)", "i");
    let match = window.location.search.match(reParam);
    return match && match.length > 1 ? match[1] : null;
  },

  /**
   * Get URL
   *
   * @param {INode} node
   * @return {string}
   */
  getUrl(pathOfNodes: INode[]): string {
    let nodeNames = pathOfNodes.map((n: INode) => n?.data?.name);
    return path.join("/", ...nodeNames);
  },

  /**
   * It replaces node in list
   *
   * @param {[INode]} nodes
   * @param {INode} node - new node
   * @return {[INode]}
   */
  replace(nodes: INode[], node: INode): INode[] {
    let lookup = function (list: INode[], child: INode) {
      for (const [idx, n] of list.entries()) {
        if (n.key == child?.key) {
          list.splice(idx, 1, node);
          break;
        } else {
          n?.children && lookup(n.children, node);
        }
      }
    };

    lookup(nodes, node);
    return nodes;
  },
};

/*
 * Check if object with ID is in array
 *
 * @param {Array} arr
 * @param {string} key
 * @return {boolean}
 */
function isInArray(arr: INode[], key: string): boolean {
  for (const obj of arr) {
    if (obj.key == key) {
      return true;
      break;
    }
  }
  return false;
}

export default Utils;
