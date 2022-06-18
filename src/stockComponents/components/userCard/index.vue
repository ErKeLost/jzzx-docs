<template>
  <el-card shadow="hover" w-350px>
    <div mt-1 mb-2>
      <div grid items-center class="card-header">
        <el-avatar
          size="large"
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        />
        <div grid>
          <div p-1 flex justify-between items-center>
            <div>{{ name }}</div>
            <el-dropdown trigger="click" @command="actionUserInfo">
              <div cursor-pointer class="i-ph-dots-three-light" text-2xl></div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="1">
                    <div class="i-bx-edit-alt" mr-2 />
                    编辑</el-dropdown-item
                  >
                  <el-dropdown-item :command="2">
                    <div class="i-ri-delete-bin-6-line" mr-2 />
                    删除</el-dropdown-item
                  >
                  <el-dropdown-item :command="3" v-if="isContacts">
                    <div class="i-ri-lock-unlock-line" mr-2 />
                    解锁</el-dropdown-item
                  >
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
          <div p-1 class="card-subTitle">客户号 / 18906520986</div>
        </div>
      </div>
      <div ml-2 mt-5>
        <div mt-2 grid grid-cols-9>
          <div color-gray text-xl class="i-carbon-phone"></div>
          <div>{{ phone }}</div>
        </div>
        <div mt-2 grid grid-cols-9>
          <div color-gray text-xl class="i-carbon-email"></div>
          <div>{{ email }}</div>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
interface props {
  info?: any
  isContacts?: boolean
  name?: string
  phone?: string | number
  email?: string | number
}
const props = withDefaults(defineProps<props>(), {
  isContacts: true
})
const emit = defineEmits<{
  (e: 'userChoose', value: string | number | object, info: any): void
}>()
function actionUserInfo(command: string | number | object) {
  emit('userChoose', command, props.info)
}
</script>

<style scoped lang="scss">
.card {
  &-header {
    grid-template-columns: 1fr 3fr;
  }
  &-subTitle {
    color: #8897b1;
  }
}
</style>
