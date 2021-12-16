<template>
  <Button
    icon="pi pi-home"
    class="p-button-link text-white px-0"
    @click="collapseAll"
  />

  <div v-for="node in path" :key="node.key">
    <i class="pi pi-chevron-right text-400 text-xs mx-1"></i>
    <Button class="p-button-link p-0 text-white" @click="nodeSelected(node)">
      {{ node.data.name }}
    </Button>
  </div>
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Button from "primevue/button";

export default {
  name: "Breadcrumb",
  components: { Button },
  emits: ["onSelect", "onCollapse"],
  props: ["path", "expandedKeys"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    nodeSelected(node: INode) {
      this.$emit("onSelect", node);
    },
    collapseAll() {
      this.$emit("onCollapse");
    },
  },
};
</script>

<style lang="less"></style>
