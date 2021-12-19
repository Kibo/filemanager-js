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
    async updateFilesystem({ commit, state }, node: INode) {
      if (!node) {
        state.filesystem = await API.list();
        return;
      }

      let dir = Utils.findNodeByKey(state.filesystem, node?.key);
      dir.children = await API.list(node);
    },
    async rename(
      { commit, state },
      { node, name }: { node: INode; name: string }
    ) {
      await API.rename(node, name);
    },
  },
  modules: {},
});
