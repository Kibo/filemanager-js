<template>
  <Toast />

  <Toolbar>
    <template #start>
      <Button
        icon="pi pi-home"
        class="p-button-success"
        @click="setRootNode()"
      />
    </template>

    <template #end>
      <Button
        icon="pi pi-folder"
        class="p-button-primary mr-1"
        label="Create Dir"
      />
      <Button icon="pi pi-upload" class="p-button-success" label="Uploads" />
    </template>
  </Toolbar>

  <Splitter style="height: 600px">
    <SplitterPanel :size="20">
      <TreeTable
        :value="dirs"
        class="p-treetable-sm"
        sortMode="single"
        selectionMode="single"
        @nodeSelect="onNodeSelect"
      >
        <Column
          field="name"
          header="Dirs"
          headerClass="bg-blue-400"
          :expander="true"
          :sortable="true"
        ></Column>
      </TreeTable>
    </SplitterPanel>
    <SplitterPanel :size="80">
      <TreeTable
        :value="dir"
        class="p-treetable-sm"
        sortMode="single"
        selectionMode="single"
        @nodeSelect="onNodeSelect"
      >
        <Column
          field="name"
          header="Name"
          :sortable="true"
          headerClass="bg-green-400"
        ></Column>
        <Column
          field="size"
          header="Size"
          :sortable="true"
          headerClass="bg-green-400"
        ></Column>
        <Column
          field="type"
          header="Type"
          :sortable="true"
          headerClass="bg-green-400"
        ></Column>

        <Column headerClass="bg-green-400" bodyClass="text-right">
          <template #body>
            <Button
              type="button"
              icon="pi pi-pencil"
              class="p-button-warning mr-1"
              title="rename"
            ></Button>
            <Button
              type="button"
              icon="pi pi-trash"
              class="p-button-danger"
              title="delete"
            ></Button>
          </template>
        </Column>
      </TreeTable>
    </SplitterPanel>
  </Splitter>
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Column from "primevue/column";
import TreeTable from "primevue/treetable";
import FileUpload from "primevue/fileupload";

import Utils from "../utils/Utils";

import filesystem from "../data/filesystem.json";

export default {
  name: "Filemanager",
  components: {
    Toast,
    Toolbar,
    Button,
    Splitter,
    SplitterPanel,
    Column,
    TreeTable,
    FileUpload,
  },
  props: [],
  data() {
    return {
      nodes: filesystem.root as INode[],
      selectedNode: undefined,
      path: [],
    };
  },
  computed: {
    dirs() {
      return Utils.getDirsFromTree(this.nodes);
    },
    dir() {
      if (!this.selectedNode) {
        return this.nodes;
      }
      return this.selectedNode?.data?.type == Utils.TYPE_FOLDER
        ? this.selectedNode.children
        : this.nodes;
    },
  },
  watch: {
    selectedNode(node: INode) {
      this.path = node ? Utils.getParents(this.nodes, node) : [];
    },
  },
  mounted() {},
  methods: {
    onNodeSelect(node: INode) {
      this.setSelectedNode(node);
      this.$toast.add({
        severity: "success",
        summary: "Node Selected",
        detail: node.data.name,
        life: 3000,
      });
    },
    setRootNode() {
      this.setSelectedNode(undefined);
    },
    setSelectedNode(node: INode) {
      this.selectedNode = node;
    },
  },
};
</script>

<style lang="less"></style>
