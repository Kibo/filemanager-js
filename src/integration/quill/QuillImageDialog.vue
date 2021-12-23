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
          <h3 class="m-0 p-0">Quill image dialog</h3>
        </div>
      </div>
    </template>

    <h5 class="mb-1">src="{{ data.src }}"</h5>
    <InputText type="text" v-model="data.src" />

    <h5 class="mb-1">alt="{{ data.alt }}"</h5>
    <InputText type="text" v-model="data.alt" />

    <div class="grid">
      <div class="col">
        <h5 class="mb-1">class="{{ data.class }}"</h5>
        <InputText type="text" v-model="data.class" />

        <h5 class="mb-1">width="{{ data.width }}"</h5>
        <InputText type="text" v-model="data.width" />

        <h5 class="mb-1">height="{{ data.height }}"</h5>
        <InputText type="text" v-model="data.height" />
      </div>
      <div class="col mt-2">
        <Image :src="data.src" :alt="data.alt" imageClass="w-full" />
      </div>
    </div>

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
import * as quill from "../quill";
import { INode } from "../../types";
import { defineAsyncComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputText from "primevue/inputtext";
import Image from "primevue/image";

export default {
  name: "RemoveDialog",
  components: { Button, Dialog, InputText, Image },
  emits: ["onConfirm", "onClose"],
  props: ["url", "isVisible"],
  data() {
    return {
      data: {
        src: "",
        alt: "",
        class: "",
        width: "",
        height: "",
      },
    };
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onShow() {
      this.data.src = this.url;
      this.data.alt = "";
      this.data.class = "";
      this.data.width = "";
      this.data.height = "";
    },
    onConfirm() {
      quill.select("kibo-image", this.data);
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
