![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de113c8a88df4ab29b9039b8a6420b37~tplv-k3u1fbpfcp-watermark.image?)

## TypeScript 基础类型 (转义默认 ES5)

```ts
// Boolean
let isFalg: boolean = false
// 转义之后
var flag = false

// Number
let counter: number = 1000
// 转义之后
var counter = 1000

// String
let name: string = 'erkelost'
// 转义
var name = 'erkelost'

// Array
let list: number[] = [1, 2, 3]
// ES5：var list = [1,2,3];

let list: Array<number> = [1, 2, 3] // Array<number>泛型语法 Jsx不支持 会有冲突
// ES5：var list = [1,2,3];
```

### 枚举类型

:::warning
使用枚举我们可以定义一些带有命名的变量 我们可以清晰的表达我们对一组不同数组需要做的不同事情 Typescript 支持对基于字符串 和 数组 做枚举

:::

```ts
// 数字枚举
enum Direction {
  NORTH = 3,
  SOUTH,
  EAST,
  WEST,
}
// 转义
var Direction
;(function (Direction) {
  Direction[(Direction['NORTH'] = 3)] = 'NORTH'
  Direction[(Direction['SOUTH'] = 4)] = 'SOUTH'
  Direction[(Direction['EAST'] = 5)] = 'EAST'
  Direction[(Direction['WEST'] = 6)] = 'WEST'
})(Direction || (Direction = {}))

let dir: Direction = Direction.NORTH
export enum EnumThemeLayoutMode {
  'vertical' = '左侧菜单模式',
  'horizontal' = '顶部菜单模式',
  'vertical-mix' = '左侧菜单混合模式',
  'horizontal-mix' = '顶部菜单混合模式',
}

export enum EnumThemeTabMode {
  'chrome' = '谷歌风格',
  'button' = '按钮风格',
}
```

#### · 默认情况下，NORTH 的初始值为 0，其余的成员会从 1 开始自动增长。换句话说，Direction.SOUTH 的值为 1，Direction.EAST 的值为 2，Direction.WEST 的值为 3

### Any 类型

#### 在 TypeScript 中，任何类型都可以被归为 any 类型。这让 any 类型成为了类型系统的顶级类型（也被称作全局超级类型）。

```ts
let name: any = 666
name = 'erkelost'
name = false
```

### Unknown 类型

#### 就像所有类型都可以赋值给 any，所有类型也都可以赋值给 unknown。这使得 unknown 成为 TypeScript 类型系统的另一种顶级类型（另一种是 any） unknown 类型只能被赋值给 any 类型和 unknown 类型本身。 只有能够保存任意类型值的容器才能保存 unknown 类型的值

```ts
let name: unknown = 666
name = 'erkelost'
name = false
//error
let value3: boolean = name // Error Type 'unknown' is not assignable to type 'boolean'.
let value4: number = name // Error Type 'unknown' is not assignable to type 'number'.
```

### 元组 Tuple

#### 数组一般由同种类型的值组成，但有时我们需要在单个变量中存储不同类型的值，这时候我们就可以使用元组。在 JavaScript 中是没有元组的，元组是 TypeScript 中特有的类型

```ts
let tupleType: [string, boolean]
tupleType = ['erkelost', true]
```

### Void 类型

#### Void 类型与 Any 类型相反 它表示没有任何类型 当一个函数没有返回值时 我们通常会使用 Void

```ts
// 声明函数返回值为void
function warnUser(): void {
  console.log('This is my warning message')
}
```

:::warning
声明一个 void 类型的变量没有什么作用，因为它的值只能为 undefined 或 null
:::

```ts
let unusable: void = undefined
```

### Null 和 Undefined

#### 在 ts 中 undefined 和 null 两者有各自的类型 也是 undefined 和 null

```ts
let u: undefined = undefined
let n: null = null
```

### Never

#### never 类型表示的是那些永不存在的值的类型。 例如，never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。在 TypeScript 中，可以利用 never 类型的特性来实现全面性检查，具体示例如下：

```ts
type Foo = string | number

function controlFlowAnalysisWithNever(foo: Foo) {
  if (typeof foo === 'string') {
    // 这里 foo 被收窄为 string 类型
  } else if (typeof foo === 'number') {
    // 这里 foo 被收窄为 number 类型
  } else {
    // foo 在这里是 never
    const check: never = foo
  }
}
```

### 断言

#### 你会比 TypeScript 更了解某个值的详细信息。通常这会发生在你清楚地知道一个实体具有比它现有类型更确切的类型。通过类型断言这种方式可以告诉编译器，“相信我，我知道自己在干什么”。类型断言好比其他语言里的类型转换，但是不进行特殊的数据检查和解构

:::warning
所谓断言就是断定、确定、绝对的意思；所以简单来讲，类型断言就是保证数据类型一定是所要求的类型
类型断言就是 我们可以 把 范围类型的变量 指定为一个更加具体的类型
:::

```ts
let someValue: any = 'this is a string'
let strLength: number = (someValue as string).length
```

### 非空断言 ！
#### 当我们上下文的类型检查器 无法断定类型时 我们可以使用！后缀用于断言操作对象是非null 或者 undefined 类型 意思就是我们可以从可能是未定义中排除 null 和 undefined

```ts
interface Entity {
  name: string
}
function processEntity(e?: Entity) {
  let s = e.name // ERROR  这时候 ts 检查会 检查出我们类型可能是未定义
  let s = e！.name // ERROR
}

```


### 类型守卫
#### 类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内。换句话说，类型保护可以保证一个字符串是一个字符串，尽管它的值也可以是一个数值。类型保护与特性检测并不是完全不同，其主要思想是尝试检测属性、方法或原型，以确定如何处理值。目前主要有四种的方式来实现类型保护：

#### In 关键字

```ts
```
