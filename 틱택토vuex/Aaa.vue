<template>
  <div v-if="rowData.length !== 0">
    <div
      v-for="(cellData, index) in rowData"
      :key="index"
      >
      {{ rowData.length }}
      {{ cellData.a }}
      {{ cellData.b }}
      {{ cellData.c }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rowData : {
      type: Array,
      required: false,
    },
  },
};
</script>