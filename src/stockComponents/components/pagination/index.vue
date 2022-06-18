<template>
  <el-pagination
    background
    v-model:page-size="pageSize"
    v-model:current-page="currentPage.currentPage"
    :page-sizes="pageSizes"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalCount"
    @size-change="handleSizeChange"
    @current-change="handleCurrentPageChange"
  />
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
interface pageType {
  currentPage?: number;
  pageSize?: number;
}
const emit = defineEmits<{
  (e: "update:page", value: number): void;
}>();
const props = withDefaults(
  defineProps<{
    page?: pageType;
    pageSizes?: number[];
    showPagination?: boolean;
    totalCount?: number;
  }>(),
  {
    page: () => ({ currentPage: 1, pageSize: 10 }),
    pageSizes: () => [10, 20, 50, 100],
    showPagination: true,
    totalCount: 0,
  }
);
const currentPage = computed(() => {
  return {
    ...props.page,
  };
});

const pageSize = ref(props.pageSizes[0]);
function handleSizeChange<T, U>(pageSize: T): U {
  emit("update:page", { ...props.page, pageSize });
}
function handleCurrentPageChange<T>(currentPage: T): void {
  emit("update:page", { ...props.page, currentPage });
}
</script>

<style scoped></style>
<!-- 使用方式  
    <Pagination v-model:page="page" />
 -->
