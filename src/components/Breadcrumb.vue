<template>
  <Button
    icon="pi pi-home"
    class="p-button-success p-button-sm mr-1"
    @click="nodeSelected(null)"
  />

  <div v-for="node in path" :key="node.key">
    <i class="pi pi-chevron-right text-300 text-xs mx-2"></i>
    <Button class="p-button-link p-0" @click="nodeSelected(node)">
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
  emits: ["onSelect"],
  props: ["path"],
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
  },
};
</script>

<style lang="less"></style>
