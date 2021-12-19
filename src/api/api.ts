import { INode } from "../types";
import filesystem from "../data/filesystem.json";
import Utils from "../utils/Utils";
import axios from "axios";
const branches: any = filesystem;

// ######################################################################
// ## Mock backend API - implement this API on your backend server    ##
// ######################################################################
//
// ########################################################################
// ## This can be usefull:                                               ##
// ## - PATH_TO_NODE = Utils.getPath(this.$store.state.filesystem, node) ##
// ## - AXIOS ( https://www.npmjs.com/package/vue-axios ) is prepared    ##
// ########################################################################

// 0.5 sec
const MOCK_FETCH_TIME = 500;

/**
 * Get all nodes from parent
 *
 * @throws {Error} - throw Error when occurs
 * @param {INode | null} parent - directory node
 * @return {[INode]}
 */
export function list(parent?: INode): INode[] {
  //throw new Error("Server error");
  let key = parent?.key;
  return key ? branches[key] : branches["root"];
}

/**
 * Rename a node
 *
 * @throws {Error} - throw Error when occurs
 * @param {INode} node - file or directory node
 * @param {string} name - new name
 * @return {INode}
 */
export function rename(node: INode, name: string): INode {
  //throw new Error("Can not rename!");
  node.data.name = name;
  return node;
}

/**
 * Remove a node
 *
 * @throws {Error} - throw Error when occurs
 * @param {INode} node - file or directory node
 * @return {INode} - deleted node
 */
export function remove(nodes: INode[], node: INode): INode {
  //throw new Error("Can not remove!");
  Utils.removeNode(nodes, node);
  return node;
}
