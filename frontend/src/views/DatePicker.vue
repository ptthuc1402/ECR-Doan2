<template>
    <VDatePicker @click="pickTime" v-model="date" mode="dateTime" />
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const pickTime = () => {
   const date = ref(new Date());
   console.log(date.value);
  }

  </script>