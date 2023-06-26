---
external: false
title: What Would Python Print?
date: 2023-05-29
---

{{< youtube id="guc-Q1x2vAY" title="What Would Python Print" >}}

### 代码

```python

def horse(mask):
    horse = mask

    def mask(horse):
      return horse

    return horse(mask)

mask = lambda horse: horse(2)

horse(mask)
```

### 🤔

- 输出什么?

通过它其实可以很快知道如何调用执行的 -> https://pythontutor.com/visualize.html#mode=edit

1. 进行``Global``初始化  

    ![init](/assets/python3-what/init.png)

2. 在执行到``horse(mask)``将``mask``作为argument传入到``horse``  
    - 传入到``horse``的``mask``指向的是Global中的``mask`` 

    ![2](/assets/python3-what/2.png)

3. ``horse = mask``同理将``horse``指向了Global中的``mask``

4. ``def mask(horse)``!这里创建了``mask``函数改变了原来的``mask``指向  

    ![3](/assets/python3-what/3.png)

5. ``return horse(mask)``这里的``horse``和``mask``是什么？

    - horse: 应该对应着lambda表达式

    - mask：对应着一个func(horse)  

    ![4](/assets/python3-what/4.png)

6. 执行``return horse(mask)``就是执行lambda表达式

7. ``lambda horse: horse(2)``!lambda的argument就是``mask``也就是lambda中的``hors``

    ![5](/assets/python3-what/5.png)

8. 因此我们要执行``horse(2)``正是
    ```python
    def mask(horse):
      return horse
    ```

    ![6](/assets/python3-what/6.png)

9. 返回的结果为2，那么应该返回给谁？

    - 返回给lambda函数

    - 最后是``return horse(mask)``这里

10. 完成

    ![7](/assets/python3-what/7.png)

### 🥳
