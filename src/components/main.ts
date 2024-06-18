import type { App } from "vue";
import { DynamicPropertyField, DynamicPropertyTable } from "@/components";

export default {
  install: (app: App) => {
    app.component("DynamicPropertyField", DynamicPropertyField);
    app.component("DynamicPropertyTable", DynamicPropertyTable);
  },
};

export { DynamicPropertyField, DynamicPropertyTable };
