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
        <span class="pl-1 text-red-500">*</span>
      </template>
    </label>
    <template v-if="!field.editable">
      <input
        disabled
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
      />
    </template>
    <template
      v-else-if="
        field.values && field.values.length > 0 && field.type !== 'list'
      "
    >
      <Listbox v-model="fieldValue">
        <div class="relative">
          <ListboxButton :class="fieldStyle">{{ fieldValue }}</ListboxButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <ListboxOptions :class="listBoxStyle">
              <ListboxOption
                v-for="opt in props.field.values"
                v-slot="{ active }"
                :key="opt"
                :value="opt"
              >
                <li
                  :class="[
                    active ? 'bg-gray-100  dark:bg-slate-700' : 'bg-none',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  {{ opt }}
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </template>
    <template v-else-if="field.type === 'string'">
      <input
        type="text"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :class="fieldStyle"
      />
    </template>
    <template v-else-if="field.type === 'number'">
      <input
        type="number"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :class="fieldStyle"
      />
    </template>
    <template v-else-if="field.type === 'date'">
      <!-- TODO: Add date picker -->
      <input
        type="text"
        :id="'dynamic_field_' + field.name"
        :value="dataForField()"
        :class="fieldStyle"
      />
    </template>
    <template v-else-if="field.type === 'list'">
      <Listbox v-model="fieldValue" multiple>
        <div class="relative">
          <ListboxButton :class="fieldStyle">{{
            fieldValue?.join(", ")
          }}</ListboxButton>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <ListboxOptions :class="listBoxStyle">
              <ListboxOption
                v-for="opt in props.field.values"
                v-slot="{ active }"
                :key="opt"
                :value="opt"
              >
                <li
                  :class="[
                    active ? 'bg-gray-100  dark:bg-slate-700' : 'bg-none',
                    'relative cursor-default select-none py-2 pl-10 pr-4',
                  ]"
                >
                  {{ opt }}
                </li>
              </ListboxOption>
            </ListboxOptions>
          </transition>
        </div>
      </Listbox>
    </template>
    <template v-else-if="field.type === 'boolean'">
      <input
        type="checkbox"
        :id="'dynamic_field_' + field.name"
        v-model="fieldValue"
        :checked="fieldValue"
        class="inline-flex justify-start"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";

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
  fieldStyle: {
    type: String,
    default:
      "basis-3/4 h-[2.5rem] flex w-full rounded-md py-1 px-3 my-1 bg-transparent border border-gray-300 dark:border-gray-600 focus:outline-none focus-visible:ring-indigo-600 focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-0 disabled:text-gray-400",
  },
  listBoxStyle: {
    type: String,
    default:
      "absolute w-full py-1 mt-1 overflow-auto text-gray-900 bg-white rounded-md shadow-lg max-h-52 ring-1 ring-black ring-opacity-5 dark:text-gray-300 dark:bg-slate-800 dark:ring-1 dark:ring-slate-50 dark:ring-opacity-10 focus:outline-none z-[5]",
  },
  modelValue: {
    type: [Object],
    required: true,
  },
});

watch(props.modelValue, () => {
  fieldValue.value = props.modelValue[props.field.name];
});

onMounted(() => {
  fieldValue.value = props.modelValue[props.field.name];
  if (props.field.name === "courses") {
    console.log("FIeld", fieldValue.value.join(", "));
  }
});

const dataForField = () => {
  return props.modelValue[props.field.name];
};
</script>
