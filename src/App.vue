<template>
  <div class="max-w-[475px] p-8">
    <div class="flex flex-col gap-4">
      <DynamicPropertyField
        v-for="field of Object.keys(data)"
        v-bind:key="field"
        :field="fields.filter((f) => f.name === field)[0]"
        :modelValue="data"
        :class="
          fields.filter((f) => f.name === field)[0].type === 'boolean'
            ? 'flex flex-row gap-2'
            : 'flex flex-col gap-2'
        "
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import DynamicPropertyField from "@/components/DynamicPropertyField.vue";
import { ref } from "vue";

const data = ref({
  studentId: 5,
  createdAt: new Date(),
  password: "foo",
  firstName: "Chris",
  age: 43,
  birthDate: new Date(),
  enabled: true,
  admin: false,
  courses: ["CS-101", "ENG-104"],
  maxGradeLevel: "HS",
});

const fields = [
  {
    name: "studentId",
    label: "Student ID",
    editable: false,
    visible: true,
    required: false,
    sensitive: false,
    type: "number",
  },
  {
    name: "createdAt",
    label: "Created At",
    editable: true,
    visible: false,
    required: false,
    sensitive: false,
    type: "date",
  },
  {
    name: "password",
    label: "Password",
    editable: true,
    visible: true,
    required: true,
    sensitive: true,
    type: "string",
  },
  {
    name: "firstName",
    label: "First Name",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "string",
  },
  {
    name: "age",
    label: "Age",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "number",
  },
  {
    name: "birthDate",
    label: "Birthday",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "date",
  },
  {
    name: "enabled",
    label: "Is Enabled?",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "boolean",
  },
  {
    name: "admin",
    label: "Is Admin?",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "boolean",
  },
  {
    name: "courses",
    label: "Courses",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "list",
    values: ["CS-101", "ENG-104", "PYS-300", "GOV-200"],
  },
  {
    name: "maxGradeLevel",
    label: "Max Grade Level",
    editable: true,
    visible: true,
    required: false,
    sensitive: false,
    type: "string",
    values: ["ES", "MS", "HS", "Bachelors", "Masters", "PHD"],
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
