import { createStore } from "vuex";
import { INode } from "../types";
import Utils from "../utils/Utils";
import * as API from "../api/api";

export default createStore({
  state: {
    filesystem: [] as INode[],
  },
  mutations: {},
  actions: {
    updateFilesystem({ commit, state }, node: INode) {
      if (!node) {
        state.filesystem = API.list();
        return;
      }

      let dir = Utils.findNodeByKey(state.filesystem, node?.key);
      dir.children = API.list(node);
    },
    rename({ commit, state }, { node, name }: { node: INode; name: string }) {
      API.rename(node, name);
    },
    remove({ commit, state }, node: INode) {
      API.remove(state.filesystem, node);
    },
  },
  modules: {},
});
