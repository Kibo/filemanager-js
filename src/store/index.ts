import { createStore } from "vuex";
import { INode } from "../types";
import Utils from "../utils/Utils";
import filesystem from "../data/filesystem.json";
const branches: any = filesystem;

// 0.5 sec
const MOCK_FETCH_TIME = 500;

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
  },
  modules: {},
});

// ###################################################################################
// ## Mock backend API ###############################################################
// #################################################################################

/**
 * Get all files and directories from root of your backend server
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
