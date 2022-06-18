---
title: PageTable的使用
---

# PageTable 的使用

:::demo

```vue
<template>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
    <el-button>中文</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button plain>Plain</el-button>
    <el-button type="primary" plain>Primary</el-button>
    <el-button type="success" plain>Success</el-button>
    <el-button type="info" plain>Info</el-button>
    <el-button type="warning" plain>Warning</el-button>
    <el-button type="danger" plain>Danger</el-button>
  </el-row>

  <el-row class="mb-4">
    <el-button round>Round</el-button>
    <el-button type="primary" round>Primary</el-button>
    <el-button type="success" round>Success</el-button>
    <el-button type="info" round>Info</el-button>
    <el-button type="warning" round>Warning</el-button>
    <el-button type="danger" round>Danger</el-button>
  </el-row>
</template>

<script lang="ts" setup></script>
```

:::

## Button Attributes

| Attribute         | Description                                                     | Type               | Accepted Values                                               | Default |
| ----------------- | --------------------------------------------------------------- | ------------------ | ------------------------------------------------------------- | ------- |
| size              | button size                                                     | string             | large / default /small                                        | —       |
| type              | button type                                                     | string             | primary / success / warning / danger / info / <del>text</del> | —       |
| plain             | determine whether it's a plain button                           | boolean            | —                                                             | false   |
| text              | determine whether it's a text button                            | boolean            | —                                                             | false   |
| bg                | determine whether the text button background color is always on | boolean            | —                                                             | false   |
| link              | determine whether it's a link button                            | boolean            | —                                                             | false   |
| round             | determine whether it's a round button                           | boolean            | —                                                             | false   |
| circle            | determine whether it's a circle button                          | boolean            | —                                                             | false   |
| loading           | determine whether it's loading                                  | boolean            | —                                                             | false   |
| loading-icon      | customize loading icon component                                | string / Component | —                                                             | Loading |
| disabled          | disable the button                                              | boolean            | —                                                             | false   |
| icon              | icon component                                                  | string / Component | —                                                             | —       |
| autofocus         | same as native button's `autofocus`                             | boolean            | —                                                             | false   |
| native-type       | same as native button's `type`                                  | string             | button / submit / reset                                       | button  |
| auto-insert-space | automatically insert a space between two chinese characters     | boolean            |                                                               | —       |

## Button Slots

| Name    | Description                 |
| ------- | --------------------------- |
| —       | customize default content   |
| loading | customize loading component |
| icon    | customize icon component    |

## Button-Group Attributes

| Attribute | Description                                      | Type   | Accepted Values       | Default |
| --------- | ------------------------------------------------ | ------ | --------------------- | ------- |
| size      | control the size of buttons in this button-group | string | same as button's size | —       |
| type      | control the type of buttons in this button-group | string | same as button's type | —       |

## Button-Group Slots

| Name | Description                    | Subtags |
| ---- | ------------------------------ | ------- |
| -    | customize button group content | Button  |
