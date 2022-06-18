<template>
  <div>
    <el-dialog
      width="900px"
      :title="title"
      v-model="dialogVisible"
      destroy-on-close
      @closed="handleClose"
    >
      <slot name="header"></slot>
      <slot></slot>
      <template v-if="showFooter" #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    title: any
    modalConfig?: any
    defaultInfo?: any
    otherInfo?: any
    showForm?: boolean
    showFooter?: boolean
  }>(),
  {
    showForm: true,
    showFooter: true
  }
)
const formData = ref<any>({})
const emit = defineEmits<{
  (e: 'handleConfirmClick'): void
  (e: 'handleClose'): void
}>()
watch(
  () => props.defaultInfo,
  (newValue) => {
    if (newValue) {
      for (const item of props.modalConfig.formItems) {
        formData.value[`${item.field}`] = newValue[`${item.field}`]
      }
    }
  },
  {
    immediate: true
  }
)
const handleConfirmClick = () => {
  // dialogVisible.value = false
  if (Object.keys(props.defaultInfo).length) {
    // 编辑
    console.log('编辑用户')
  }
  emit('handleConfirmClick')
}
const handleClose = () => {
  emit('handleClose')
}
const dialogVisible = ref(false)
const loading = ref(true)
watch(dialogVisible, (ne) => {
  if (!ne) {
    loading.value = true
    useTimeoutFn(() => {
      loading.value = false
    }, 3000)
  }
})

defineExpose({
  dialogVisible
})
</script>
