import { h } from "vue";
import ElementPlus from "element-plus";
import { VPTheme } from "@vue/theme";
import Banner from "../../../src/components/Banner.vue";
import Demo from "vitepress-theme-demoblock/components/Demo.vue";
import DemoBlock from "vitepress-theme-demoblock/components/DemoBlock.vue";
import "vitepress-theme-demoblock/theme/styles/index.css";
// uncomment to test CSS variables override
import "./override.css";
import "element-plus/dist/index.css";
import registerComponents from "./register-components";
export default {
  ...VPTheme,
  Layout() {
    return h(VPTheme.Layout, null, {
      // uncomment to test layout slots
      banner: () => h(Banner),
      // 'sidebar-top': () => h('div', 'hello top'),
      // 'sidebar-bottom': () => h('div', 'hello bottom'),
      // 'content-top': () => h('h1', 'Announcement!'),
      // 'content-bottom': () => h('div', 'Some ads'),
      // 'aside-top': () => h('div', 'this could be huge'),
      // 'aside-mid': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
      // 'aside-bottom': () => h('div', { style: { height: '300px' }}, 'Sponsors'),
    });
  },
  enhanceApp({ app }) {
    app.use(ElementPlus);
    app.component("Demo", Demo);
    app.component("DemoBlock", DemoBlock);
    registerComponents(app);
  },
};
