import { createStore } from "vuex";
import { INode } from "../types";
import Utils from "../utils/Utils";

// Remove this import
import * as API from "../api/api-mock";

// Uncoment this import for production
//import * as API from "../api/api-axios";

const ROOT_NODE_KEY = "root";

export default createStore({
  state: {
    filesystem: [] as INode[],
  },
  mutations: {
    updateFs(state, node) {
      if (node.key == ROOT_NODE_KEY) {
        state.filesystem = node.children;
        return;
      }
      Utils.replace(state.filesystem, node);
    },
    removeNode(state, node) {
      Utils.removeNode(state.filesystem, node);
    },
  },
  actions: {
    async updateFilesystem({ commit, state }, node: INode) {
      let url =
        node.key == ROOT_NODE_KEY
          ? "/"
          : Utils.getUrl(Utils.getPath(state.filesystem, node));

      commit("updateFs", await API.list(url, node));
    },
    async rename(
      { commit, state },
      { node, name }: { node: INode; name: string }
    ) {
      commit(
        "updateFs",
        await API.rename(
          Utils.getUrl(Utils.getPath(state.filesystem, node)),
          node,
          name
        )
      );
    },
    async remove({ commit, state }, node: INode) {
      commit(
        "removeNode",
        await API.remove(
          Utils.getUrl(Utils.getPath(state.filesystem, node)),
          node
        )
      );
    },
    async mkdir(
      { commit, state },
      { node, name }: { node: INode; name: string }
    ) {
      let url =
        node.key == ROOT_NODE_KEY
          ? "/"
          : Utils.getUrl(Utils.getPath(state.filesystem, node));

      commit("updateFs", await API.mkdir(url, node, name));
    },

    async uploads(
      { commit, state },
      { node, files }: { node: INode; files: [any] }
    ) {
      let url =
        node.key == ROOT_NODE_KEY
          ? "/"
          : Utils.getUrl(Utils.getPath(state.filesystem, node));

      commit("updateFs", await API.uploads(url, node, files));
    },
  },
  modules: {},
});
