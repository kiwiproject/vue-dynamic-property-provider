import { createApp } from "vue";
import App from "./App.vue";
import "./index.css";
import { DynamicPropertyField, DynamicPropertyTable } from "../lib";

const app = createApp(App);
app.component("DynamicPropertyField", DynamicPropertyField);
app.component("DynamicPropertyTable", DynamicPropertyTable);
app.mount("#app");
