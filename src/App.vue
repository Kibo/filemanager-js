<template>
  <Filemanager />
</template>

<script lang="ts">
import "/node_modules/primevue/resources/themes/saga-blue/theme.css";
import "/node_modules/primevue/resources/primevue.min.css";
import "/node_modules/primeflex/primeflex.css";
import "/node_modules/primeicons/primeicons.css";

import { defineAsyncComponent } from "vue";
import Filemanager from "./components/Filemanager.vue";

export default {
  name: "App",
  components: {
    Filemanager,
  },
  props: [],
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style lang="less">
#app {
}
</style>
