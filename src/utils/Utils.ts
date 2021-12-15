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
  getParents(nodes: INode[], node: INode): INode[] {
    const parents: INode[] = [];

    let lookup = function (list: INode[], child: INode) {
      if (list.includes(child)) {
        return;
      }

      for (const n of list) {
        if (n?.children?.length) {
          if (n.children.includes(child)) {
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

export default Utils;
