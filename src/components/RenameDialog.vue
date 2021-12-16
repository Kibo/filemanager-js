<template></template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  name: "RenameDialog",
  components: { Button, Dialog },
  emits: ["onSelect"],
  props: ["path"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
};
</script>

<style lang="less"></style>
