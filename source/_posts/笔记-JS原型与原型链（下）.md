---
title: 笔记-JS原型与原型链（下）
toc: true
date: 2018-05-12 16:54:00
tags:
        - JS
        - 笔记
        - 基础
---
> 下
<!--more-->

# 一、复习

>1.每个函数对象都默认有一个`prototype`属性；
2.`prototype`里面有一个默认的`constructor`属性，`constructor`属性指向`prototype`所在的构造函数；
3.任何对象（包括函数对象）都默认有一个`__proto__`属性，该属性指向创建他的构造函数的`prototype`属性；

# 二、原型模式
复习一下上一篇第六节对`person1.constructor`的调用：当代码读取某个对象的某个属性时，会先在实例中搜索该属性，如果在实例中找到了定名字的属性，则返回该属性值；如果没有，则继续搜索原型对象中是否含有该属性。例如：
```javascript
function Person(option) {
    this.name = option.name;
}
Person.prototype.sayName = function() {
    console.log(`my name is ${this.name}`);
}
Person.prototype.sayAge = function() {
    console.log(18);
}
var person1 = new Person({name:'Momoko'});
person1.sayAge = function () {
    console.log(22)
}
person1.sayName(); // my name is Momoko
person1.sayAge();  // 22
```
如上：
1.调用`person1.sayName()`的时候，会先执行两次搜索，首先，解析器会问：“person1 你有sayName么？”答：“没有。”然后他继续搜索，再问：“person1.\_\_proto\__有么？”也就是`Person.prototype`，答：“有”。于是他就读取原型对象中存储的sayName();
2.调用`person1.sayAge()`的时候，在person1中搜索到了就会直接执行person1中的sayAge()。即使`Person.prototype`中也包含`sayAge()`，但是JS就是这样，找到即止。

# 三、原型链
## （一）链路
我们结合例子以及上面的复习知识点整理出整个链路出来：
I.person1：
```javascript
console.log(person1.__proto__ == Person.prototype);             //true
console.log(Person.prototype.__proto__ == Object.prototype);    //true
console.log(Function.prototype.__proto__ == Object.prototype);  //true
console.log(Object.prototype.__proto__ == null);                //true
```
II.Person
```javascript
console.log(Person.__proto__ == Function.prototype);            //true
console.log(Function.prototype.__proto__ == Function.prototype);//false
console.log(Function.prototype.__proto__ == Object.prototype);  //true
console.log(Object.prototype.__proto__ == null);                //true
```
III.Function
```javascript
console.log(Function.__proto__ == Function.prototype);          //true
console.log(Function.prototype.__proto__ == Object.prototype);  //true
console.log(Object.prototype.__proto__ == null);                //true
```
IV.Object
```javascript
console.log(Object.__proto__ == Function.prototype);            //true
console.log(Function.prototype.__proto__ == Object.prototype);  //true
console.log(Object.prototype.__proto__ == null);                //true
```
**疑点解惑：**
1.`Person.prototype.__proto__ == Object.prototype //true`
   > `Person.prototype`是一个普通对象，他的构造函数是Object，∴ture 没问题

2.`Function.prototype.__proto__ == Function.prototype //false`
  `Function.prototype.__proto__ == Object.prototype //true`
   > `Function.prototype`是一个函数对象，理论上他的`__proto__`应该指向`Function.prototype`，也就是他自己，自己由自己创建，不符合逻辑啊。打个不合时宜的比方：你是怎么来的，你妈生的，你妈怎么来的，你姥姥生的..类人猿进化来的，类人猿从哪儿来的，一直追溯下去...，就是无（NULL）。
   再者JS一直强调万物皆对象，函数对象也是对象，所以就给他认个祖宗`Object`，即有`Function.prototype.__proto__`指向`Object.prototype`,`Object.prototype.__proto__ === null`保证原型链能够正常结束。
     
3.`Object.__proto__ == Function.prototype //true`
   > `Object`由`Function`创建，所以`Object.__proto__ == Function.prototype`正确
   
4.再有的话你就直接评论问我吧。。。

## （二）再看一个例子
其实，由上面的例子我们可以得出：**原型链是依赖于`__proto__`而不是`prototype`**，为什么这么说呢，我们继续看下面这个例子：
```javascript
var animal = function(){};
var dog = function(){};

animal.price = 2000;
dog.prototype = animal;
var tidy = new dog();   /* ==> tidy.__proto__ == dog.prototype == animal */

console.log(dog.price) //为什么输出 undefined 
console.log(tidy.price) //为什么输出 2000
```
**解析**：
>我们执行`dog.price`的时候，发现没有price这个属性，继续在`dog.__proto__`中寻找，当然结果还是没有，所以输出`undefined`，虽然`dog.prototype`指向的`animal`有这个属性，但它并没有去沿着这个“链”去寻找。
同样，执行tidy.price的时候，也没有这个属性，但是tidy是dog的实例，所以`tidy.__proto__ == dog.prototype`，而`dog.prototype`又指向了animal，animal中有price属性，所以tidy.price输出2000。由此得出，原型链的真正形成是靠的`__proro__`，而不是`prototype`。因此，如果在这样指定`dog.__proto__ = animal`。那dog.price = 2000。
**结论**：原型链是依赖于`__proto__`，而不是`prototype`

# 总结
终于到总结了！！有木有！！！
- **原型和原型链是JS实现继承的一种模型。**
- **原型链的形成是真正是靠`__proto__` 而非`prototype`**

反思：
一、大红书真的真的真的真的是一本超级超级超级棒的一本书，买来居然搁置了半年都没看，暴殄天物。
二、前端青铜，任重而道远啊
