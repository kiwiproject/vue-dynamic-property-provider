import type { App } from "vue";
import { DynamicPropertyField } from "@/components";

export default {
  install: (app: App) => {
    app.component("DynamicPropertyField", DynamicPropertyField);
  },
};

export { DynamicPropertyField };
