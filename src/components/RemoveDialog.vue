<template>
  <Dialog v-model:visible="isVisible" :closable="false" :modal="true">
    <div class="flex flex-row flex-wrap">
      <div class="flex align-items-center justify-content-center">
        <i class="pi pi-exclamation-triangle text-6xl text-pink-600 mr-2"></i>
      </div>
      <div class="flex align-items-center justify-content-center">
        <h3 class="m-0 p-0">Confirmation</h3>
      </div>
    </div>

    <p>Do you want to delete {{ node.data.name }}?</p>
    <template #footer>
      <Button
        label="No"
        icon="pi pi-times"
        class="p-button-text"
        @click="this.$emit('onClose')"
      />
      <Button
        label="Yes"
        class="p-button-danger"
        icon="pi pi-trash"
        @click="this.$emit('onConfirm')"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";

export default {
  name: "RemoveDialog",
  components: { Button, Dialog },
  emits: ["onConfirm", "onClose"],
  props: ["node", "isVisible"],
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
