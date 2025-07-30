<template>
  <div>
    <label
      v-if="field.visible"
      :for="'dynamic_field_' + field.name"
      :class="labelStyle"
    >
      {{ field.label }}:
      <template v-if="field.required">
        <span class="sr-only">Required</span>
        <span :class="labelRequiredStyle">*</span>
      </template>
    </label>
    <template
      v-if="
        (props.mode === 'create' && !field.editableOnCreate) ||
        (props.mode === 'update' && !field.editableOnUpdate)
      "
    >
      <input
        disabled
        :type="field.sensitive ? 'password' : 'text'"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :class="fieldStyle"
      />
    </template>
    <template v-else-if="!field.visible">
      <input
        type="hidden"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
      />
    </template>
    <template v-else-if="field.sensitive">
      <input
        type="password"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :class="fieldStyle"
        @keyup="modelUpdated"
      />
    </template>
    <template
      v-else-if="
        field.values && field.values.length > 0 && field.type !== 'list'
      "
    >
      <slot name="single-select-field">
        <select v-model="fieldValue" :class="fieldStyle" @change="modelUpdated">
          <option
            v-for="opt in props.field.values"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.display }}
          </option>
        </select>
      </slot>
    </template>
    <template v-else-if="field.type === 'string'">
      <input
        type="text"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :class="fieldStyle"
        :autocomplete="props.autocomplete"
        @keyup="modelUpdated"
      />
    </template>
    <template v-else-if="field.type === 'number'">
      <input
        type="number"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :class="fieldStyle"
        :autocomplete="props.autocomplete"
        @keyup="modelUpdated"
      />
    </template>
    <template v-else-if="field.type === 'date'">
      <!-- TODO: Add date picker -->
      <input
        type="text"
        :id="'dynamic_field_' + field.name"
        :value="dataForField()"
        :class="fieldStyle"
        :autocomplete="props.autocomplete"
        @keyup="modelUpdated"
      />
    </template>
    <template v-else-if="field.type === 'list'">
      <slot name="multiple-select-field">
        <select v-model="fieldValue" :class="fieldStyle" :size="multiSelectSize" multiple @change="modelUpdated">
          <option
            v-for="opt in props.field.values"
            :key="opt.value"
            :value="opt.value"
          >
            {{ opt.display }}
          </option>
        </select>
      </slot>
    </template>
    <template v-else-if="field.type === 'boolean'">
      <input
        type="checkbox"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :checked="fieldValue"
        class="inline-flex justify-start"
        @change="modelUpdated"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";

const emits = defineEmits(["model-updated"]);

const fieldValue = ref();

const props = defineProps({
  field: {
    type: Object,
    required: true,
  },
  labelStyle: {
    type: String,
    default:
      "basis-1/4 inline-flex text-xs text-left uppercase font-semibold text-gray-700 dark:text-gray-300",
  },
  labelRequiredStyle: {
    type: String,
    default:
      "pl-1 text-red-500",
  },
  fieldStyle: {
    type: String,
    default:
      "basis-3/4 h-[2.5rem] flex w-full rounded-md py-1 px-3 my-1 bg-transparent border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:ring-indigo-600 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-0 disabled:text-gray-400",
  },
  multiSelectSize: {
    type: Number,
    default: 4,
  },
  modelValue: {
    type: [Object],
    required: true,
  },
  mode: {
    type: String,
    required: true,
    validator(value: string) {
      return ["create", "update"].includes(value);
    },
  },
  autocomplete: {
    type: String,
    default: "off",
  },
});

const modelUpdated = () => {
  emits("model-updated", fieldValue.value);
};

watch(props.modelValue, () => {
  if (props.field.type === "boolean") {
    fieldValue.value = !!props.modelValue[props.field.name];
  } else {
    fieldValue.value = props.modelValue[props.field.name];
  }
});

onMounted(() => {
  if (props.field.type === "boolean") {
    fieldValue.value = !!props.modelValue[props.field.name];
  } else {
    fieldValue.value = props.modelValue[props.field.name];
  }
});

const dataForField = () => {
  return props.modelValue[props.field.name];
};

</script>
