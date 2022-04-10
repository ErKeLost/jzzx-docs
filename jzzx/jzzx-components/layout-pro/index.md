<p align='center'>
  <img src='https://naive-ui-admin.vercel.app/assets/nav-theme-dark.be6f2a3d.svg' alt='Vitesse - Opinionated Vite Starter Template' width='300'/>
</p>
<p align='center'>
快速地使用<sup><em>@Erkelost/layout</em></sup>构建基础应用 
<br> 
</p>

<br>

<p align='center'>
<a href="https://vitesse.netlify.app/">在线 Demo</a>
</p>

## 特性

- 🗂 兼容 Vue3 和 Vue2 的 layout 组件

- 🎨 尽可能支持所有 layout 布局

- 🦾 TypeScript, 当然

- ☁️ 零配置部署 Netlify

<br>

## 现在可以试试!

> 安装 推荐使用 pnpm

```bash
npm install pnpm -g
pnpm add @erkelost/layout
```

## Api

| prop                     | 说明                                          | type    | default value |
| ------------------------ | --------------------------------------------- | ------- | ------------- |
| mode                     | 布局模式                                      | string  | vertical      |
| minWidth                 | 最小宽度                                      | number  | null          |
| headerVisible            | 是否显示 header                               | boolean | true          |
| headerHeight             | header 高度                                   | number  | null          |
| tabVisible               | 是否显示标签栏                                | boolean |               |
| tabHeight                | tab 高度                                      | number  |               |
| fixedFooter              | 固定底部                                      | boolean |               |
| fixedHeaderAndTab        | 固定头部和标签                                | boolean |               |
| footerVisible            | 是否显示 footer                               | boolean |               |
| fixedSider               | 侧边栏固定布局                                | false   |               |
| holdHeaderFixedSider     | 是否不占据 header 的高度进行 fixed 侧边栏布局 | false   |               |
| footerHeight             | footer 的高度                                 | number  |               |
| fixedHeaderAndTab        | 固定头部和标签                                | boolean |               |
| siderVisible             | 是否显示 sider                                | boolean |               |
| siderWidth               | 侧边栏宽度                                    | false   |               |
| siderCollapsedWidth      | 侧边栏折叠后的宽度                            | false   |               |
| siderCollapse            | 侧边栏折叠的状态                              | boolean |               |
| transitionDuration       | 动画过渡时间                                  | number  |               |
| transitionTimingFunction | 动画过渡速度曲线                              | string  |               |

### 克隆到本地

如果您更喜欢使用更干净的 git 历史记录手动执行此操作

```bash
npx degit antfu/vitesse my-vitesse-app
cd my-vitesse-app
pnpm i # 如果你没装过 pnpm, 可以先运行: npm install -g pnpm
```