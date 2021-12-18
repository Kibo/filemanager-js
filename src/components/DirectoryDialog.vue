<template>
  <template>
    <Dialog
      v-model:visible="isVisible"
      :closable="false"
      :modal="true"
      @show="onShow"
    >
      <div class="flex flex-row flex-wrap">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-folder text-6xl text-primary mr-2"></i>
        </div>
        <div class="flex align-items-center justify-content-center">
          <h3 class="m-0 p-0">Create directory</h3>
        </div>
      </div>
      <p>Path: {{ parents }}</p>
      <h5 class="mb-1">Directory name</h5>
      <InputText type="text" v-model="name" placeholder="new name" />
      <template #footer>
        <Button
          label="Close"
          icon="pi pi-times"
          class="p-button-text"
          @click="this.$emit('onClose')"
        />
        <Button
          label="Confirm"
          class="p-button-primary"
          icon="pi pi-check"
          @click="onConfirm"
          autofocus
        />
      </template>
    </Dialog>
  </template>
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Utils from "../utils/Utils";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default {
  name: "RenameDialog",
  components: { Button, Dialog, InputText },
  emits: ["onConfirm", "onClose"],
  props: ["path", "isVisible"],
  data() {
    return {
      parents: undefined,
      name: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onShow() {
      this.parents = this.path as INode[];
      this.name = "";
      console.log(this.path);
    },
    onConfirm() {
      if (this.name) {
        this.$emit("onConfirm", this.name);
      }
    },
  },
};
</script>

<style lang="less"></style>
