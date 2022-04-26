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
