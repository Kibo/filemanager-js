import { INode } from "../types";
import filesystem from "../data/filesystem.json";
const branches: any = filesystem;

// ######################################################################
// ## Mock backend API - implement this API on your backend server    ##
// ## AXIOS ( https://www.npmjs.com/package/vue-axios ) is prepared   ##
// ######################################################################
//
// ######################################################################
// ## This can be usefull:                                             ##
// ## PATH_TO_NODE = Utils.getPath(this.$store.state.filesystem, node);##
// ######################################################################

// 0.5 sec
const MOCK_FETCH_TIME = 500;

/**
 * Get all Nodes
 *
 * @async
 * @param {INode | null} parent - directory node
 * @return {[INode]}
 */
export function list(parent?: INode): Promise<INode[]> {
  return new Promise<INode[]>((resolve) =>
    setTimeout(() => {
      let key = parent?.key;
      resolve(key ? branches[key] : branches["root"]);
    }, MOCK_FETCH_TIME)
  );
}

/**
 * Rename a node
 *
 * @param {INode} node - file or directory node
 * @param {string} name - new name
 *
 */
export function rename(node: INode, name: string): void {
  node.data.name = name;
}
