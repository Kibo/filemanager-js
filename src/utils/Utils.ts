import { INode } from "../types";

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
      let idx = undefined;
      for (const [k, val] of list.entries()) {
        if (val.key == child?.key) {
          idx = k;
        }
      }
      if (idx) {
        list.splice(idx, 1);
        return;
      }

      for (const n of list) {
        if (n?.children && isInArray(n.children, child?.key)) {
          n.children = n.children.filter((n) => n.key != child.key);
          break;
        } else {
          n?.children && lookup(n.children, node);
        }
      }
    };

    lookup(nodes, node);
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
