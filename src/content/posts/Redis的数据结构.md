---
title: Redis的数据结构
pubDate: 2024-04-11
categories: ['Tech']
description: ''
---

**本篇文章主要介绍Redis数据类型，具体实现的数据结构**

## 前言

🚀 内容来自参考自**Redis设计与实现**

⚠️ 本篇文章主要介绍Redis3.0的数据结构，在Redis7.0数据类型与数据结构的关系有所不一致。
![photo](../assets/redis数据结构/1.png)

## 介绍逻辑

1. 数据结构的定义
2. 字段的解释
3. 特性

## 介绍内容

1. 简单动态字符串
2. 链表
3. 字典
4. 跳跃表
5. 整数集合
6. 压缩列表

## 简单动态字符串

### 数据结构的定义

![photo](../assets/redis数据结构/2.png)

### 字段的解释

1. `free`属性的值，记录SDS存在多少未使用的空间
2. `len`属性，记录SDS保存多少字节长度的字符串

### 特性

1. 常数复杂度获取字符串长度

2. 杜绝缓冲区溢出问题，SDS在执行修改增加操作的时候，API会检查是否满足要求，如果不满足会自动扩容

3. 减少修改字符串时带来的内存重分配次数，**空间预分配**会额外分配空间、**惰性空间释放**在缩短操作时，利用free属性记录数量，等待使用。

## 链表

### 数据结构的定义

- 由ListNode和List组成
  ![photo](../assets/redis数据结构/3.png)

### 字段的解释

#### ListNode

1. 前置节点
2. 后置节点
3. 节点的值

#### List

1. `head`表头指针
2. `tail`表尾指针
3. `len`链表长度计数器
4. `dup`函数用于复制链表节点所保存的值
5. `free`函数用于释放链表节点所保存的值
6. `match`函数用于对比链表节点所保存的值和另一个输入值是否相等

### 特性

1. 双端、无环
2. 多态：链表节点使用void\*指针来保存节点值，并且可以通过list结构的dup、free、match三个属性为节点值设置类型特定函数，所以链表可以用于保存各种不同类型的值。

## 字典

### 数据结构的定义

- 由哈希表和哈希节点组成，每个哈希节点保存了字典中的一个键值对
  ![photo](../assets/redis数据结构/4.png)

### 字段的解释

#### 哈希表

- table是一个数组，是`dictEntry`类型的数组。
- size记录属性。
- used哈希表已经有的节点。
- `sizemask`属性的值总是等于`size - 1`，这个属性和哈希值一起决定了一个键应该被放到table数组 的哪个索引上面。

#### 哈希表节点

- key保存键值对中对键
- v属性保存键值中的值：可能是指针、uint64_t整数、或者int64_t整数
- next属性是指向另一个哈希表节点的指针，\*_用于解决冲突_

#### 字典

- type和privdata属性是针对不同类型的键值对，为**创建多态字典设置的**
  - type指向dictType指针，dictType保存了针对特定类型键值对的函数
  - privdata属性保存了需要传给类型特定函数的可选参数
- ht属性包含**两个项数组**，每一个项都是一个哈希表，**⚠️一般情况下只会使用`ht[0]`，`ht[1]`是进行rehash的时候使用**
- rehashidx是与rehash有关的属性，记录当前rehash的进度，-1（没有进行rehash）。

### 特性

1. 解决键冲突，使用**链地址法**来解决冲突，简单来说就是利用**哈希表节点中的next属性**将冲突节点放到链表的表头位置

2. rehash（重新散列），当哈希表保存的键值对数量太多或者太少时，程序需要对哈希表的大小进行相应的扩展或者收缩。

3. 渐进式rehash，在进行渐进式rehash的时候，字典里面查找一个键的话，程序会先在`ht[0]`里面进行查找，如果没找到的话，就会继续到`ht[1]`里面进行查找。

## 跳跃表

### 数据结构的定义

- 跳跃表由跳跃表节点（zskiplistNode）和用于保存跳跃表节点的相关信息组成（zskiplist）
  ![photo](../assets/redis数据结构/5.png)

### 字段的解释

#### zskiplist

- header指向跳跃表的表头节点
- tail指向跳跃表的表尾节点
- level记录目标跳跃表内，层数最大的那个节点的层数（表头节点的层数不计算在内）
- length记录跳跃表的长度，也就是跳跃表目前包含节点的数量（表头节点不计算在内）

#### zskiplistNode

- 层（level）节点中用L1、L2等字样标记节点的各个层，每一个层都带有两个属性
  - 前进指针（`level[i].forward`）
  - 跨度，记录前进指针所指向节点和当前节点的距离，用于计算排位
- 后退指针，指向位于当前节点的前一个节点
- 分值，在跳跃表中，节点按照各自所保存的分值从小到大进行排序
- 成员对象，节点所保存的成员变量，它指向一个字符串对象（SDS）

### 特性

1. 跳跃表中的节点按照分值进行排序，当分值相同时，节点按照成员对象的大小进行排序

## 整数集合

### 数据结构的定义

![photo](../assets/redis数据结构/6.png)

### 字段的解释

- contents整数集合中的每一个元素都是contents数组的一个数据项（item），从小到大排序、没有重复
- length记录了整数集合包含的元素数量，也就是contents数组的长度
- encoding属性决定集合数组保存的数据类型（例如contents为int8_t类型的数据，但是实际上contents数组真正类型取决于encoding属性的值）

### 特性

1. 集合中不会出现重复元素
2. 整数集合升级，发生在添加新元素的类型比原来的类型要大
   - 整数集合升级，提高整数集合的灵活性（C语言是静态类型语言，通常不会将两种类型的值放在同一个数据结构当中）
   - 整数集合升级，尽可能节约内存

## 压缩列表

### 数据结构的定义

![photo](../assets/redis数据结构/7.png)

### 字段的解释

#### 压缩列表的构成

- zlbytes记录整个压缩列表占用的内存字节数；在对压缩列表进行内存重分配，或者计算zlend的位置时使用
- zltail记录压缩列表表尾节点距离压缩列表的起始地址有多少字节
- zllen记录压缩列表包含的节点数量
- entryX压缩列表包含的各个节点
- zlend特殊值，用于标记压缩列表的末端

#### 压缩列表节点的构成

- 每一个压缩列表节点可以保存**一个字节数组**或者**一个整数值**
- previous_entry_length记录前一个节点的长度
  - 如果前一节点的长度小于254字节，那么它的长度为1字节
  - 如果前一节点的长度大于254字节，那么它的长度为5字节
  - 因为previous_entry_length属性记录了前一个节点的长度，因此可以通过指针运算，获取前一个节点的起始地址。
- encoding记录节点的content属性所保存数据的类型以及长度
- content节点的content属性负责保存节点的值，节点值可以是一个字节数组或者整数，值的类型和长度由节点的encoding决定。

### 特性

1. 连锁更新，previous_entry_length属性都记录了前一个节点的长度，因此可能会发现连锁更新（发生的几率不高）
