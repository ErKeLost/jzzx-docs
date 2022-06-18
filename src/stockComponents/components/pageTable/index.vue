<template>
  <el-alert v-if="alert" title="success alert" type="success" show-icon />
  <STable
    :tableData="data"
    :tableCount="count"
    :tableLoading="tableLoading"
    v-bind="tableConfig"
    @handleSelectionChange="handleSelectionChange"
    v-model:page="pageInfo"
  >
    <template #action="{ row }">
      <div flex>
        <div ml-5 mr-5 flex @click="handleEditClick(row)">
          <SvgIcon width="20px" :icon="editIcon" />
        </div>
        <div ml-5 mr-5 flex @click="handleDeleteClick(row)">
          <SvgIcon width="20px" :icon="deleteIcon" />
        </div>
      </div>
    </template>
    <!-- 高级插槽 -->
    <template
      v-for="item in otherPropSlots"
      :key="item.prop"
      #[item.slotName]="scope"
    >
      <template v-if="item.slotName">
        <slot :name="item.slotName" :row="scope.row"></slot>
      </template>
    </template>
  </STable>
</template>
<script setup lang="ts">
import { useTableStore } from '@/store'
const { getPageListData } = useTableStore()
const { tableData, tableLoading } = storeToRefs(useTableStore())
const props = withDefaults(
  defineProps<{
    tableConfig?: any
    alert?: boolean
    url: string
    editIcon?: string
    deleteIcon?: string
    action?: boolean
    formData?: any
    loading?: boolean
  }>(),
  {
    tableCount: 100,
    alert: false,
    editIcon: 'heart',
    deleteIcon: 'delete',
    action: true
  }
)
interface pageType {
  currentPage: number
  pageSize: number
}
const queryData = ref()
const emit = defineEmits<{
  (e: 'handleEditClick', item: any): void
  (e: 'handleDeleteClick', item: any): void
  (e: 'handlerQueryInfo', item: any): void
}>()
const pageInfo = ref<pageType>({ currentPage: 1, pageSize: 10 })
watch(
  pageInfo,
  () => {
    getTableData(props.formData ?? queryData?.value)
  },
  { deep: true, immediate: true }
)
const router = useRouter()
watch(
  () => router,
  () => {
    tableData.value = null
  },
  {
    deep: true
  }
)
async function getTableData(queryInfo: any = {}, searchFlag?: boolean) {
  if (searchFlag) {
    pageInfo.value.currentPage = 1
  }
  queryData.value = queryInfo
  delete queryInfo['datepicker']
  console.log(pageInfo.value.currentPage)
  console.log(queryInfo)
  emit('handlerQueryInfo', queryInfo)
  await getPageListData(props.url, {
    start: (pageInfo.value.currentPage - 1) * pageInfo.value.pageSize,
    length: pageInfo.value.pageSize,
    ...queryInfo
  })
}
const data = computed(() => {
  return tableData.value?.data
})
const count = computed(() => {
  return tableData.value?.recordsTotal
})
function handleSelectionChange(value: any) {
  console.log(value)
}
// 获取其他动态插槽
const otherPropSlots = props.tableConfig.propList.filter((item: any) => {
  if (item.slotName === 'action' && props.action) return false
  // if (item.slotName === 'name') return false
  return true
})
function handleDeleteClick(item: any) {
  emit('handleDeleteClick', item)
  // console.log(item, '删除 id 就给删除了')
}
function handleEditClick(item: any) {
  emit('handleEditClick', item)
}
defineExpose({
  getTableData
})
</script>
