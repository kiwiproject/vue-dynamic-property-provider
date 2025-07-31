<template>
  <div
    class="bg-slate-50 max-w-[475px] sm:max-w-none xl:max-w-[1600px] w-full p-8"
  >
    <div class="max-w-[475px] p-8">
      <div class="flex flex-col gap-4">
        <DynamicPropertyField
          v-for="field of fields"
          :key="field.name"
          :field="field"
          :model-value="data"
          :multi-select-size="field.multiSelectSize"
          mode="update"
          :class="
            field.type === 'boolean'
              ? 'flex flex-row gap-2'
              : 'flex flex-col gap-2'
          "
        >
        </DynamicPropertyField>
      </div>
    </div>
    <div class="w-full">
      <div class="rounded-md bg-white dark:bg-slate-800 shadow-md p-8">
        <DynamicPropertyTable
          :fields="fields"
          :data="dataList"
          action-header="Actions"
          class="table-auto text-left w-full border border-gray-200"
        >
          <template #action="{ row }">
            <button type="button">Edit</button>
          </template>
        </DynamicPropertyTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { DynamicPropertyTable, DynamicPropertyField } from "../lib";

const data = ref({
  id: 1,
  studentId: 5,
  createdAt: new Date(),
  secretAnswer: "Hello",
  password: "foo",
  firstName: "Chris",
  age: 43,
  birthDate: new Date(),
  enabled: true,
  admin: false,
  courses: [1, 2],
  maxGradeLevel: "HS",
});

const dataList = ref([data.value]);

const fields = [
  {
    name: "studentId",
    label: "Student ID",
    editableOnCreate: true,
    editableOnUpdate: false,
    visible: true,
    required: false,
    sensitive: false,
    type: "number",
  },
  {
    name: "createdAt",
    label: "Created At",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: false,
    required: false,
    sensitive: false,
    type: "date",
  },
  {
    name: "secretAnswer",
    label: "Secret Answer",
    editableOnCreate: false,
    editableOnUpdate: false,
    visible: true,
    required: false,
    sensitive: true,
    type: "string",
  },
  {
    name: "password",
    label: "Password",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: true,
    sensitive: true,
    type: "string",
  },
  {
    name: "firstName",
    label: "First Name",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "string",
  },
  {
    name: "age",
    label: "Age",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "number",
  },
  {
    name: "birthDate",
    label: "Birthday",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "date",
  },
  {
    name: "enabled",
    label: "Is Enabled?",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "boolean",
  },
  {
    name: "admin",
    label: "Is Admin?",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "boolean",
  },
  {
    name: "courses",
    label: "Courses",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    multiSelectSize: 5,
    type: "list",
    values: [
      { value: 1, display: "CS-101" },
      { value: 2, display: "ENG-104" },
      { value: 3, display: "PYS-300" },
      { value: 4, display: "GOV-200" },
      { value: 5, display: "BIO-200" },
      { value: 6, display: "HLTH-200" },
      { value: 7, display: "HIS-200" },
      { value: 8, display: "ECO-200" },
      { value: 9, display: "FIN-200" },
      { value: 10, display: "ART-200" },
      { value: 11, display: "MUS-200" },
      { value: 12, display: "SCI-200" },
    ],
  },
  {
    name: "maxGradeLevel",
    label: "Max Grade Level",
    editableOnCreate: true,
    editableOnUpdate: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "string",
    values: [
      { value: "ES", display: "Elementary" },
      { value: "MS", display: "Middle" },
      { value: "HS", display: "High School" },
      { value: "Bachelors", display: "Bachelors" },
      { value: "Masters", display: "Masters" },
      { value: "PHD", display: "Doctorate" },
    ],
  },
];
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
