---
external: false
title: Java期末考试真题
date: 2024-01-05
---

> 前言：建议导入`import java.util.*;`

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
