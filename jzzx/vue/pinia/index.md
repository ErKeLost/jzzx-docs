# 前言

Pinia.js 是新一代的状态管理器，由 Vue.js团队中成员所开发的，因此也被认为是下一代的 Vuex，即 Vuex5.x，在 Vue3.0 的项目中使用也是备受推崇。

Pinia.js 有如下特点：

-   完整的 typescript 的支持；
-   足够轻量，压缩后的体积只有1.6kb;
-   去除 mutations，只有 state，getters，actions（这是我最喜欢的一个特点）；
-   actions 支持同步和异步；
-   没有模块嵌套，只有 store 的概念，store 之间可以自由使用，更好的代码分割；
-   无需手动添加 store，store 一旦创建便会自动添加；

# 安装

```
npm install pinia --save
复制代码
```

# 创建 Store

新建 src/store 目录并在其下面创建 index.ts，导出 store

```
// src/store/index.ts

import { createPinia } from 'pinia'

const store = createPinia()

export default store
复制代码
```

在 main.ts 中引入并使用。

```
// src/main.ts

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

const app = createApp(App)
app.use(store)
复制代码
```

# State

## 定义State

在 src/store 下面创建一个user.ts

```
//src/store/user.ts

import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      name: '张三'
    }
  }
})

复制代码
```

## 获取 state

```
<template>
  <div>{{ userStore.name }}</div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
</script>
复制代码
```

也可以结合 computed 获取。

```
const name = computed(() => userStore.name)
复制代码
```

state 也可以使用解构，但使用解构会使其失去响应式，这时候可以用 pinia 的 **storeToRefs**。

```
import { storeToRefs } from 'pinia'
const { name } = storeToRefs(userStore)
复制代码
```

## 修改 state

可以像下面这样直接修改 state

```
userStore.name = '李四'
复制代码
```

但一般不建议这么做，建议通过 actions 去修改 state，action 里可以直接通过 this 访问。

```
export const useUserStore = defineStore({
  id: 'user',
  state: () => {
    return {
      name: '张三'
    }
  },
  actions: {
    updateName(name) {
      this.name = name
    }
  }
})
复制代码
```

```
<script lang="ts" setup>
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
userStore.updateName('李四')
</script>
复制代码
```

# Getters

```
export const useUserStore = defineStore({
 id: 'user',
 state: () => {
   return {
     name: '张三'
   }
 },
 getters: {
   fullName: (state) => {
     return state.name + '丰'
   }
 }
})
复制代码
```

```
userStore.fullName // 张三丰
复制代码
```

# Actions

## 异步 action

action 可以像写一个简单的函数一样支持 async/await 的语法，让你愉快的应付异步处理的场景。

```
export const useUserStore = defineStore({
  id: 'user',
  actions: {
    async login(account, pwd) {
      const { data } = await api.login(account, pwd)
      return data
    }
  }
})
复制代码
```

## action 间相互调用

action 间的相互调用，直接用 this 访问即可。

```
 export const useUserStore = defineStore({
  id: 'user',
  actions: {
    async login(account, pwd) {
      const { data } = await api.login(account, pwd)
      this.setData(data) // 调用另一个 action 的方法
      return data
    },
    setData(data) {
      console.log(data)
    }
  }
})
复制代码
```

在 action 里调用其他 store 里的 action 也比较简单，引入对应的 store 后即可访问其内部的方法了。

```
// src/store/user.ts

import { useAppStore } from './app'
export const useUserStore = defineStore({
  id: 'user',
  actions: {
    async login(account, pwd) {
      const { data } = await api.login(account, pwd)
      const appStore = useAppStore()
      appStore.setData(data) // 调用 app store 里的 action 方法
      return data
    }
  }
})
复制代码
```

```
// src/store/app.ts

export const useAppStore = defineStore({
  id: 'app',
  actions: {
    setData(data) {
      console.log(data)
    }
  }
})
复制代码
```

# 数据持久化

插件 pinia-plugin-persist 可以辅助实现数据持久化功能。

## 安装

```
npm i pinia-plugin-persist --save
复制代码
```

## 使用

```
// src/store/index.ts

import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const store = createPinia()
store.use(piniaPluginPersist)

export default store
复制代码
```

接着在对应的 store 里开启 persist 即可。

```
export const useUserStore = defineStore({
  id: 'user',

  state: () => {
    return {
      name: '张三'
    }
  },
  
  // 开启数据缓存
  persist: {
    enabled: true
  }
})
复制代码
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/78daed17554949929ab333e4ab428879~tplv-k3u1fbpfcp-zoom-1.image)

数据默认存在 sessionStorage 里，并且会以 store 的 id 作为 key。

## 自定义 key

你也可以在 strategies 里自定义 key 值，并将存放位置由 sessionStorage 改为 localStorage。

```
persist: {
  enabled: true,
  strategies: [
    {
      key: 'my_user',
      storage: localStorage,
    }
  ]
}
复制代码
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/90b1624742604b2aa3b22236b216b54a~tplv-k3u1fbpfcp-zoom-1.image)

## 持久化部分 state

默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。

```
state: () => {
  return {
    name: '张三',
    age: 18,
    gender: '男'
  }  
},

persist: {
  enabled: true,
  strategies: [
    {
      storage: localStorage,
      paths: ['name', 'age']
    }
  ]
}
复制代码
```

上面我们只持久化 name 和 age，并将其改为localStorage, 而 gender 不会被持久化，如果其状态发送更改，页面刷新时将会丢失，重新回到初始状态，而 name 和 age 则不会。





[![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/badb208c2fe642e68d902732d7a71940~tplv-k3u1fbpfcp-zoom-1.image)](https://juejin.cn/user/475439118171927)


![Vue项目进阶：再谈Pinia函数式（composition API）用法](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64c9472040ab4912950a1a8be39f33a2~tplv-k3u1fbpfcp-zoom-1.image)


# 背景

Hello大家好，前段时间写了一篇关于`Pinia`的composition API用法的文章[《Pinia进阶：优雅的setup（函数式）写法+封装到你的企业项目》](https://juejin.cn/post/7057439040911441957 "https://juejin.cn/post/7057439040911441957")，收到了不少朋友的反馈和建议。笔者也结合最近项目情况和网友们的建议做一次**优化**，也算是一个比较完整的版本了，这包括：

-   `options API` 到 `composition API`写法的完整映射示例
-   补充composition API模式的ts类型提示补充
-   关于Store实例的内置函数一些思考
-   工程项目下pinia相关模块封装

本文的所有demo专门开了个[GitHub项目](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJohnnyZhangQiao%2Fpinia-use "https://github.com/JohnnyZhangQiao/pinia-use")来保存，有需要的同学可以拿下来实践。🌹🌹

# 认识Pinia

相信在座各位假如使用Vue生态开发项目情况下，对`Pinia`状态管理库应该有所听闻或正在使用，假如还没接触到Pinia，这篇文章可以帮你快速入门，并如何在企业项目中更优雅封装使用。

**`Pinia`读音：/piːnjʌ/，是Vue官方团队推荐代替`Vuex`的一款轻量级状态管理库。**  它最初的设计理念是让Vue Store拥有一款[Composition API](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fcomposition-api "https://github.com/vuejs/composition-api")方式的状态管理库，并同时能支持 Vue2.x版本的Option API 和 Vue3版本的setup Composition API开发模式，并完整兼容Typescript写法（这也是优于Vuex的重要因素之一），适用于所有的vue项目。前段时间尤雨溪也说过Pinia其实就是Vuex5，其诞生是更好服务于Vue3的。

比起Vuex，Pinia具备以下优点：

> -   完整的 TypeScript 支持：与在 Vuex 中添加 TypeScript 相比，添加 TypeScript 更容易
> -   极其轻巧(体积约 1KB)
> -   store 的 action 被调度为常规的函数调用，而不是使用 dispatch 方法或 MapAction 辅助函数，这在 Vuex 中很常见
> -   支持多个Store
> -   支持 Vue devtools、SSR 和 webpack 代码拆分

# Pinia与Vuex代码分割机制

上述的Pinia轻量有一部分体现在它的代码分割机制中。

> 举个例子：某项目有**3个store「user、job、pay」**，另外有**2个路由页面「首页、个人中心页」**，**首页用到job store，个人中心页用到了user store**，分别用Pinia和Vuex对其状态管理。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6f5b279c487f4746b92f560a3304d534~tplv-k3u1fbpfcp-zoom-1.image)

**先看Vuex的代码分割：**  打包时，vuex会把3个store合并打包，当首页用到Vuex时，这个包会引入到首页一起打包，最后输出1个js chunk。这样的问题是，其实首页只需要其中1个store，但其他2个无关的store也被打包进来，造成资源浪费。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fdaf8f35a1a4d73981a8b7d888d469f~tplv-k3u1fbpfcp-zoom-1.image)

**Pinia的代码分割：**  打包时，Pinia会检查引用依赖，当首页用到job store，打包只会把用到的store和页面合并输出1个js chunk，其他2个store不耦合在其中。Pinia能做到这点，是因为它的设计就是store分离的，解决了项目的耦合问题。

# Pinia的 Composition API 写法

事不宜迟，直接开始使用`Pinia`。

## 1. 安装

```
yarn add pinia
# or with npm
npm install pinia
复制代码
```

## 2. 项目引入

```
import { createPinia } from 'pinia'

app.use(createPinia())
复制代码
```

## 3. 创建第一个store

定义store模式有2种：`options API` 和 `composition API`。

前者不做细述了，社区文章一大堆；使用`composition API`模式定义store，符合Vue3 setup的编程模式，让结构更加扁平化，个人推荐推荐使用这种方式。

在`src/store/counterForSetup.ts`创建第一个的store：

```
import { ref, computed } from 'vue';
import { defineStore } from 'pinia';

// 使用composition API模式定义store
export const useCounterStoreForSetup = defineStore('counterForSetup', () => {
  const count = ref<number>(1);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  return { count, doubleCount, increment };
});
复制代码
```

这与下面定义方式是完全等价的「至少在实例化之前是🐶🐶，实例化后有点不一样下面会讲到，但不影响使用」：

```
import { defineStore } from 'pinia';

// 使用options API模式定义
export const useCounterStoreForOption = defineStore('counterForOptions', {
  // 定义state
  state: () => {
    return { count: 1 };
  },
  // 定义action
  actions: {
    increment() {
      this.count++;
    }
  },
  // 定义getters
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  }
});
复制代码
```

上述可以看出来：

1.  **composition API中的`ref`、`reactive`定义的变量等价于options API中的`state`；**
1.  **composition API中的`computed`属性等价于options API中的`getters`；**
1.  **composition API中的导出函数等价于options API中的`actions`；**

最后两者在devtools的表现完全一致：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f9f8497c55449fe9562f373c8209cd4~tplv-k3u1fbpfcp-zoom-1.image)

在Typescript类型提醒上是这样的：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f057e7f11e6a4ba8ab14bf3f9f07d009~tplv-k3u1fbpfcp-zoom-1.image)

## 4. 业务组件对store的调用

在`src/components/PiniaBasicSetup.vue`目录下创建个组件，在组件内对store实例化后可直接调用。

```
<script setup lang="ts" name="component-PiniaBasicSetup">
import { storeToRefs } from 'pinia';
import { useCounterStoreForSetup } from '@/store/counterForSetup';

// composition API模式
const counterStoreForSetup = useCounterStoreForSetup();
// 确保解构确保后的state具有响应式，要使用storeToRefs方法
const { count, doubleCount } = storeToRefs(counterStoreForSetup);
const { increment } = counterStoreForSetup;
</script>

<template>
  <div class="box-styl">
    <h1>Setup模式</h1>
    <p class="section-box">
      Pinia的state: count = <b>{{ count }}</b>
    </p>
    <p class="section-box">
      Pinia的getters: doubleCount() = <b>{{ doubleCount }}</b>
    </p>
    <div class="section-box">
      <p>Pinia的action: increment()</p>
      <button @click="increment">点我</button>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .box-styl {
    margin: 10px;
    .section-box {
      margin: 20px auto;
      width: 300px;
      background-color: #d7ffed;
      border: 1px solid #000;
    }
  }
</style>
复制代码
```

-   Pinia的调用机制是**先install再调用**。
-   install这样写： `const counterStoreForSetup = useCounterStoreForSetup();`，其中 `useCounterStoreForSetup`就是你定义store的变量；
-   调用就直接用 `counterStoreForSetup.xxx`（xxx包括：state、getters、action）就好。
-   代码中获取state是用了解构赋值，为了保持state的响应式特性，需要用`storeToRefs`进行包裹。

> 兼容Vue2的Options API调用方式可以到 [这里](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJohnnyZhangQiao%2Fpinia-use%2Fblob%2Fmaster%2Fsrc%2Fcomponents%2FPiniaBasicOptions.vue "https://github.com/JohnnyZhangQiao/pinia-use/blob/master/src/components/PiniaBasicOptions.vue")。

## 5. 两种写法的差异

虽然`options API` 和 `composition API`写法都能呈现同样的状态库，但是他们有没有差异？实际上还是有的，举个例子：`composition API`模式下不支持某些内置方法（例如`$reset()`）。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ccee89bca74412e8024f528b5a5d259~tplv-k3u1fbpfcp-zoom-1.image)

解决方法就是重写reset函数，上面代码可改成这样：

```
// 使用composition API模式定义store
export const useCounterStoreForSetup = defineStore('counterForSetup', () => {
  // 初始状态
  const initState = {
    count: 1
  };

  const count = ref<number>(initState.count);
  const doubleCount = computed(() => count.value * 2);
  function increment() {
    count.value++;
  }

  // 重写reset
  function reset() {
    count.value = initState.count;
  }

  return { count, doubleCount, increment, reset };
});
复制代码
```

## 6. state的改变交给action去处理

来看下实例化后的store对象，你会发现有个属性叫`$state`，它能直接改变state的值，例如`useCounterStoreForSetup.$state.count = 2;`就能把count的状态变成2，但不建议这么做，有2点考虑：

1.  **不利于统一管理。**  当`count`名称有更改，所有`.$state.count`的地方都要更新代码，任何一处遗漏都会直接导致页面报错。所以我们应该声明个唯一的action去管理`count`的变更，当有变动时只需要更改`action`就ok了。

    ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/706563174dd34f77ab70590f7788baed~tplv-k3u1fbpfcp-zoom-1.image)

1.  **不利于状态调试。**  众所周知，devtools的Timeline是可以对`actions`进行跟踪的，所有的`state`变更统一的交由action处理，开发者能清晰、容易排查state的变化流，避免出非正常流的状态变更遗漏。

# 企业项目封装攻略

## 1. 全局注册机

### 重复打包问题

在上面的例子我们可以知道，使用store时要先把store的定义import进来，再执行定义函数使得实例化。但是，在项目逐渐庞大起来后，每个组件要使用时候都要实例化吗？在文中开头讲过，pinia的代码分割机制是把引用它的页面合并打包，那像下面的例子就会有问题，user被多个页面引用，最后user store被重复打包。 ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82beb4395b6a41f4b2c707623dd0ddd9~tplv-k3u1fbpfcp-zoom-1.image) 为了解决这个问题，我们可以引入  **”全局注册“**  的概念。做法如下：

### 创建总入口

在`src/store`目录下创建一个入口`index.ts`，其中包含一个注册函数`registerStore()`，其作用是把整个项目的store都提前注册好，最后把所有的store实例挂到`appStore`透传出去。这样以后，只要我们在项目任何组件要使用pinia时，只要import appStore进来，取对应的store实例就行。

```
// src/store/index.ts
import { roleStore } from './roleStore';
import { useCounterStoreForSetup } from '@/store/counterForSetup';
import { useCounterStoreForOption } from '@/store/counterForOptions';

export interface IAppStore {
  roleStore: ReturnType<typeof roleStore>;
  useCounterStoreForSetup: ReturnType<typeof useCounterStoreForSetup>;
  useCounterStoreForOption: ReturnType<typeof useCounterStoreForOption>;
}

const appStore: IAppStore = {} as IAppStore;

/**
 * 注册app状态库
 */
export const registerStore = () => {
  appStore.roleStore = roleStore();
  appStore.useCounterStoreForSetup = useCounterStoreForSetup();
  appStore.useCounterStoreForOption = useCounterStoreForOption();
};

export default appStore;
复制代码
```

### 总线注册

在`src/main.ts`项目总线执行注册操作：

```
import { createApp } from 'vue';
import App from './App.vue';
import { createPinia } from 'pinia';
import { registerStore } from '@/store';

const app = createApp(App);

app.use(createPinia());
// 注册pinia状态管理库
registerStore();

app.mount('#app');
复制代码
```

业务组件内直接使用

```
// src/components/PiniaBasicSetup.vue
<script setup lang="ts" name="component-PiniaBasicSetup">
import { storeToRefs } from 'pinia';
import appStore from '@/store';

// setup composition API模式
const { count } = storeToRefs(appStore.useCounterStoreForSetup);
const { increment, doubleCount } = appStore.useCounterStoreForSetup;
</script>

<template>
  <div class="box-styl">
    <h1>Setup模式</h1>
    <p class="section-box">
      Pinia的state: count = <b>{{ count }}</b>
    </p>
    <p class="section-box">
      Pinia的getters: doubleCount() = <b>{{ doubleCount() }}</b>
    </p>
    <div class="section-box">
      <p>Pinia的action: increment()</p>
      <button @click="increment">点我</button>
    </div>
  </div>
</template>
复制代码
```

### 打包解耦

到这里还不行，为了让`appStore`实例与项目解耦，在构建时要把`appStore`抽取到公共chunk，在`vite.config.ts`做如下配置

```
export default defineConfig(({ command }: ConfigEnv) => {
  return {
    // ...其他配置
    
    build: {
      // ...其他配置
      
      rollupOptions: {
        output: {
          manualChunks(id) {
            // 将pinia的全局库实例打包进vendor，避免和页面一起打包造成资源重复引入
            if (id.includes(path.resolve(__dirname, '/src/store/index.ts'))) {
              return 'vendor';
            }
          }
        }
      }
    }
  };
});
复制代码
```

经过这样封装后，pinia状态库得到解耦，最终的项目结构图是这样的： ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8132df5bedba49909eeffd30e5a501b0~tplv-k3u1fbpfcp-zoom-1.image)

### 答疑

到这里或许你会有某些疑惑：**把所有store提前实例化和vuex有什么区别，还有就是这么做的必要性？**

先说下与vuex的区别：差不多但又不完全一样。。。差别在于vuex是全部store都注册了个遍，开发者根本没法选择哪些store可以懒加载。**但全局注册机只会把高频常用的、项目启动完成前必须要放到初始化阶段注册的全局store提前给准备好**，一来保证项目加载流程合理性，二来可以避免在业务组件反复注册。其必要性就相当于：你可以不需要，但作为项目管理层面我不能没有「逐渐卷起来了」。

## 2. Store组管理

### 场景分析

大家在项目中是否经常遇到某个方法要更新多个store的情况呢？例如：你要做个游戏，有3种职业「战士、法师、道士」，另外，玩家角色有3个store来控制「人物属性、装备、技能」，页面有个”转职“按钮，可以转其他职业。当玩家改变职业时，3个store的state都要改变，怎么做呢？

-   方法1：在业务组件创建个函数，单点击”转职“时，获取3个store并且更新它们的值。
-   方法2：**抽象一个新pinia store**，store里有个”转职“的action，当玩家转职时，响应这个action，在action更新3个store的值。

对比起来，无论从封装还是业务解耦，明显方法2更好。要做到这样，这也得益于pinia的store独立管理特性，我们只需要把抽象的store作为父store，「人物属性、装备、技能」3个store作为单元store，让父store的action去管理自己的单元store。

### 组级Store创建

继续上才艺，父store：`src/store/roleStore/index.ts`

```
import { defineStore } from 'pinia';
import { roleBasic } from './basic';
import { roleEquipment } from './equipment';
import { roleSkill } from './skill';
import { ROLE_INIT_INFO } from './constants';

type TProfession = 'warrior' | 'mage' | 'warlock';

// 角色组，汇聚「人物属性、装备、技能」3个store统一管理
export const roleStore = defineStore('roleStore', () => {
  // 注册组内store
  const basic = roleBasic();
  const equipment = roleEquipment();
  const skill = roleSkill();

  // 转职业
  function changeProfession(profession: TProfession) {
    basic.setItem(ROLE_INIT_INFO[profession].basic);
    equipment.setItem(ROLE_INIT_INFO[profession].equipment);
    skill.setItem(ROLE_INIT_INFO[profession].skill);
  }

  return { basic, equipment, skill, changeProfession };
});
复制代码
```

### 单元Store

3个单元store：

-   [人物属性](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJohnnyZhangQiao%2Fpinia-use%2Fblob%2Fmaster%2Fsrc%2Fstore%2FroleStore%2Fbasic.ts "https://github.com/JohnnyZhangQiao/pinia-use/blob/master/src/store/roleStore/basic.ts")
-   [装备](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJohnnyZhangQiao%2Fpinia-use%2Fblob%2Fmaster%2Fsrc%2Fstore%2FroleStore%2Fequipment.ts "https://github.com/JohnnyZhangQiao/pinia-use/blob/master/src/store/roleStore/equipment.ts")
-   [技能](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2FJohnnyZhangQiao%2Fpinia-use%2Fblob%2Fmaster%2Fsrc%2Fstore%2FroleStore%2Fskill.ts "https://github.com/JohnnyZhangQiao/pinia-use/blob/master/src/store/roleStore/skill.ts")

### 业务组件调用

```
<script setup lang="ts" name="component-StoreGroup">
import appStore from '@/store';
</script>

<template>
  <div class="box-styl">
    <h1>Store组管理</h1>
    <div class="section-box">
      <p>
        当前职业： <b>{{ appStore.roleStore.basic.basic.profession }}</b>
      </p>
      <p>
        名字： <b>{{ appStore.roleStore.basic.basic.name }}</b>
      </p>
      <p>
        性别： <b>{{ appStore.roleStore.basic.basic.sex }}</b>
      </p>
      <p>
        装备： <b>{{ appStore.roleStore.equipment.equipment }}</b>
      </p>
      <p>
        技能： <b>{{ appStore.roleStore.skill.skill }}</b>
      </p>
      <span>转职：</span>
      <button @click="appStore.roleStore.changeProfession('warrior')">
        战士
      </button>
      <button @click="appStore.roleStore.changeProfession('mage')">法师</button>
      <button @click="appStore.roleStore.changeProfession('warlock')">
        道士
      </button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.box-styl {
  margin: 10px;
  .section-box {
    margin: 20px auto;
    width: 300px;
    background-color: #d7ffed;
    border: 1px solid #000;
  }
}
</style>
复制代码
```

### 效果

![2022-01-26 16.55.25.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b206a75438ac4f6caa0c634ba34fad7c~tplv-k3u1fbpfcp-zoom-1.image)

