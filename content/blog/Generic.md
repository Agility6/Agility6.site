---
external: false
title: Java泛型<🌱>
date: 2023-07-11
---

### What

#### 为什么有?

  - 如果没有泛型，在使用`ArrayList`数据可能会变得杂乱，例如在使用`ArrayList`的时候，想对数据进行限制，就必须使用到泛型

  - 同时在使用集合的过程中，都应该保证的是将相同的类型数据存放，便于管理。如果没有泛型则会变得不可控

  ```java
    ArrayList list = new ArrayList();
    list.add(1);
    list.add(2);
    list.add(3);
    list.add("Hello?")  // NO!
  ```

  - 因此泛型可以在编译时期对我们传入的类型继续检查，保证数据类型的一致性

  ```java
    ArrayList<Integer> list2 = new ArrayList<>();
    list2.add(1);
    list2.add(2);
    list2.add(3);
    // list2.add("Hello!"); ERROR!!!
  ```
  
  > 泛型的类型都是为引用数据类型

#### 应该怎么使用?

  - **泛型类**

    如果在创建实例过程中，没有指定泛型则自动为`Object`类型

    ```java
      public class GenericTest<E> {
        String name;
        E sex;

        public void printfSex(E s) {
        }

      }

      class Test {
        public static void main(String[] args) {
          GenericTest gt1 = new GenericTest();
          GenericTest<String> gt2 = new GenericTest<>();
        }
      }
    ```

    - **泛型类的细节**

      1. 泛型类可以定义多个泛型类型

      2. 泛型如果不指定，那么就会被擦除，泛型对应的类型为Object类型

      3. 泛型类中的`static`方法不能使用类的泛型

      4. 不可以使用`[]`去创建

        ```java
          public class GenericTest<E> {
            public void create(E e) {
              // No --> E[] i = new E[10];
              E[] i = (E[])new Object[10]; // Yes
            }
          }
        ```

  - **泛型方法**

    > 与泛型类中的`static`方法不能使用类的泛型，进行区分

    1. 泛型方法与当前类的泛型是无关的

    2. 泛型方法的泛型类型实在调用方法的时候确定的

    ```java
      public class GenericTest<E> {
        // public static void Test(E e) {} ERROR!!!
        
        // 泛型方法
        public static <T> void Test(T t) {
          System.out.println(t);
        }
      }
    ```

  - **泛型的继承**

    1. 父类指定泛型

        当在子类使用继承的时候指定了泛型的类型，则这个类型会延续到子类当中

      ```java
        // parent
        public class GenericTest<E> {
          String name;
          E sex;

          public void printfSex(E s) {
          }

        }

        // child
        class SubGenericTest extends GenericTest<String> {
          
        }

        class Test {
          public static void main(String[] args) {
            SubGenericTest sgt = new SubGenericTest();

            sgt.printfSex("man"); // type --> String!!!
          }
        }
      ```

    2. 父类不指定泛型

        如果父类不指定类型，那么泛型的类型确定权交给子类确定

      ```java
        // parent
        public class GenericTest<E> {
          String name;
          E sex;

          public void printfSex(E s) {
          }

        }

        // child
        class SubGenericTest<E> extends GenericTest<E> {
          
        }

        class Test {
          public static void main(String[] args) {
            SubGenericTest<String> sgt = new SubGenericTest();

            sgt.printfSex("Man")

          }
        }
      ```
    
    3. 泛型参数存在继承关系的情况

        G<E>和G<T>不存在继承关系，是并列的关系

      ```java
        public class Test {
          public static void main(String[] args) {

            Object obj = new Object();
            String s = new String();
            obj = s; // 多态

            Object[] objArr = new Object[10];
            String[] strArr = new String[10];
            objArr = strArr;

            List<Object> list1 = new ArrayList<>();
            List<String> list2 = new ArrayList<>();

            // list1 = list2 ERROR!!!
          }
        }
      ```

  - **通配符**

    假如没有通配符的情况下

    ```java
      public class Test {
        // ERROR!!!
        public void a(List<String> list) {}
        public void a(List<Integer> list) {}
      }
    ```

    使用通配符，相当于定义一个共同的父类

    ```java
      public class Test {
        
        // <?> 通配符
        List<?> list = null;

        List<Object> objList = new ArrayList<>();
        List<String> strList = new ArrayList<>();
        List<Integer> intList = new ArrayList<>();

        // Yes!!!
        list = objList;
        list = strList;
        list = intList;
      }
    ```

  - **泛型受限**

      1. 泛型的上限：理解为规定泛型最高的共同父类

      2. 泛型的下限：理解为规定泛型最低的共同父类

    ```java
      public class Test {

        List<Person> list1 = new ArrayList<>();
        List<Student> list2 = new ArrayList<>();
        List<Object> list3 = new ArrayList<>();

        // 泛型受限 --> 泛型的上限
        List<? extends Person> listTest = null;
        listTest = list1; // Yes!!!
        listTest = list2; // Yes!!!
        listTest = list3; // ERROR!!!

        List<? super Person> listTest2 = null;
        listTest2 = list1; // Yes!!!
        listTest2 = list2; // ERROR!!!
        listTest2 = list3; // Yes!!!
      }
      
      class Person {}

      class Student extends Person {}
    ```
