---
external: false
title: Java反射基础
date: 2023-12-01
---

在学习JDBC的时候注意到了反射，先来看一下在JDBC中如何使用反射的
```java
    // 根据字节码获取所有属性
    Field[] declaredFields = cls.getDeclaredFields();
    for (Field field : declaredFields) {
        field.setAccessible(true); // 设置属性可访问
    }

    while (resultSet.next()) {
        // 通过反射创建对象
        Object obj = cls.newInstance(); // 默认在通过反射调用对象的空参构造方法，解释了为什么pojo实体类中要有空参构造方法
        for (Field field : declaredFields) {
            String fieldName = field.getName();
            Object data = resultSet.getObject(fieldName);
            field.set(obj, data);
        }
            res.add(obj);
    }

```

> Reflection enables Java code to discover information about the fields, methods and constructors of loaded classes, and to use reflected fields, methods, and constructors to operate on their underlying counterparts, within security restrictions.
> The API accommodates applications that need access to either the public members of a target object (based on its runtime class) or the members declared by a given class. It also allows programs to suppress default reflective access control.

- 通过反射，可以在运行时获得程序或者程序集中每一个类型的成员变量和成员信息。

- Java的类型都是在编译期确认下来的，而Java反射机制可以动态地创建对象并调用其属性，这样的对象的类型在编译期是未知的

- 反射的核心是 JVM 在运行时才动态加载类或调用方法/访问属性，它不需要事先（写代码的时候或编译期）知道运行对象是谁。

首先先提出一个问题以下代码应该如何编写

```java

    public class Main {
        String getFullName(Animal a) {
            return a.getFirstName
        }
    }

    String getFullName(Object obj) {
        // ???
    }
```

- 可以看出在反射最主要是为了解决在运行时期，对某个实例不清楚的时候，如何调用其方法

接下来主要通过以下来认识反射

1. Class类

2. 访问字段

3. 调用方法

4. 调用构造方法

5. 获取继承关系


### Class类

- 每加载一种class，JVM就为其创建一个`Class`类型的实例，并关联起来，注意这个名字叫做Class

```java
  public final class Class() {}
```

- 🌰：当JVM加载String类时，它首先读取String.class文件到内存，然后为String类创建一个Class实例并关联起来`Class cls = new Class(String);`。这一个过程是JVM内部创建的

- 这个Class实例保存了该**class**的所有信息

  - 类名

  - 包名

  - 父类

  - 实现的接口

  - 方法字段

  - ...

**通过Class实例获取class信息这种就成为反射**

#### 使用案例

```java

    // getClass
    String str = "Hello World";
    Class clssStr = str.getClass();

    // .class
    Class clsStr2 = String.class

    // forName
    Class clsStr3 = Class.forName("java.lang.String");

```

**`Class`和`instanceof`的差别**

  - instanceof会匹配类型和类型的子类也会包括

  - `==`判断class可以精确的匹配数据类型，不包括子类

```java

    Integer n = new Integer(1);
    
    boolean b1 = n instanceof Integer; // true
    boolean b2 = n instanceof Number; // true

    boolean b3 = n.getClass() == Integer.class; // true
    boolean b4 = n.getClass() == Number.class;  // false

```

**实例化对象**

- 注意该方法只能调用`public`的无参构造方法

```java

    public static void main(String[] args) throws InstantiationException, IllegalAccessException {

        Class cls2 = Person.class;
        Person p1 = (Person) cls2.newInstance();
        System.out.println(p1);

    }

    class Person {

        public person()  {}
    }

```

### 访问字段

- Field getField(name)：根据字段名获取某个public的field（包括父类）

- Field getDeclaredField(name)：根据字段名获取当前类的某个field（不包括父类）

- Field[] getFields()：获取所有public的field（包括父类）

- Field[] getDeclaredFields()：获取当前类的所有field（不包括父类）

一个Field对象包含了一个字段的所有信息：

- getName()：返回字段名称，例如，"name"；

- getType()：返回字段类型，也是一个Class实例，例如，String.class；

- getModifiers()：返回字段的修饰符，它是一个int，不同的bit表示不同的含义。

#### 访问权限

- 注意如果是private修饰的，使用`Field.get(Object)`进行获取的时候需要设置`setAccessible(true)`

### 调用方法

- Method getMethod(name, Class...)：获取某个public的Method（包括父类）

- Method getDeclaredMethod(name, Class...)：获取当前类的某个Method（不包括父类）

- Method[] getMethods()：获取所有public的Method（包括父类）

- Method[] getDeclaredMethods()：获取当前类的所有Method（不包括父类）

一个Method对象包含一个方法的所有信息：

- getName()：返回方法名称，例如："getScore"；

- getReturnType()：返回方法返回值类型，也是一个Class实例，例如：String.class；

- getParameterTypes()：返回方法的参数类型，是一个Class数组，例如：`{String.class, int.class}；`

- getModifiers()：返回方法的修饰符，它是一个int，不同的bit表示不同的含义。

**使用invoke调用方法**

  - 静态方法

    ```java

        Method parseInt = Integer.class.getMethod("parseInt", String.class);
        Integer invoke = (Integer) parseInt.invoke(null, "12");
        System.out.println(invoke);

    ```

  - 非静态方法需要传入实例对象

    ```java

        Method foo = Person.class.getMethod("foo", int.class);
        Integer invoke2 = (Integer) foo.invoke(new Person(), 123);
        System.out.println(invoke2);

        class Person {
            
            public int foo(int i) {
                return i;
            }
        }
    ```

  - 如果是private方法则需要设置`setAccessible(true)`

  - 如果是多态的情况，取决于调用的实际类型

    ```java

      Method foo = Person.class.getMethod("foo");
      foo.invoke(new Student());

      class Person {
          public void foo() {
              System.out.println("Person")
          }
      }

      class Student extends Person {

          public void foo() {
              System.out.println("Student")
          }
      }
    ```

### 调用构造方法

- 因为使用`newInstance()`方法的时候必须要确保，构造方法是public以及是无参。为了调用任意的构造方法。Constructor对象

通过Class实例获取Constructor的方法如下：

  - getConstructor(Class...)：获取某个public的Constructor；

  - getDeclaredConstructor(Class...)：获取某个Constructor；

  - getConstructors()：获取所有public的Constructor；

  - getDeclaredConstructors()：获取所有Constructor。

- 同理如果是非public则需要使用`setAccessible(true)`


### 获取继承关系

- 获取继承关系

```java

    Class<Integer> integerClass = Integer.class;
    Class<? super Integer> superclass = integerClass.getSuperclass();
    System.out.println(superclass); // class java.lang.Number

    Class<? super Integer> superclass1 = superclass.getSuperclass();
    System.out.println(superclass1); // class java.lang.Object

    Class<? super Integer> superclass2 = superclass1.getSuperclass();
    System.out.println(superclass2); // null
  ```

- 获取接口实现

    > 注意`getInterfaces()`只能返回当前类直接实现的接口类型，并不包括其父类实现的接口类型

```java

    Class<Integer> i = Integer.class;
    Class<?>[] interfaces = i.getInterfaces();
    for (Class<?> anInterface : interfaces) {
        /**
         * interface java.lang.Comparable
         * interface java.lang.constant.Constable
         * interface java.lang.constant.ConstantDesc
         */
        System.out.println(anInterface);
    }

```

- `isAssignableFrom()`判断一个向上转型是否成立
