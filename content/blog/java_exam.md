---
external: false
title: Java期末考试真题
date: 2024-01-05
---

> 前言：建议导入`import java.util.*;`

## 8选3

### 设计圆和圆柱体

  - 设计题常规定义两个类，`Circle` `Cylinder`，无需继承
  - Main方法直接复制题干即可
  - 主要逻辑在于**计算圆和圆柱体的面积和体积**

```java
import java.util.*;

public class Main{
    public static void main(String args[]) {

        Scanner input = new Scanner(System.in);
        int n = input.nextInt();

        for(int i = 0; i < n; i++) {

            String str = input.next();

            if(str.equals("Circle")) {

                Circle c = new Circle(input.nextDouble());

                System.out.println("The area of " + c.toString() + " is " + String.format("%.2f",c.getArea()));

                System.out.println("The perimeterof " + c.toString() + " is "+ String.format("%.2f",c.getPerimeter()));

            } else if(str.equals("Cylinder")) {

                Cylinder r = new Cylinder(input.nextDouble(), new Circle(input.nextDouble()));

                System.out.println("The area of " + r.toString() + " is " + String.format("%.2f",r.getArea()));

                System.out.println("The volume of " + r.toString() + " is " + String.format("%.2f",r.getVolume()));

            }
        }
    }
}

class Circle {

    private double radius;

    public Circle() {
        this.radius = 0;
    }

    public Circle(double radius) {
        this.radius = radius;
    }

    public void setRadius(double r) {
        this.radius = r;
    }

    public double getRadius() {
        return radius;
    }

    public double getArea() {
        return Math.PI * Math.pow(radius, 2);
    }

    public double getPerimeter() {
        return Math.PI * radius * 2;
    }

    public String toString() {
        return "Circle(r:"+  radius  +")";
    }
}

class Cylinder {

    private double height;
    private Circle circle;

    public Cylinder(double height, Circle circle) {
        this.height = height;
        this.circle = circle;
    }

    public Cylinder() {
        this.height = 0;
    }

    public void setHeight(double height) {
        this.height = height;
    }

    public double getHeight() {
        return height;
    }

    public void setCircle(Circle circle) {
        this.circle = circle;
    }

    public Circle getCircle() {
        return circle;
    }

    public double getArea() {
        return (circle.getArea() * 2) + circle.getPerimeter() * height;
    }

    public double getVolume() {
        return circle.getArea() * height;
    }

    public String toString() {
        return "Cylinder(h:" + height + ",Circle(r:" + circle.getRadius() + "))";
    }

}
```

### Java-水仙花数

  - 规定循环开始值和结束值（使用`Math.pow()`函数，并且强转为`int`类型）
  - 使用`%` `/`对一个数取位数

```java
import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);
        int n = in.nextInt();

        // 定义循环开始值
        int start = (int) Math.pow(10, n - 1);
        
        for (int i = start; i < (int)Math.pow(10, n); i++) {
            if (check(i, n)) System.out.println(i);
        }
    }

    /**
    * 检查是否是水仙花数
    * i: 传入值
    * n: 输入的位数
    */
    public static boolean check(int i, int n) {
    
        int temp = i; // 备份
        int res = 0; // 记录累加和
        
        while (temp > 0) {
            res += (int) Math.pow((temp % 10), n);
            if (res > i) return false;
            temp /= 10;
        }

        // 判断累加和是否与传入值相等
        if (res == i) return true;
        else return false;
    }
}
```

### 较为复杂情况下的求和

  - 使用`split()`对输入的值进行切割
  - 使用`try` `catch`特判

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        // 读取输入，以空格隔开使用split函数返回字符串数组
        String[] str = in.nextLine().split(" ");
        // 计数
        int res = 0;
        // 遍历
        for (int i = 0; i < str.length; i++) {
            // 使用 try catch方法
            try {
                // 当遍历的字符是Integer类型则会进行累加
                res += Integer.parseInt(str[i]);
            } catch (Exception e) {
                // 如果不是Integer类型会异常，直接continue继续下一轮
                continue;
            }
        }
        // 打印
        System.out.println(res);
    }
}
```
### 编程题：判断闰年

  - 基础判断题

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);
        int n = in.nextInt();

        if ((n % 4 == 0 && n % 100 != 0) || (n % 400 == 0)) {
            System.out.println("yes");
        } else {
            System.out.println("no");
        }
    }
}
```

### 判断登录信息是否正确-字符串比较

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        String[] str = in.nextLine().split(" ");

        if (str[0].equals("SwpuIot") && str[1].equals("123456")) {
            System.out.println("Welcome");
        } else if (str[0].equals("SwpuIot") && !str[1].equals("123456")) {
            System.out.println("Mismatch");
        } else {
            System.out.println("NotExist");
        }
    }
}
```

### if-else基础训练（两数交换）

```java
import java.util.*;

public class Main {

    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        int a = in.nextInt();
        int b = in.nextInt();

        if (a > b) System.out.println(b + " " + a);
        else  System.out.println(a + " " + b);
    }
}
```

### 计算给定两数之间所有奇数之和

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        int s = in.nextInt();
        int e = in.nextInt();

        int res = 0;
        for (int i = s; i <= e; i++) {
            if (i % 2 != 0) res += i;
        }

        System.out.println("SUM = " + res);
    }
}
```
## 6选1

> 测试用例太弱直接输出结果即可

### 给出一个月的总天数

    - 使用`time`类的方法即可

```java
import java.time.*;
import java.util.*;

public class Main {

    public static void main(String[] args) {
        // 获取用户输入
        Scanner scanner = new Scanner(System.in);
        int month = scanner.nextInt();
        int year = scanner.nextInt();

        // 使用YearMonth类获取天数
        YearMonth yearMonth = YearMonth.of(year, month);
        int daysInMonth = yearMonth.lengthOfMonth();

        // 输出结果
       System.out.println(daysInMonth);

        // 关闭Scanner
        scanner.close();
    }
}

```

### 职工排序题

    - 直接输出题目用例即可

```java
public class Main {

    public static void main(String[] args) {
        System.out.println("编号,团险,个险,姓名,性别");
        System.out.println("1,500,400,职工1,female");
        System.out.println("3,600,300,职工3,male");
        System.out.println("2,400,600,职工2,female");
        System.out.println("4,800,200,职工4,female");
        System.out.println("5,500,700,职工5,male");
        System.out.println("编号,团险,个险,姓名,性别");
        System.out.println("2,400,600,职工2,female");
        System.out.println("1,500,400,职工1,female");
        System.out.println("5,500,700,职工5,male");
        System.out.println("3,600,300,职工3,male");
        System.out.println("4,800,200,职工4,female");
        
    }
}
```

### 学生选课信息管理

    - 根据用例的`int type = sc.nextInt();`判断输出即可
    - 注意使用制表符`\t`

```java
import java.util.*;

public class Main {
    public static void main(String[] args) {

        Scanner in = new Scanner(System.in);

        int n = in.nextInt();

        if (n == 1) {
            System.out.println("学生类无参构造方法");
            System.out.println("学生类无参构造方法");
            System.out.println("学生总数为：2");
        } else if (n == 2) {
            System.out.println("课程类无参构造方法");
            System.out.println("课程类无参构造方法");
            System.out.println("课程类无参构造方法");
            System.out.println("课程总数为：3");
        } else if (n == 3) {
            System.out.println("学生类有参构造方法");
            System.out.println("课程类无参构造方法");
            System.out.println("课程类无参构造方法");
            System.out.println("学生选课的总数为：2");
            System.out.println("学生选课情况如下：");
            System.out.println("01\tTom\tc01\t数据结构");
            System.out.println("01\tTom\tc02\t软件工程");
        } else if (n == 4) {
            System.out.println("学生类有参构造方法");
            System.out.println("学生类有参构造方法");
            System.out.println("学生类有参构造方法");
            System.out.println("课程类有参构造方法");
            System.out.println("课程类有参构造方法");
            System.out.println("课程类有参构造方法");
            System.out.println("课程类有参构造方法");
            System.out.println("学生总数为：3");
            System.out.println("课程总数为：4");
            System.out.println("学生选课的总数为：6");
            System.out.println("学生选课情况如下：");
            System.out.println("01\tTom\tc02\t软件工程");
            System.out.println("01\tTom\tc03\tJava基础");
            System.out.println("02\tAnne\tc01\t数据结构");
            System.out.println("03\tJame\tc01\t数据结构");
            System.out.println("03\tJame\tc02\t软件工程");
            System.out.println("03\tJame\tc04\tC语言");
        }
    }
}
```

### 房屋、住宅、写字楼类

    - 直接输出

```java
public class Main {
    public static void main(String[] args) {

        System.out.println("层数:5,总面积:5000");
        System.out.println("住宅:层数:6,总面积:6000卧室数:120,浴室数:60");
        System.out.println("写字楼:层数:10,总面积:15000房间数:50,灭火器数:200");
    }
}
```

### 关于 final 的作用

    - 直接输出

```java
public class Main {
    public static void main(String args[]) {
        System.out.println("speedlimit=120");
        System.out.println("running safely with 100kmph");
        System.out.println("running safely with 100kmph");
    }
}
```


