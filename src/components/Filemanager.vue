<template>
  <Toolbar class="pr-1 py-1 bg-orange-600">
    <template #start>
      <Breadcrumb
        :path="path"
        @onSelect="onNodeSelect"
        @onCollapse="onCollapseAll"
      />
    </template>

    <template #end>
      <Button
        icon="pi pi-window-minimize"
        class="p-button-warning p-button-sm"
        title="Select"
        label="Select"
      />
    </template>
  </Toolbar>

  <TreeTable
    :value="nodes"
    class="p-treetable-sm"
    sortMode="single"
    selectionMode="single"
    responsiveLayout="scroll"
    :loading="loading"
    :lazy="true"
    v-model:selectionKeys="selectedKey"
    :expandedKeys="expandedKeys"
    @node-select="onNodeSelect"
    @nodeExpand="onExpand"
  >
    <Column
      field="name"
      header="Name"
      :sortable="true"
      :expander="true"
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
      <template #header>
        <Button
          icon="pi pi-cloud-download"
          class="p-button-info p-button-sm"
          title="Uploads"
        />
        <Button
          icon="pi pi-folder"
          class="p-button-success p-button-sm ml-1"
          title="Create Dir"
        />
      </template>
      <template #body="slotProps">
        <Button
          type="button"
          icon="pi pi-pencil"
          class="p-button-secondary p-button-sm"
          @click="doRename(slotProps.node.key)"
          title="Rename"
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          class="p-button-danger p-button-sm ml-1"
          @click="doRemove(slotProps.node.key)"
          title="Remove"
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
import SplitButton from "primevue/splitbutton";
import Column from "primevue/column";
import TreeTable from "primevue/treetable";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "./Breadcrumb.vue";

import Utils from "../utils/Utils";

export default {
  name: "Filemanager",
  components: {
    Toolbar,
    Button,
    SplitButton,
    Column,
    TreeTable,
    FileUpload,
    Breadcrumb,
  },
  props: [],
  data() {
    return {
      selectedNode: undefined,
      selectedKey: undefined,
      expandedKeys: {},
      path: [],
      loading: true,
    };
  },
  computed: {
    nodes() {
      return this.$store.state.filesystem as INode[];
    },
  },
  watch: {
    selectedNode(node: INode) {
      this.path = node ? Utils.getPath(this.nodes, node) : [];
    },
  },
  async mounted() {
    this.loading = true;
    await this.$store.dispatch("updateFilesystem");
    this.loading = false;
  },
  methods: {
    onNodeSelect(node: INode) {
      this.selectedKey = { [node.key]: true };
      this.selectedNode = node;
    },
    onCollapseAll() {
      this.selectedNode = undefined;
      this.selectedKey = undefined;
      this.expandedKeys = {};
    },
    doRename(key: string) {
      console.log(key);
    },
    doRemove(key: string) {
      console.log(key);
    },
    async onExpand(node: INode) {
      if (Array.isArray(node?.children)) {
        return;
      }
      this.loading = true;
      await this.$store.dispatch("updateFilesystem", node);
      this.loading = false;
    },
  },
};
</script>

<style lang="less"></style>
