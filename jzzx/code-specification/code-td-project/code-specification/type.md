# 书写代码规范 💕💕💕

## 革新项目采用 Vite3.0 - Vue3.2.x (3.3) - Pinia - Vue-Router

:::warning
Vue3 我们应该采取代码拆分功能 所有逻辑都应该进行代码拆分 提高 function 可读性可维护性
:::

### 最重要的一点: 代码结构拆分 🍔🍔

:::tip
由于Vue3 所有Api 全部以函数形式引用 那么我们就应该每一个功能 都需要拆分 以达到代码维护性高的问题
:::
### 代码结构规范: 尽量不写回调代码

### 1. 所有网络请求代码， 异步代码 全部使用 async await 非必要情况下不要使用 then

```ts
import { _getUserData } from '@/services'
const value = ref<number>()
function getUserData() {
  _getUserData().then((res) => {
    res.data.data = value.value
  })
}
getUserData() // bad

async function getUserData() {
  const data = await _getUserData()
  value.value = data.data.data
}
getUserData() // good
```

### 2. 一层判断逻辑大于 3 级 使用策略模式 多层条件嵌套 使用策略模式

```ts
function loginLogic() {
  const loginMap = new Map([
    [
      {
        loginSuccess: true,
        initialPassword: true,
      },
      () => {
        console.log('现在是登录成功 并且密码是初始化')
        changePasswordPage.value = true
        verifyRef.value && verifyRef.value.reset()
      },
    ],
    [
      {
        loginSuccess: true,
        initialPassword: false,
      },
      async () => {
        loadText.value = '验证通过'
        userStore.loginVerifyData = null
        await getDictInfo()
        await sleep(600)
        showVerify.value = false
        console.log(dictCodeData.value)
        console.log(getDictData.value('CERTIFICATE_TYPE'))
        console.log('现在是登录成功 进入公司首页')
        ElNotification.success({
          title: '登录成功',
          message: `欢迎回来，${userInfo.value.realName}`,
          showClose: false,
        })
        router.push({ path: '/companyUserManagement/userManagement' })
        loginForm.value.username = ''
        loginForm.value.password = ''
        verifyRef.value && verifyRef.value.reset()
      },
    ],
    [
      {
        loginSuccess: false,
        initialPassword: false,
      },
      () => {
        console.log('现在登录失败 出现error')
        verifyRef.value && verifyRef.value.refreshData()
        verifyRef.value && verifyRef.value.reset()
      },
    ],
  ])
  return loginMap
}
```

### 3. 组件通信 组件通信默认使用 Ts 的泛型模式

```ts
<script setup lang='ts'>
interface job { // interface 代表接口 我们可以定义对象参数类型
  work: string
  address: string
}
const props = defineProps<{
  name: string
  age: number
  job: job
}>() // 这是 默认 提供类型 但是如果我们想要提供默认值 下面例子
interface job { 
  work: string
  address: string
}

const props = withDefaults(defineProps<{
  name?: string
  age?: number
  job?: job
}>(), {
  name: 'erkelost',
  age: 22,
  job: {
    work: 'prog',
    address: 'aoteman'
  }
}) // ？ 代表参数可选
</script>
```
