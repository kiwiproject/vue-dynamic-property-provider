<template>
  <table>
    <thead>
      <tr>
        <th
          v-for="field in props.fields"
          v-bind:key="field.name"
          :class="props.headerStyle"
        >
          {{ field.label }}
        </th>
        <th v-if="$slots.action" :class="props.headerStyle">{{ props.actionHeader }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in props.data" v-bind:key="row[props.idField]">
        <td
          v-for="field in props.fields"
          v-bind:key="field.name"
          :class="props.cellStyle"
        >
          <span v-if="field.sensitive">{{
            "*".repeat(row[field.name].length)
          }}</span>
          <span v-else>{{ row[field.name] }}</span>
        </td>
        <td v-if="$slots.action" :class="props.cellStyle">
          <slot name="action" :row="row"/>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
const props = defineProps({
  fields: {
    type: [Object],
    required: true,
  },
  data: {
    type: [Object],
    require: true,
  },
  idField: {
    type: String,
    default: "id",
  },
  headerStyle: {
    type: String,
    default: "font-semibold text-sm p-2 border border-gray-200 bg-gray-200",
  },
  cellStyle: {
    type: String,
    default: "text-sm p-2 border border-gray-200",
  },
  actionHeader: {
    type: String,
    default: ""
  }
});
</script>
