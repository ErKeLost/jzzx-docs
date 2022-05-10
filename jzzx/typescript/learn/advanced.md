![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de113c8a88df4ab29b9039b8a6420b37~tplv-k3u1fbpfcp-watermark.image?)

# TypeScript 高级语法 (转义默认 ES5)

## 泛型

### 泛型表示泛指某一种类型 开发者可以指定一个表示类型的变量 用来作为实际类型的占位符 用尖括号来包裹这个类型变量 泛型的作用主要是创建可以重用的组件 从而让一个组件可以支持多种数据类型 它也可以作用在接口 类 函数 或者函数别名上

### 首先我们定义一个函数 让一个函数接受一个参数并直接返回这个参数

```ts
function identity(value) {
  return value
}
console.log(identity(111)) // 111
```

### 然后我们在继续支持 typescript 类型的参数

```ts
function identity(value: number): number {
  return value
}
console.log(identity(666))
```

### 这里我们将 number 类型分配给参数和返回类型 使得该函数可用于原始类型 但是该函数不是通用的 我们希望定义不同的类型 但是还不能使用 any 因为 any 会使得编译器失去类型保护的作用 我们目的是让 函数适合任意的类型 我们可以使用泛型

```ts
function identity<T>(value: T): T {
  return value
}
console.log(identity<number>(1)) // 1
```

### 当我们调用函数的时候 number 类型 就像 参数 一样 会出现在 T 的任何位置进行填充 T 被称为类型变量 其中 T 代表 Type，在定义泛型时通常用作第一个类型变量名称。但实际上 T 可以用任何有效名称代替。除了 T 之外，以下是常见泛型变量代表的意思：

### 而且 我们并不是只能定义一个类型变量 我们 可以引用定义希望的任何数量的类型变量 比如我们引用了一个类型变量 u 用于扩展我们定义的函数

```ts
function identity <T U>(value: T, message: U): T {
  console.log(message)
  return value
}
console.log(identity<Number, string>(68, "erkelost"));
```

### 我们返回多种类型 可以使用元组

```ts
function identity<T, U>(value: T, message: U): [T, U] {
  return [value, message]
}
```

### 泛型接口

### 解决函数中返回多种类型对象的问题 我们可以创建一个用于 identity 函数通用接口

```ts
interface Identities<V M> {
  value: V
  message:
}
```

```ts
function identity<T, U>(value: T, message: U): Identities<T, U> {
  console.log(value + ': ' + typeof value)
  console.log(message + ': ' + typeof message)
  let identities: Identities<T, U> = {
    value,
    message,
  }
  return identities
}

console.log(identity(68, 'Semlinker'))
```

### 泛型约束

### 我们可以限制类型变量对应类型上的某些属性

### 确保属性是否存在

```ts
function identity<T>(arg: T): T {
  // Property 'length' does not exist on type 'T'.(2339)
  console.log(arg.length) // Error
  return arg
}
```

### 编译器没法确认 T 类型一定含有 length 属性，尤其是在可以将任何类型赋给类型变量 T 的情况下。我们需要做的就是让类型变量 extends 一个含有我们所需属性的接口 这时候会报错

```ts
interface Length {
  length: number
}

function identity<T extends Length>(arg: T): T {
  console.log(arg.length) // 可以获取length属性
  return arg
}
```

### 这时候 我们如果在调用这个函数 但是传递别的类型的值 就会报错 我们使用 ，逗号来分割多中的约束类型 T extends Length, Type2, Type3>

```ts
// 使用其他数组也可以调用length
function identity<T>(arg: T[]): T[] {
  console.log(arg.length)
  return arg
}
```

## Extend

#### 接口和类型别名都能够被扩展，但语法有所不同。此外，接口和类型别名不是互斥的。接口可以扩展类型别名，而反过来是不行的。

#### 继承，一个新的接口或者类，从父类或者接口继承所有的属性和方法，不可以重写属性，但可以重写方法

```ts
// 接口继承接口
interface Person {
  name: string
  age?: number
}
interface obj extends Person {
  sex: number
}

// 类型别名 继承

type PartialPointX = { x: number }
type Point = PartialPointX & { y: number }
```

## Implements

### implements 实现，一个新的类，从父类或者接口实现所有的属性和方法，同时可以重写属性和方法，包含一些新的功能

```ts
interface Point {
  x: number
  y: number
}

class SomePoint implements Point {
  x = 1
  y = 2
}

type Point2 = {
  x: number
  y: number
}

class SomePoint2 implements Point2 {
  x = 1
  y = 2
}
```
