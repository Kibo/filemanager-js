<template>
  <Toolbar>
    <template #start>
      <Breadcrumb :path="path" @onSelect="onNodeSelect" />
    </template>

    <template #end>
      <Button
        icon="pi pi-window-minimize"
        class="p-button-warning p-button-sm ml-1"
        title="Select"
        label="Select"
      />
      <Button
        icon="pi pi-cloud-download"
        class="p-button-primary p-button-sm ml-1"
        label="Uploads"
        title="Uploads"
      />
      <Button
        icon="pi pi-folder"
        class="p-button-success p-button-sm ml-1"
        label="Create Dir"
      />
    </template>
  </Toolbar>

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
      headerClass="bg-blue-100"
    ></Column>
    <Column
      field="size"
      header="Size"
      :sortable="true"
      headerClass="bg-blue-100"
    ></Column>
    <Column
      field="type"
      header="Type"
      :sortable="true"
      headerClass="bg-blue-100"
    ></Column>

    <Column headerClass="bg-blue-100 text-right" bodyClass="text-right">
      <template #body>
        <Button
          type="button"
          icon="pi pi-pencil"
          class="p-button-info p-button-sm"
          title="Rename"
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          class="p-button-danger p-button-sm ml-1"
          title="Delete"
        ></Button>
      </template>
    </Column>
  </TreeTable>
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Column from "primevue/column";
import TreeTable from "primevue/treetable";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "./Breadcrumb.vue";

import Utils from "../utils/Utils";

import filesystem from "../data/filesystem.json";

export default {
  name: "Filemanager",
  components: {
    Toolbar,
    Button,
    Column,
    TreeTable,
    FileUpload,
    Breadcrumb,
  },
  props: [],
  data() {
    return {
      nodes: filesystem.root as INode[],
      selectedNode: undefined,
      activeDir: undefined,
      path: [],
    };
  },
  computed: {
    dir() {
      return this.activeDir ? this.activeDir.children : this.nodes;
    },
  },
  watch: {
    selectedNode(node: INode) {
      this.path = node ? Utils.getPath(this.nodes, node) : [];
    },
  },
  mounted() {},
  methods: {
    onNodeSelect(node: INode) {
      this.setSelectedNode(node);
    },

    setSelectedNode(node: INode) {
      if (!node) {
        this.selectedNode = undefined;
        this.activeDir = undefined;
        return;
      }

      this.selectedNode = node;

      if (this.selectedNode?.data?.type == Utils.TYPE_FOLDER) {
        this.activeDir = this.selectedNode;
      }
    },
  },
};
</script>

<style lang="less"></style>
