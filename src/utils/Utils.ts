import { INode } from "../types";

const Utils = {
  TYPE_FOLDER: "Folder",

  /**
   * Filter tree of INodes
   *
   * @param {INodes[]} nodes
   * @return {INodes[]} dirs only
   */
  getDirsFromTree(nodes: INode[]): INode[] {
    let tree: INode[] = JSON.parse(JSON.stringify(nodes));

    for (const node of tree) {
      if (node?.children?.length) {
        node.children = Utils.getDirsFromTree(node.children);
      }
    }

    return tree.filter((n) => n?.data?.type == Utils.TYPE_FOLDER);
  },

  /**
   * Find INode by key
   *
   * @param {[INode]} nodes
   * @param {String} key
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
