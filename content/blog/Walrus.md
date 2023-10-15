---
external: false
title: Mystery of the Walrus
date: 2023-10-14
---

[Mystery of the Walrus.](https://joshhug.gitbooks.io/hug61b/content/chap2/chap21.html)，出自cs61b其中一个地方，主要描述这样一个问题

```java
  Walrus a = new Walrus(1000, 8.3);
  Walrus b;
  b = a;
  b.weight = 5;
  System.out.println(a);
  System.out.println(b);
```

```java
  int x = 5;
  int y;
  y = x;
  x = 2;
  System.out.println("x is: " + x);
  System.out.println("y is: " + y);
```

> While subtle, the key ideas that underlie the Mystery of the Walrus will be incredibly important to the efficiency of the data structures that we'll implement in this course, and a deep understanding of this problem will also lead to safer, more reliable code.

主要来探究这两种情况的本质

- 首先来看下面的例子，计算机的所有信息都是二进制的形式，那么当定义`int num = 7` 和 `char c = 'H'`它们的二进制都是`01001000`

    那么计算机应该如何去**interpreter**，答案是通过类型

  ```java
    int number = 72;
    String binaryString = String.format("%8s", Integer.toBinaryString(number)).replace(' ', '0');
    System.out.println(binaryString);

    char c = 'H';
    String binaryString2 = String.format("%8s", Integer.toBinaryString(c)).replace(' ', '0');
    System.out.println(binaryString2);
  ```

### Declaring a Variable (Simplified)

- 在计算机中有许多的内存位用于存储信息，且每一个内存位都有一个独立的地址值

- 当在java中定义一个类型变量，如`int`那么java会寻找一个连续的块，int会寻找32位的块。

- 除了预留内存之外，Java 解释器还在内部表中创建一个条目，将每个变量名称映射到框中第一位的位置。

当定义`int`和`double`，在java中可能会寻找内存的位300到320来存储`int i`，寻找内存的位2000到2064来存储`double j`。并且解释器将记录`i`从300开始，`j`s从2000开始  

可以简单的理解为，它们分别分配了32个位置的盒子和64个位置的盒子。java是不会让我们寻找到盒子的位置。

> 为什么不像C语言那样暴露地址值，对程序员隐藏内存位置会减少您的控制，从而阻止您进行某些类型的优化。"We should forget about small efficiencies, say about 97% of the time: premature optimization is the root of all evil"

- 当声明变量，java不会向box输入任何数据。总而言之没有默认值，只有到`=`的时候才会往box中添加数据。

可以简单的理解程序的环境

```java

  int x;
  int y;

  x = -1431195969;
  y = 567213.112;
```

![赋值](/assets/walrus/赋值.png)

### The Golden Rule of Equals (GRoE)

> 在Java编程中，"The Golden Rule of Equals" (GRoE) 可能指的是一种编程规则或最佳实践，与如何正确实现equals方法有关。在Java中，equals方法用于比较两个对象的内容是否相等。这是一项重要的任务，尤其是当您在自定义类中需要进行对象比较时。  The Golden Rule of Equals 建议你在自定义类中覆盖equals方法时要遵循以下规则： 对象相等性：确保equals方法判断两个对象是否相等，而不仅仅是引用相等。这意味着要比较对象的内容而不仅仅是它们在内存中的地址。 一致性：equals方法应该在对象的内容没有变化的情况下，返回相同的结果，而且应该与hashCode方法一致，以便在使用散列集合（如HashMap）时能够正常工作。对称性：如果a.equals(b) 返回true，则b.equals(a) 也应该返回true。自反性：对象应该始终等于自身，即a.equals(a) 应该返回true。非空性：equals方法应该能够处理空引用，即a.equals(null) 应该返回false。遵守这些规则有助于确保equals方法在Java中的正确行为，使对象的比较更具意义。实现equals方法时，通常需要比较对象的字段以确定它们是否相等。您还可以使用@Override注解来明确表示您的equals方法是覆盖了父类的equals方法。 —— ChatGPT

解了以上的原理，就可以解释这个谜题了。  

当编写简单的`y = x`，是告诉java的解释器将x的值赋给y

当使用new实例化一个对象，java首先为该类的每个实例变量分配一个box，并且用**默认值**填充它们

```java
  public static class Walrus {

    public int weight;
    public double tuskSize;

    public Walrus(int w, double ts) {
      weight = w;
      tuskSize = ts;
    }

  }
```

当`new Walrus(1000, 8.3)`分别会创建两个box分别是32bits和64bits，组成walrus。任何对象都会有一些额外的开销，因此会比96位多一些空间，这里暂且先忽略

### Reference Variable Declaration

声明任何引用类型的变量时候，都会分配一个64位的box。这似乎不符合上面说的需要96多的空间。

> 声明的变量并不存储有关的数据，而是存储内存的地址

- 第一行创建64位的盒子

- 第二行创建一个新的walrus，地址由`new`运算符返回。根据GRoE将这些位复制到`someWalrus`的box中

```java
  Walrus someWalrus;
  someWalrus = new Walrus(1000, 8.3);
```

如果walrus中的weight的内存从200207开始，tuskSize从200239开始，那么someWalrus可以存储200207的二进制

### Box and Pointer Notation

- 根据GRoE，最后一行意味着将a的box的位复制到b到box中，仅此而已

```java
  Walrus a = new Walrus(1000, 8.3);
  Walrus b;
  b = a;
```

[Visualizer](https://cscircles.cemc.uwaterloo.ca//java_visualize/#)

### Instantiation of Arrays

```java
  int[] x;
  Planet[] planets;
```

- 这两个声明都会创建64位的box，但是x只能保存int数组的地址，而planets只能保存Planet数组的地址

- 实例化数组与实例化对象十分相似

  new关键字创建5个每个32位的框，返回整个对象的地址分配给x

  ```java
    x = new int[] {0, 1, 2, 95, 4};
  ```

### The Law of the Broken Futon

[The Law of the Broken Futon](https://mathwithbaddrawings.com/2015/04/08/the-math-ceiling-wheres-your-cognitive-breaking-point/)
