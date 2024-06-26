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
        <th v-if="$slots.action" :class="props.headerStyle">
          {{ props.actionHeader }}
        </th>
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
          <span
            v-else-if="
              (props.resolveListValues && field.type === 'list') ||
              (field.values && field.values.length > 0)
            "
          >
            {{ resolveAndJoinValues(field, row[field.name]) }}
          </span>
          <span v-else>{{ row[field.name] }}</span>
        </td>
        <td v-if="$slots.action" :class="props.cellStyle">
          <slot name="action" :row="row" />
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
    default: "",
  },
  resolveListValues: {
    type: Boolean,
    default: true,
  },
});

function resolveAndJoinValues(
  field: { values: Array<{ value: string | number; display: string }> },
  fieldValue: string | number | Array<string | number>,
): string {
  if (Array.isArray(fieldValue)) {
    return fieldValue
      .map(
        (fv: string | number) =>
          field.values.filter(
            (f: { value: string | number }) => f.value === fv,
          )[0].display,
      )
      .join(", ");
  }

  return field.values.filter((f) => f.value === fieldValue)[0].display;
}
</script>
