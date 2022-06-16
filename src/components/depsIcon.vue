<script setup lang="ts">
// import NewsLetter from './NewsLetter.vue'
// import SponsorsGroup from './SponsorsGroup.vue';
const depsList = [
  {
    name: 'Vite',
    desc: '下一代的前端工具链',
    src: 'https://cn.vitejs.dev/logo.svg',
    href: 'https://cn.vitejs.dev/',
  },
  {
    name: 'Element-plus',
    desc: '基于 Vue 3，面向设计师和开发者的组件库',
    src: 'https://element-plus.org/images/element-plus-logo.svg',
    href: 'https://element-plus.org/zh-CN/',
  },
  {
    name: 'Unocss',
    desc: '原子化css - 项目依赖css',
    src: 'https://raw.githubusercontent.com/unocss/unocss/main/playground/public/icon-gray.svg',
    href: 'https://uno.antfu.me/',
  },
  {
    name: 'VueUse',
    desc: '基本 Vue 组合实用程序的集合 - Vue Hook 库',
    src: 'https://play.vueuse.org/vueuse.svg',
    href: 'https://vueuse.org/functions.html',
  },
]
function changeUrl(item) {
  window.open(item.href, '_blank')
}
</script>

<template>
  <section>
    <div class="item" @click="changeUrl(item)" v-for="item in depsList" :key="item">
      <img :src="item.src" alt="" />
      <div class="item-desc">
        <div>{{ item.name }}</div>
        <div>{{ item.desc }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  padding: 42px 32px;
}
.item {
  cursor: pointer;
  padding: 20px 30px;
  margin: 30px 0;
  border: 1px solid #eee;
  border-radius: 6px;
  /* width: 100px; */
  display: flex;
  align-items: center;
  transition: all 0.2s linear;
}
.item:hover {
  box-shadow: 0 1px 1px hsl(0deg 0% 0% / 0.075), 0 2px 2px hsl(0deg 0% 0% / 0.075), 0 4px 4px hsl(0deg 0% 0% / 0.075), 0 8px 8px hsl(0deg 0% 0% / 0.075), 0 16px 16px hsl(0deg 0% 0% / 0.075);
}
.item-desc {
  font-weight: 600;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.item img {
  margin-right: 20px;
  width: 100px;
  height: 80px;
}
@media (max-width: 370px) {
  .tagline {
    font-size: 36px;
  }
}
</style>
