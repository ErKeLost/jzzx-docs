<template>
  <div>
    <el-table
      :data="tableData"
      v-loading="tableLoading"
      element-loading-text="正在加载中"
      :header-cell-style="tableHeaderStyle"
      :cell-style="cellStyle"
      stripe
      v-bind="otherOptions"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      :row-key="(row) => row.id"
    >
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
      <el-table-column
        v-if="showSelectColumn"
        reserve-selection
        width="60"
        :align="selectColumnAlign ?? 'center'"
        type="selection"
      ></el-table-column>
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        width="80"
        :align="indexColumnAlign ?? 'center'"
        :label="indexColumnLabel ?? '序号'"
        fixed
      ></el-table-column>
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column v-bind="propItem">
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div flex justify-between mt-6 items-center v-if="showFooter">
      <slot name="tableExport"> 我是导出 </slot>
      <slot name="tableFooter">
        <el-pagination
          v-if="
            tableData?.length >= 10 ||
            currentPage.currentPage !== 1 ||
            showPagination
          "
          hide-on-single-page
          background
          v-model:page-size="pageSize"
          v-model:current-page="currentPage.currentPage"
          :page-sizes="pageSizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="tableCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentPageChange"
      /></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
// @ts-nocheck
interface propItemType {
  prop?: string
  label?: string
  minWidth?: string
  slotName?: string
}
interface pageType {
  currentPage?: number
  pageSize?: number
}
const props = withDefaults(
  defineProps<{
    page?: pageType
    tableData?: any[]
    tableLoading?: boolean
    propList?: propItemType[]
    showSelectColumn?: boolean
    indexColumnLabel?: string
    indexColumnAlign?: string
    showIndexColumn?: boolean
    selectColumnAlign?: string
    tableCount?: number
    showFooter?: boolean
    pageSizes?: number[]
    otherOptions?: any
    showPagination?: boolean
  }>(),
  {
    showSelectColumn: true,
    tableLoading: true,
    tableCount: 0,
    propList: () => [],
    showFooter: true,
    page: () => ({ currentPage: 1, pageSize: 10 }),
    pageSizes: () => [10, 20, 50, 100],
    showPagination: true
  }
)
const currentPage = computed(() => {
  return {
    ...props.page
  }
})
const tableHeaderStyle = computed(() => {
  return {
    color: '#606266',
    fontWeight: 'normal',
    backgroundColor: '#fafafa',
    padding: '1rem 0'
  }
})
const cellStyle = computed(() => {
  return {
    padding: '0.8rem 0'
  }
})
const pageSize = ref(props.pageSizes[0])
const emit = defineEmits<{
  (e: 'handleSelectionChange', value: any[]): void
  (e: 'update:page', value: number): void
}>()
function handleSelectionChange(value: any) {
  emit('handleSelectionChange', value)
}
function handleSizeChange<T, U>(pageSize: T): U {
  emit('update:page', { ...props.page, pageSize })
}
function handleCurrentPageChange<T>(currentPage: T): void {
  emit('update:page', { ...props.page, currentPage })
}
</script>
