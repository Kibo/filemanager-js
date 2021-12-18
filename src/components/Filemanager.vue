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
          @click="onNewDirectory"
        />
      </template>
      <template #body="slotProps">
        <Button
          type="button"
          icon="pi pi-pencil"
          class="p-button-secondary p-button-sm"
          @click="onRename(slotProps.node.key)"
          title="Rename"
        ></Button>
        <Button
          type="button"
          icon="pi pi-trash"
          class="p-button-danger p-button-sm ml-1"
          @click="onRemove(slotProps.node.key)"
          title="Remove"
        ></Button>
      </template>
    </Column>
  </TreeTable>
  <RemoveDialog
    :isVisible="isRemoveDialogVisible"
    :node="selectedNode"
    @onConfirm="doRemove"
    @onClose="isRemoveDialogVisible = false"
  />
  <RenameDialog
    :isVisible="isRenameDialogVisible"
    :node="selectedNode"
    @onConfirm="doRename"
    @onClose="isRenameDialogVisible = false"
  />
  <DirectoryDialog
    :isVisible="isDirectoryDialogVisible"
    :path="path"
    @onConfirm="doNewDirectory"
    @onClose="isDirectoryDialogVisible = false"
  />
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Utils from "../utils/Utils";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Column from "primevue/column";
import TreeTable from "primevue/treetable";
import FileUpload from "primevue/fileupload";
import Breadcrumb from "./Breadcrumb.vue";
import RemoveDialog from "./RemoveDialog.vue";
import RenameDialog from "./RenameDialog.vue";
import DirectoryDialog from "./DirectoryDialog.vue";

export default {
  name: "Filemanager",
  components: {
    Breadcrumb,
    Toolbar,
    Button,
    SplitButton,
    Column,
    TreeTable,
    FileUpload,
    RemoveDialog,
    RenameDialog,
    DirectoryDialog,
  },
  props: [],
  data() {
    return {
      selectedNode: undefined,
      selectedKey: undefined,
      expandedKeys: {},
      path: [],
      loading: true,
      isRemoveDialogVisible: false,
      isRenameDialogVisible: false,
      isDirectoryDialogVisible: false,
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
    selectNode(node: INode) {
      this.selectedKey = { [node.key]: true };
      this.selectedNode = node;
    },
    onNodeSelect(node: INode) {
      this.selectNode(node);
    },
    onCollapseAll() {
      this.selectedNode = undefined;
      this.selectedKey = undefined;
      this.expandedKeys = {};
    },
    onRename(key: string) {
      let node = Utils.findNodeByKey(this.nodes, key);
      this.selectNode(node);
      this.isRenameDialogVisible = true;
    },
    doRename(name: string) {
      this.isRenameDialogVisible = false;
      console.log(name);
    },
    onRemove(key: string) {
      let node = Utils.findNodeByKey(this.nodes, key);
      this.selectNode(node);
      this.isRemoveDialogVisible = true;
    },
    doRemove() {
      this.isRemoveDialogVisible = false;
      console.log("Remove");
    },
    onNewDirectory() {
      this.isDirectoryDialogVisible = true;
    },
    doNewDirectory(name: string) {
      this.isDirectoryDialogVisible = false;
      console.log(name);
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
