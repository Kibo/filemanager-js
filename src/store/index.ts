import { createStore } from "vuex";
import { INode } from "../types";
import Utils from "../utils/Utils";
import filesystem from "../data/filesystem.json";
const branches: any = filesystem;

export default createStore({
  state: {
    filesystem: [] as INode[],
  },
  mutations: {},
  actions: {
    async updateFilesystem({ commit, state }, node: INode) {
      if (!node) {
        state.filesystem = await list();
        return;
      }

      let dir = Utils.findNodeByKey(state.filesystem, node?.key);
      dir.children = await list(node);
    },
    async rename({ commit, state }, node: INode) {
      console.log(node?.data?.name);
    },
  },
  modules: {},
});

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
 * @param {INode | null} node - directory node with "children" property
 * @return {[INode]}
 */
function list(node?: INode): Promise<INode[]> {
  return new Promise<INode[]>((resolve) =>
    setTimeout(() => {
      let key = node?.key;
      resolve(key ? branches[key] : branches["root"]);
    }, MOCK_FETCH_TIME)
  );
}

/**
 * Rename a node on your backend server
 *
 * @param {INode} node
 */
function rename(node: INode): void {
  console.log(this.$store.state.filesystem);
}
