<template>
  <div>
    <slot name="header"></slot>
    <SForm v-bind="searchFormConfig" v-model="formData">
      <template #operation>
        <div flex items-center>
          <slot name="frontOther"></slot>
          <slot name="operation">
            <div flex justify-between w-full>
              <div>
                <el-button @click="handleResetClick">重置</el-button>
                <el-button type="primary" @click="handleQueryClick"
                  >搜索</el-button
                >
              </div>
              <el-button
                v-if="showCreateBtn"
                type="primary"
                plain
                @click="handleCreateClick"
              >
                <div flex-center m--2><IconMdiPlus text-xl />新增</div>
              </el-button>
            </div>
          </slot>
          <slot name="endOther"></slot>
        </div>
      </template>
    </SForm>
    <slot name="footer"></slot>
  </div>
</template>
<script lang="ts" setup>
import { IFormConfig } from './form/types'
const props = defineProps<{
  searchFormConfig: IFormConfig
}>()
console.log(props.searchFormConfig)

const emit = defineEmits<{
  (e: 'handleResetClick'): void
  (e: 'handleCreateClick'): void
  (e: 'handleQueryClick', value: any): void
}>()
// 双向绑定的属性应该是由配置文件的field来决定
// 1.优化一: formData中的属性应该动态来决定
const formItems = props.searchFormConfig?.formItems ?? []
const formOriginData: any = {}
for (const item of formItems) {
  formOriginData[item.field] = ''
}
const formData = ref(formOriginData)
watch(
  formData,
  () => {
    console.log(formData.value)
  },
  {
    deep: true
  }
)
// 2.优化二: 当用户点击重置
const handleResetClick = () => {
  for (const key in formOriginData) {
    formData.value[`${key}`] = formOriginData[key]
  }
  console.log(formOriginData)

  emit('handleResetClick')
}
const showCreateBtn = computed(() => props.searchFormConfig.showCreateBtn)
// 点击查询
const handleQueryClick = () => {
  emit('handleQueryClick', formData.value)
}
const handleCreateClick = () => {
  emit('handleCreateClick')
}
</script>

<style scoped>
.handle-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  text-align: right;
  margin: 0 50px;
}
</style>
