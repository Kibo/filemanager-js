<template>
  <Toast />

  <Toolbar>
    <template #start>
      <i class="pi pi-home"></i>
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
        :value="nodes"
        class="p-treetable-sm"
        sortMode="single"
        selectionMode="single"
        v-model:selectionKeys="selectedKey"
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
        :value="nodes"
        class="p-treetable-sm"
        sortMode="single"
        selectionMode="single"
        v-model:selectionKeys="selectedKey"
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
      </TreeTable>
    </SplitterPanel>
  </Splitter>
</template>

<script lang="ts">
import { defineAsyncComponent } from "vue";
import Toast from "primevue/toast";
import Toolbar from "primevue/toolbar";
import Button from "primevue/button";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import Column from "primevue/column";
import TreeTable from "primevue/treetable";
import FileUpload from "primevue/fileupload";

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
      nodes: filesystem.root,
      selectedKey: null,
      expandedKeys: {},
    };
  },
  computed: {},
  mounted() {},
  methods: {
    onNodeSelect(node: any) {
      this.$toast.add({
        severity: "success",
        summary: "Node Selected",
        detail: node.data.name,
        life: 3000,
      });
    },
  },
};
</script>

<style lang="less"></style>
