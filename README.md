### Vue Dynamic Property Provider
[![Build](https://github.com/kiwiproject/vue-dynamic-property-provider/workflows/build/badge.svg)](https://github.com/kiwiproject/vue-dynamic-property-provider/actions?query=workflow%3Abuild)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=kiwiproject_vue-dynamic-property-provider&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=kiwiproject_vue-dynamic-property-provider)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=kiwiproject_vue-dynamic-property-provider&metric=coverage)](https://sonarcloud.io/summary/new_code?id=kiwiproject_vue-dynamic-property-provider)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![NPM Version](https://img.shields.io/npm/v/%40kiwiproject%2Fvue-dynamic-property-provider)](https://www.npmjs.com/package/@kiwiproject/vue-dynamic-property-provider)

## Install
```shell
npm install @kiwiproject/vue-dynamic-property-provider
```

## Import and register component
### Global
```js
import { createApp } from 'vue';
import App from './App.vue';

import DynamicPropertyField from '@kiwiproject/vue-dynamic-property-provider';

const app = createApp(App);
app.component('DynamicPropertyField', DynamicPropertyField);
```

### Local
```vue
<template>
  <DynamicPropertyField v-model="firstName" :field="field" />
</template>

<script setup>
  import { ref } from 'vue';
  import DynamicPropertyField from '@kiwiproject/vue-dynamic-property-provider';

  const firstName = ref(null);
  
  const field = ref({
    name: "firstName"
  });
</script>
```
