<template>
  <Dialog
    v-model:visible="isVisible"
    :closable="false"
    :modal="true"
    @show="onShow"
    class="w-6"
  >
    <template #header>
      <div class="flex flex-row flex-wrap">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-tag text-6xl text-primary mr-2"></i>
        </div>
        <div class="flex align-items-center justify-content-center">
          <h3 class="m-0 p-0">Quill link dialog</h3>
        </div>
      </div>
    </template>

    <h5 class="mb-1">href="{{ data.href }}"</h5>
    <InputText type="text" v-model="data.href" />

    <h5 class="mb-1">title="{{ data.title }}"</h5>
    <InputText type="text" v-model="data.title" />

    <h5 class="mb-1">class="{{ data.class }}"</h5>
    <InputText type="text" v-model="data.class" />

    <h5 class="mb-1">target="{{ data.target }}"</h5>
    <Dropdown v-model="data.target" :options="targetOtions" />

    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        class="p-button-text"
        @click="this.$emit('onClose')"
      />
      <Button
        label="Confirm"
        class="p-button-success"
        icon="pi pi-check"
        @click="onConfirm"
        autofocus
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import * as quill from "./quill";
import { INode } from "../../types";
import { defineAsyncComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";

export default {
  name: "RemoveDialog",
  components: { Button, Dialog, InputText, Dropdown },
  emits: ["onConfirm", "onClose"],
  props: ["url", "isVisible"],
  data() {
    return {
      data: {
        href: "",
        target: "_blank",
        class: "",
        title: "",
      },
      targetOtions: ["_self", "_blank", "_parent", "_top"],
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onShow() {
      this.data.href = this.url;
      this.data.class = "";
      this.data.title = "";
    },
    onConfirm() {
      quill.select("kibo-link", this.data);
      this.$emit("onConfirm", this.data);
    },
  },
};
</script>

<style lang="less">
.p-inputtext {
  width: 100%;
}
</style>
