import { INode } from "../types";

const Utils = {
  TYPE_FOLDER: "Folder",

  /**
   * Filter tree of INodes
   *
   * @param {INodes[]} nodes
   * @return {INodes[]} dirs only
   */
  getDirsFromTree(nodes: INode[]) {
    return nodes;
    /*
    return nodes.filter((node: INode) => {
      if (node?.children?.length) {
        node.children = Utils.getDirsFromTree(node.children);
      }
      return node?.data?.type == Utils.TYPE_FOLDER;
    });
    */
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

    let look = function (list: INode[], id: string) {
      for (const n of list) {
        if (n.key == id) {
          result = n;
          break;
        } else if (n?.children?.length) {
          look(n.children, id);
        }
      }
    };

    look(nodes, key);
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

    let look = function (list: INode[], child: INode) {
      for (var i = 0; i < list.length; i++) {
        let item = list[i];

        if (item == child) {
          parents.push(item);
          look(list, item);
          break;
        } else if (item.children) {
          look(item.children, child);
        }
      }
    };

    look(nodes, node);
    return parents;
  },
};

export default Utils;
