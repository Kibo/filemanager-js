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
      let nodes = API.list(node);
      node.key == "root" ? (state.filesystem = nodes) : (node.children = nodes);
    },
    rename({ commit, state }, { node, name }: { node: INode; name: string }) {
      API.rename(node, name);
    },
    remove({ commit, state }, node: INode) {
      API.remove(state.filesystem, node);
    },
    mkdir({ commit, state }, { node, name }: { node: INode; name: string }) {
      API.mkdir(node, name);
    },
    uploads({ commit, state }, { node, files }: { node: INode; files: [any] }) {
      API.uploads(node, files);
    },
  },
  modules: {},
});
