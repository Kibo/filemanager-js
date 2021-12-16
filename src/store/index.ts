import { createStore } from "vuex";
import { INode } from "../types";
import filesystem from "../data/filesystem.json";

export default createStore({
  state: {
    filesystem: all(),
  },
  mutations: {
    rename(state, node) {
      rename(node);
    },
  },
  actions: {},
  modules: {},
});

/**
 * Get all files and directories from root of your backend server
 *
 * @return {[INode]}
 */
function all(): INode[] {
  return filesystem.root as INode[];
}

/**
 * Rename a node on your backend server
 *
 * @param {INode} node
 */
function rename(node: INode): void {
  console.log(this.$store.state.filesystem);
}
