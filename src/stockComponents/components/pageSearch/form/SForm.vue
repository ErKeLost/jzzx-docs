<template>
  <div :style="itemStyle">
    <slot name="header"> </slot>
  </div>
  <el-form
    :model="formData"
    :rules="rules"
    :label-width="labelWidth"
    :label-position="labelPosition"
    ref="formRef"
  >
    <el-row :gutter="gutter">
      <template v-for="item in formItems" :key="item.label">
        <el-col v-bind="colLayout">
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
            :prop="item.field"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                v-bind="item"
                :placeholder="item.placeholder"
                v-model="formData[`${item.field}`]"
                :show-password="item.type === 'password'"
              ></el-input>
            </template>
            <template v-else-if="item.type === 'checkbox'">
              <el-checkbox
                v-bind="item.otherOptions"
                v-model="formData[`${item.field}`]"
                :label="item.placeholder"
                size="large"
              />
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                  >{{ option.label }}</el-option
                >
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-if="!item.isHidden"
                v-bind="item.otherOptions"
                style="width: 100%"
                v-model="formData[`${item.field}`]"
                value-format="YYYY-MM-DD"
              ></el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
      <el-col v-bind="operationLayout" :style="itemStyle">
        <slot name="operation"></slot>
      </el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { IFormItem } from './types'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()
interface IForm {
  formItems: IFormItem[]
  labelWidth?: string
  labelPosition?: string
  colLayout?: any
  itemStyle?: any
  modelValue: any
  operationLayout?: any
  gutter?: number
  showCreateBtn?: boolean
  isDatePicker?: boolean
  rules?: any
}

const props = withDefaults(defineProps<IForm>(), {
  labelWidth: '100px',
  labelPosition: 'left',
  isDatePicker: false,
  colLayout: () => ({
    xl: 6,
    lg: 6,
    md: 6,
    sm: 6,
    xs: 6
  }),
  itemStyle: {
    padding: '22px 30px 0px 30px'
  }
})
const datePickerAttr = props.formItems.filter(
  (item) => item.field === 'datepicker'
)
const startDate = datePickerAttr[0]?.dateField[0]
const endDate = datePickerAttr[0]?.dateField[1]

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()
const formData = ref({ ...props.modelValue })
watch(
  formData,
  (newValue) => {
    if (props.isDatePicker) {
      const value: any = {
        ...newValue,
        [startDate]: newValue.datepicker[0],
        [endDate]: newValue.datepicker[1]
      }
      delete value['datepicker']
      emit('update:modelValue', value)
    } else {
      emit('update:modelValue', newValue)
    }
  },
  {
    deep: true
  }
)
defineExpose({
  formRef
})
</script>

<style scoped lang="scss"></style>
