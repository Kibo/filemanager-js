<template>
  <Toolbar class="pr-1 py-1 bg-orange-600">
    <template #start>
      <Breadcrumb
        :path="path"
        @onSelect="onBreadcrumbSelect"
        @onCollapse="onCollapseAll"
      />
    </template>

    <template #end>
      <Button
        icon="pi pi-window-minimize"
        class="p-button-warning p-button-sm"
        title="Select"
        label="Select"
        @click="onSelect"
      />
    </template>
  </Toolbar>

  <TreeTable
    :value="viewedDirectory"
    class="p-treetable-sm"
    sortMode="single"
    selectionMode="single"
    responsiveLayout="scroll"
    :loading="loading"
    :lazy="false"
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
          @click="onUploads"
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
  <UploadsDialog
    :isVisible="isUploadsDialogVisible"
    @onClose="isUploadsDialogVisible = false"
    @onConfirm="doUploads"
  />
  <QuillLinkDialog
    :isVisible="isQuillLinkDialogVisible"
    :url="compoundUrlForEditor"
    @onClose="isQuillLinkDialogVisible = false"
  />
  <QuillImageDialog
    :isVisible="isQuillImageDialogVisible"
    :url="compoundUrlForEditor"
    @onClose="isQuillImageDialogVisible = false"
  />
  <Toast position="top-center" />
</template>

<script lang="ts">
const path = require("path");
import { INode, EDITORS } from "../types";
import { defineAsyncComponent } from "vue";
import Utils from "../utils/Utils";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import SplitButton from "primevue/splitbutton";
import Column from "primevue/column";
import TreeTable from "primevue/treetable";
import Breadcrumb from "./Breadcrumb.vue";
import Toast from "primevue/toast";
import RemoveDialog from "./RemoveDialog.vue";
import RenameDialog from "./RenameDialog.vue";
import DirectoryDialog from "./DirectoryDialog.vue";
import UploadsDialog from "./UploadsDialog.vue";

// editor integration
import { config } from "../integration/filemanager.config";
import * as ckeditor from "../integration/ckeditor/ckeditor4";
import QuillLinkDialog from "../integration/quill/QuillLinkDialog.vue";
import QuillImageDialog from "../integration/quill/QuillImageDialog.vue";
import * as tinymce from "../integration/tinymce/tinymce5";

export default {
  name: "Filemanager",
  components: {
    Toast,
    Breadcrumb,
    Toolbar,
    Button,
    SplitButton,
    Column,
    TreeTable,
    RemoveDialog,
    RenameDialog,
    DirectoryDialog,
    UploadsDialog,
    QuillLinkDialog,
    QuillImageDialog,
  },
  props: [],
  data() {
    return {
      selectedNode: undefined,
      selectedKey: undefined,
      expandedKeys: {},
      path: [],
      url: "/",
      loading: true,
      isRemoveDialogVisible: false,
      isRenameDialogVisible: false,
      isDirectoryDialogVisible: false,
      isUploadsDialogVisible: false,
      isQuillImageDialogVisible: false,
      isQuillLinkDialogVisible: false,
      viewedDirectory: undefined,
    };
  },
  computed: {
    nodes() {
      return this.$store.state.filesystem as INode[];
    },
    compoundUrlForEditor() {
      return path.join(config.SELECTED_URL_PREFIX, this.url);
    },
  },
  watch: {
    selectedNode(node: INode) {
      this.path = node ? Utils.getPath(this.nodes, node) : [];
      this.url = Utils.getUrl(this.path);
    },
  },
  mounted() {
    this.onExpand(this.getFakeRootNode());
  },
  methods: {
    selectNode(node: INode) {
      if (!node) {
        this.selectedKey = undefined;
        this.selectedNode = undefined;
        return;
      }
      this.selectedKey = { [node.key]: true };
      this.selectedNode = node;
    },
    onNodeSelect(node: INode) {
      this.selectNode(node);
    },
    onBreadcrumbSelect(node: INode) {
      this.onExpand(node);
    },
    onCollapseAll() {
      this.selectedNode = undefined;
      this.selectedKey = undefined;
      this.expandedKeys = {};
      this.onExpand(this.getFakeRootNode());
    },
    onRename(key: string) {
      let node = Utils.findNodeByKey(this.nodes, key);
      this.selectNode(node);
      this.isRenameDialogVisible = true;
    },
    async doRename(name: string) {
      this.isRenameDialogVisible = false;
      try {
        await this.$store.dispatch("rename", { node: this.selectedNode, name });
      } catch (err) {
        this.sendError(err);
        return;
      }
    },
    onRemove(key: string) {
      let node = Utils.findNodeByKey(this.nodes, key);
      this.selectNode(node);
      this.isRemoveDialogVisible = true;
    },
    async doRemove() {
      this.isRemoveDialogVisible = false;
      try {
        await this.$store.dispatch("remove", this.selectedNode);
      } catch (err) {
        this.sendError(err);
        return;
      }
      // delete last element fomr array
      this.path.length && (this.path.length = this.path.length - 1);

      this.selectNode(this.path[this.path.length - 1]);
    },
    onUploads() {
      if (
        this.selectedNode &&
        this.selectedNode?.data?.type != Utils.TYPE_FOLDER
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail:
            "Selected node is not type of 'Folder'. Please, select folder for uploads.",
          life: 3000,
        });
        return;
      }
      this.isUploadsDialogVisible = true;
    },
    async doUploads(files: any) {
      this.isUploadsDialogVisible = false;
      let folder = this.selectedNode || this.getFakeRootNode();
      try {
        await this.$store.dispatch("uploads", {
          node: folder,
          files,
        });
      } catch (err) {
        this.sendError(err);
        return;
      }

      this.onExpand(folder);
    },
    onNewDirectory() {
      if (
        this.selectedNode &&
        this.selectedNode?.data?.type != Utils.TYPE_FOLDER
      ) {
        this.$toast.add({
          severity: "error",
          summary: "Error Message",
          detail:
            "Selected node is not type of 'Folder'. Please, select folder for uploads.",
          life: 3000,
        });
        return;
      }
      this.isDirectoryDialogVisible = true;
    },
    async doNewDirectory(name: string) {
      this.isDirectoryDialogVisible = false;
      try {
        await this.$store.dispatch("mkdir", {
          node: this.selectedNode || this.getFakeRootNode(),
          name,
        });
      } catch (err) {
        this.sendError(err);
        return;
      }
    },
    async onExpand(node: INode) {
      this.loading = true;
      try {
        await this.$store.dispatch("updateFilesystem", node);
      } catch (err) {
        this.sendError(err);
        return;
      } finally {
        this.loading = false;
      }

      node.key != "root" && this.selectNode(node);
      this.viewedDirectory = node.children;
    },

    /*
     * a user clicked at button "Select"
     */
    onSelect() {
      switch (config.EDITOR_NAME) {
        case EDITORS.ckeditor4:
          ckeditor.select(this.compoundUrlForEditor);
          break;
        case EDITORS.quill:
          let filterParam = Utils.getUrlParam("filter") ?? "link";
          filterParam == "image"
            ? (this.isQuillImageDialogVisible = true)
            : (this.isQuillLinkDialogVisible = true);
          break;
        case EDITORS.tinymce5:
          tinymce.select(this.compoundUrlForEditor);
          break;
        default:
          this.$toast.add({
            severity: "success",
            summary: "Selected:",
            detail: this.compoundUrlForEditor,
            life: 3000,
          });
      }
    },
    sendError(message: string) {
      this.$toast.add({
        severity: "error",
        summary: "Error Message",
        detail: message,
        life: 3000,
      });
    },
    getFakeRootNode() {
      return {
        key: "root",
        data: { name: "Root", size: "100kb", type: "Folder" },
        children: this.nodes,
        leaf: false,
      };
    },
  },
};
</script>

<style lang="less">
.p-dialog-header {
  padding: 1em !important;
  padding-bottom: 0 !important;
}
</style>
