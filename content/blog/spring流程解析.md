---
external: false
title: Spring流程解析
date: 2024-03-09
---

## 基础代码

> 这里不采用注解的形式进行流程分析，采用最原始的方法分析spring是如何将一个`Bean`完成解析的。

- 以下代码是一个最简单的例子。

```java
public static void main(String[] args) {

	Resource resource = new ClassPathResource("applicationContext.xml");
	
	DefaultListableBeanFactory defaultListableBeanFactory = new DefaultListableBeanFactory();

	BeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(defaultListableBeanFactory);

	beanDefinitionReader.loadBeanDefinitions(resource);

	Student student = (Student) defaultListableBeanFactory.getBean("student");
	System.out.println(student.getName());  
	System.out.println(student.getAge());
	
}
```

```xml

<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
    http://www.springframework.org/schema/beans/spring-beans.xsd">

    <!-- 定义bean -->
    <bean id="student" class="com.t.spring.bean.Student">
        <property name="name" value="zhangsan"/>
        <property name="age" value="20"/>
    </bean>

</beans>

```
## 概念介绍

> 粗略的介绍一下概念，以及上述代码的大致流程。

- IoC（Inverse of Control）控制反转：简单的来说就是无需自己去`new`一个对象直接从工厂中获取即可。

- DI（Dependency Injection）依赖注入：当A依赖B，那么B也会被创建出来。

### 关于Spring容器管理`Bean`的过程以及加载模式

1. 需要将bean的定义信息声明在spring的配置文件当中。

2. 需要通过Spring抽象出的各种`Resource`来指定对应的配置文件。

3. 需要显示声明一个Spring工厂，该工厂用来掌控我们在配置文件中所声明的各种`Bean`以及`Bean`之间的依赖与注入关系。

4. 需要定义一个配置信息读取器，该读取器用来读取之前所定义的bean配置文件信息。

5. 读取器的作用是读取我们所声明的配置文件信息，并且将读取后的信息装配到之前所声明的工厂当中。

6. 需要将读取器与工厂以及资源对象进行相应的关联处理。

7. 工厂所管理的全部对象装配完毕，可以供客户端直接调用，获取客户端想要使用的各种bean对象。

### Spring对于Bean管理的核心组件

1. 资源抽象，**例如：`ClassPathResource`**。

2. 工厂，**例如：`DefaultListableBeanFactory`**。

3. 配置信息读取器，**例如：`BeanDefinitionReader`**。

4. **`BeanFactory`是Spring Bean工厂最顶层的抽象**。

## 分析代码

### 分析1

```java

Resource resource = new ClassPathResource("applicationContext.xml");

```

大致流程，会去解析路径是否合法，并且会去添加`ClassLoader`

![photo](/assets/spring/1.png)

### 分析2

```java

DefaultListableBeanFactory defaultListableBeanFactory = new DefaultListableBeanFactory();

```
创建一个工厂

![photo](/assets/spring/2.png)

### 分析3

```java

BeanDefinitionReader beanDefinitionReader = new XmlBeanDefinitionReader(defaultListableBeanFactory);

```

因为配置文件是Xml格式的所以，使用`XmlBeanDefinitionReader`这个抽象类，需要将`defaultListableBeanFactory`传入。因为解析完成后需要将一个个`Bean`对象放入到工厂当中。

什么是`Environment`

  - `Environment`是一个接口，代表当前程序运行的环境

  - 对两个方面进行处理处理，`profilem`和`properties`

  - profilem`决定运行的是开发环境还是生产环境

  - `properties`是运行的各种各样的属性

总结：就是将`defaultListableBeanFactory`赋值给`private final BeanDefinitionRegistry registry;`然后确定`ResourceLoader`和`Environment`

![photo](/assets/spring/3.png)

### 分析4

-  这一行代码应该是主要的，粗略的看它讲xml进行解析，然后放入到工厂中，然后我们就可以直接从工厂中取出对象了。

```java

`beanDefinitionReader.loadBeanDefinitions(resource);`

```

> 图解流程

{% excalidraw url="https://excalidraw.com/#json=6-eh-zZeO-WpegslIbI_1,VHHFoWD7PbBNhdLMZ6Melw" height="550px" /%}
