---
title: 笔记-JS原型与原型链（上）
toc: true
date: 2018-05-07 22:14:05
tags:
        - JS
        - 笔记
        - 基础
---
> 一直以来对JS对象的基础知识一直含混不清的，做些笔记，希望能加强理解、加强记忆。

<!--more-->

> 写在前面：规定通过`//`添加的注释为控制台输出，通过`/* */`的注释为备注

# 前言
要理解原型链，我们需要从以下几个概念入手：
![原型链](/assets/blogImg/180511-3.png)

# 一、普通对象&函数对象
在JS中，对象分为两种：**普通对象**和**函数对象**，Object和Function是JS自带的函数对象。
举些例子：
```javascript
var o1 = {};
var o2 = new Object();
var o3 = new f1();

function f1(){};
var f2 = function(){};
var f3 = new Function();

console.log(typeof o1); //object
console.log(typeof o2); //object
console.log(typeof o3); //object

console.log(typeof f1); //function
console.log(typeof f2); //function
console.log(typeof f3); //function

console.log(typeof Object);   //function
console.log(typeof Function); //function
```
上面栗子中，o1 o2 o3为普通对象，f1 f2 f3为函数对象。怎么区分，其实也很简单，**凡是通过new Function()创建的对象都是函数对象，其余都是普通对象。f1 f2归根结底都是通过new Function()创建的，Function Object也都是通过new Function创建的。**

> Tip：说个题外话，JS中的‘万物皆对象’指的是编程思想，而不是拘泥于眼前的数据类型！
  自问自答区 -
  问：'momoko'算是一个字符串对象么？
  答：不是，它只是JS基本类型中的字符串类型。
  问：但是它自带有属性和方法啊，这怎么解释？
  答：字符串字面量在调用字符串的属性或方法时，JS引擎会自动创建一个String()的对象实例，执行完毕后又会自动销毁这个实例，但是字符串字面量本身还是字符串类型。
  
# 二、new
要创建一个构造函数的新实例，必须使用`new`操作符，以这种方式调用构造函数会经历一下4个步骤：
（1）创建一个新的对象；
（2）将构造函数的作用域赋给新的对象（因此this就指向了实例对象）
（3）执行构造函数中的代码，并未这个新对象添加属性；
（4）返回新对象。

# 三、函数的私有变量 VS 静态变量 VS 实例变量
为什么在函数内会有不同种定义变量的方式，它们的实质区别又是什么呢？总结如下：
## 1.私有变量&私有函数
如果你了解JS的函数作用域，就一定会知道在函数内定义的变量和函数如果不对外提供接口，那么在外部将无法访问到，也就是私有变量和私有函数。
```javascript
function Person() {
  var a = 0;               /*私有变量*/
  var fun = function() {   /*私有函数*/
    console.log('调用私有函数fun')
  }
  fun();                   /*在函数内部调用私有函数*/
}
var people1 = new Person(); //调用私有函数fun
console.log(people1.a);     //undefined
console.log(typeof Person.fun);   //undefined
//console.log(typeof person1.fun);//Uncaught ReferenceError: person1 is not defined
```
这样在函数对象Person外部无法访问变量a和函数fun，它们是私有的，只能在Person内部使用，即使是函数Person的实例仍然无法访问这些变量和函数。

## 2.静态变量&静态函数
通过`.`为函数添加的属性和函数，通过其函数对象本身仍然可以访问得到，但是其实例却访问不到，这样的变量和函数分别被称为静态变量和静态函数。
```javascript
function Person() {};
Person.a = 0;               /*静态变量*/
Person.fun = function() {   /*静态函数*/
  console.log('调用静态函数fun')
};

console.log(Person.a);           //0
console.log(typeof Person.fun);  //function
Person.fun();                    //调用静态函数fun

var people1 = new Person();
console.log(people1.a);           //undefined
console.log(typeof people1.fun);  //undefined
```

## 3.实例变量&实例函数
在面向对象编程中除了一些库函数我们还是希望在对象定义的时候同时定义一些属性和方法，实例化后可以访问，JavaScript也能做到这样：
```javascript
function Person() {
  this.a = 0;                /*实例变量*/
  this.fun = function() {    /*实例函数*/
    console.log('调用实例函数fun')
  }
}

console.log(Person.a);          //undefined
console.log(typeof Person.fun); //undefined

var people1 = new Person();
var people2 = new Person();
console.log(people1.a);           //0
console.log(typeof people1.fun); //function
console.log(people2.a);           //0
console.log(typeof people2.fun); //function

people1.fun();  //调用实例函数fun
people2.fun();  //调用实例函数fun

console.log(people1.fun === people2.fun); //false
```
实例变量可以被实例访问，不能被函数本身访问。
通过`this`虽然可以达到预期的效果，但是，两个实例的fun却不是引用的同一个函数，而是fun的复制。这个对属性来说没有什么问题，但是对于方法来说问题就很大了，因为方法都是在做完全一样的功能，但是却又两份复制，如果一个函数对象有上千个实例方法，那么它的每个实例都要保持一份上千个方法的复制，这显然是不科学的，这可肿么办呢，prototype应运而生。


# 四、prototype
在JavaScript中，每创建一个新的**函数** 就会为该函数创建`propertype`属性，这个属性就是函数的原型对象，原型对象包含函数实例的共享的方法和属性。如图：
![prototype](/assets/blogImg/180511-1.png)
根据上图可以看出：
1.Person会自动获得prototype属性，prototype是一个对象；
2.prototype里面有一个默认的constructor属性； 
3.constructor属性指向Person对象。

constructor下一节再讲，这里我们先只看prototype的作用：
> 作用:**继承和共享属性**。函数作构造函数调用（使用new操作符调用）的时候，生成的实例会从原型对象上继承和共享属性和方法。
  *（个人觉得，有点像浅克隆）*

其实不用觉得原型对象跟别的对象有什么不同，它只是在特定的场景存了些特定的值而已，所以牢记一点：**原型对象就是普通对象！**
当然有一个特殊，那就是**`Function.prototype`的类型是`Function`（函数对象）**，为什么呢？不妨这么想，实例是继承于构造函数的原型对象的，而`Function`的实例是个函数对象，所以倒推`Function.prototype`也是函数对象咯。（可能有点牵强，但是能够这么理解吧）
```javascript
console.log(typeof Function.prototype)  //Function
```

下面我们从例子中看看prototype的作用：
```javascript
function Person(option) {
    this.name = option.name;    /*问：this的指向？*/
    this.age = 18;
    this.obj1 = {a:'a的原始值'};
}
Person.prototype.sayName = function() {
    console.log(`my name is ${this.name}`);
};
Person.prototype.obj2 = {b:'原始值'};

var person1 = new Person({name:'Momoko'});
var person2 = new Person({name:'mmmms'});
person1.sayName(); // 'Momoko'   /*答：this指向函数的实例*/
person2.sayName(); // 'mmmms'

console.log(person1.obj1 === person2.obj1);        //false /*obj1是在构造函数体内部通过this添加*/
console.log(person1.obj2 === person2.obj2);        //ture  /*obj2是通过prototype添加*/
console.log(person1.sayName === person2.sayName);  //true  /*两个实例的sayName()引用的事同一个函数*/
console.log(person1.constructor === person2.constructor);//true
    
/*修改在构造函数里通过this添加的引用类型值obj1*/
console.log(person1.obj1);      // {a:"a的原始值"}
person1.obj1.a = "a被修改了";   // 修改person2的obj1.a的值
console.log(person1.obj1);      // {a:"a被修改了"} 
console.log(person2.obj1);      // {a:"a的原始值"}

/*修改prototype里的引用类型值obj2*/
console.log(Person.prototype.obj2);  // {b:"原始值"}
console.log(person2.obj2);           // {b:"原始值"}
person1.obj2.b = "修改了";           /*修改通过prototype添加的对象的属性*/
console.log(Person.prototype.obj2);  // {b:"修改了"}
console.log(person2.obj2);           // {b:"修改了"}
```
在这个demo中，obj1是在构造函数体内部通过this添加的，obj2是通过构造函数的原型对象（prototype）添加的。person1 person2都是Person的实例，由上可知：
> 1.在每次实例化的时候，都会执行构造函数里的代码，并将this指向实例。（上面第二章也有讲）
  2.person1和person2共享了Person.prototype中的obj2。也就是说，在每次实例化的时候，所有实例会共享*引用类型值*的地址。

# 五、\_\_proto\__
**JS在创建对象（无论普通对象还是函数对象）的时候都有一个内置属性`__proto__`，用于指向创建它的构造函数的原型对象。**
验证他们指向的是同一个地址：
```javascript
console.log(Person.prototype.a);   //undefined
console.log(person1.__proto__.a); //undefined
person1.__proto__.a = 1;          /*给person1.__proto__添加一个新属性*/
console.log(Person.prototype);     //1  /*添加成功 并修改了原型对象中的值*/
```

对于普通对象：
对象person1有一个`__proto__`属性，创建它的构造函数是`Person`，所以：

    person1.__proto__ == Person.prototype
请看图：
![原型链](/assets/blogImg/180512-2.jpg)
<center>《JavaScript高级程序设计》图6-1</center>
由图可得：

    Person.prototype == person1.__proto__
    Person.prototype.constructor == Person
    person1.constructor == Person
    
**不过，要明确的真正重要的一点就是，这个连接存在于实例（person1）与构造函数（Person）的原型对象（Person.prototype）之间，而不是存在于实例（person1）与构造函数（Person）之间。**

通过对象字面量创建的对象同样如此：

    var obj = {}
    Object.prototype == obj.__proto__      //true
    Object.prototype.constructor == Object //true
    obj.constructor == Object              //true
    
对于函数对象：
函数对象的构造函数是Function，所以有**所有函数对象**的`__proto__`都指向`Function.prototype`，它是一个空函数（Empty function）
JavaScript中有内置(build-in)构造器/对象共计12个（ES5中新加了JSON），这里列举了可访问的8个构造器。剩下如Global不能直接访问，Arguments仅在函数调用时由JS引擎创建，Math，JSON是以对象形式存在的，无需new。它们的proto是Object.prototype。如下:
```javascript
console.log(Number.__proto__ === Function.prototype); // true
console.log(Number.constructor === Function);         // true

console.log(Boolean.__proto__ === Function.prototype);// true
console.log(Boolean.constructor === Function);        // true

console.log(String.__proto__ === Function.prototype); // true
console.log(String.constructor === Function);         // true

// 所有的构造器都来自于Function.prototype，包括构造器Object
console.log(Object.__proto__ === Function.prototype); // true
console.log(Object.constructor === Function);         // true

// 所有的构造器都来自于Function.prototype，包括根构造器Function自身
console.log(Function.__proto__ === Function.prototype);// true
console.log(Function.constructor === Function);        // true

console.log(Array.__proto__ === Function.prototype);   // true
console.log(Array.constructor === Function);           // true

console.log(RegExp.__proto__ === Function.prototype);  // true
console.log(RegExp.constructor === Function);          // true

console.log(Error.__proto__ === Function.prototype);   // true
console.log(Error.constructor === Function);           // true

console.log(Date.__proto__ === Function.prototype);    // true
console.log(Date.constructor === Function);            // true
```
**再强调一次，这些连接存在于实例与构造函数的原型对象（Function.prototype）之间，而不是存在于实例与构造函数（Function）之间。**

```javascript
console.log(Math.__proto__ === Object.prototype); // true
console.log(Math.construrctor === Object);        // true

console.log(JSON.__proto__ === Object.prototype); // true
console.log(JSON.construrctor === Object);        //true
```
**重要的事情说很多遍：这个连接存在于实例与构造函数的原型对象（这里是Object.prototype）之间，而不是存在于实例与构造函数（Object）之间。**


# 六、constructor
第四节中讲到prototype有一个默认属性`constructor`，该属性指向`prototype`所在的函数对象(Person)。
```javascript
Person.prototype.constructor === Person;  //true
```
上一节讲到实例有一个默认属性`__proto__`指向构造函数的`prototype`属性
```javascript
person1.__proto__ === Person.prototype;  //true  
```
```javascript
function Person() {
  console.log('执行了Person');     /*注意下面的输出*/
}
var person1 = new Person();                 //执行了Person
console.log(person1.constructor === Person); //true
person1.constructor({});                     //执行了Person
```
你一定在想，为什么person1可以直接调用constructor属性而且执行的Person()呢？
因为，在JS中读取某个对象的某个属性时，会先在实例中搜索该属性，如果在实例中找到了定名字的属性，则返回该属性值；如果没有，则继续搜索原型对象中是否含有该属性。`person1`中没有`constructor`属性，继续搜索`person.__proto__`（==>`Person.prototype`），在`Person.prototype`中找到了`constructor`（==>`Person()`），并返回它。这个搜索机制在下一篇中也会详解。

```javascript
var obj = {};
console.log(obj.constructor);             // Object() { [native code] }
console.log(person1.constructor);         // Person(option) {...}
console.log(Function.constructor);        // Function() {}  /*空函数*/
console.log(Object.constructor);          // Function() {}  /*空函数*/
console.log(Array.constructor);           // Function() {}  /*空函数*/
console.log(typeof obj.constructor);      // function
console.log(typeof person1.constructor);  // function
console.log(typeof Function.constructor); // function
console.log(typeof Object.constructor);   // function
console.log(typeof Array.constructor);    // function
```
∴由此可得：
>**每个实例对象都有一个的构造函数属性（constructor），并且该属性指向构造函数**
>**person1.constructor === Person.prototype.constructor === Person**


*这篇分别概述了各个知识点，虾片总结~*