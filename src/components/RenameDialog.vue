<template>
  <template>
    <Dialog
      v-model:visible="isVisible"
      :closable="false"
      :modal="true"
      @show="onShow"
    >
      <template #header>
        <div class="flex flex-row flex-wrap">
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-info-circle text-6xl text-primary mr-2"></i>
          </div>
          <div class="flex align-items-center justify-content-center">
            <h3 class="m-0 p-0">Rename</h3>
          </div>
        </div>
      </template>
      <h5 class="mb-1">New name</h5>
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
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";

export default {
  name: "RenameDialog",
  components: { Button, Dialog, InputText },
  emits: ["onConfirm", "onClose"],
  props: ["node", "isVisible"],
  data() {
    return {
      name: "",
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onShow() {
      this.name = this.node?.data?.name;
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
