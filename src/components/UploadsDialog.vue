<template>
  <Dialog v-model:visible="isVisible" :closable="false" :modal="true">
    <template #header>
      <div class="flex flex-row flex-wrap mb-3">
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-cloud-download text-6xl text-primary mr-2"></i>
        </div>
        <div class="flex align-items-center justify-content-center">
          <h3 class="m-0 p-0">Uploads</h3>
        </div>
      </div>
    </template>

    <FileUpload
      :customUpload="true"
      @uploader="uploader"
      @upload="onUpload"
      :multiple="true"
      accept="image/*"
    >
      <template #empty>
        <p>Drag and drop files to here to upload.</p>
      </template>
    </FileUpload>

    <template #footer>
      <Button
        label="Close"
        icon="pi pi-times"
        class="p-button-text"
        @click="this.$emit('onClose')"
      />
    </template>
  </Dialog>
</template>

<script lang="ts">
import { INode } from "../types";
import { defineAsyncComponent } from "vue";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import FileUpload from "primevue/fileupload";

export default {
  name: "UploadsDialog",
  components: {
    Button,
    Dialog,
    FileUpload,
  },
  emits: ["onConfirm", "onClose"],
  props: ["isVisible"],
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    onUpload() {
      // TODO
      console.log("finish");
    },
    uploader(event: any) {
      this.$emit("onConfirm", event.files);
    },
  },
};
</script>

<style lang="less"></style>
