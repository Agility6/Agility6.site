---
external: false
title: Algorithm-Java
date: 2023-11-10
---

[📦](https://github.com/Agility6/algorithm/tree/main/algorithm-java)

- 基础算法

- 数据结构

- 搜索与图论

- 数学知识

- 动态规划

- 贪心  


## 基础算法

### 快速排序

```java

   public static void quick_sort(int q[], int l, int r) {

        if (l >= f) return;

        int i = l - 1;
        int j = r + 1;
        int x = q[l + r >> 1];

        while (i < j) {

            do { i++; } while (q[i] < x);
            do { j--; } while (q[j] > x);

            if (i < j) {
                int tmep = q[i];
                q[i] = q[j];
                q[j] = temp;
            }
        }

        quick_sort(q, l, j);
        quick_sort(q, j + 1, r);

    }
```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/QuickSort.java)

### 归并排序

```java

public static void merge_sort(int q[], int l, int r) {

    if (l >= r) return;

    int mid = l + r >> 1;
    merge_sort(q, l, mid);
    merge_sort(q, mid + 1, r);

    int k = 0;
    int i = l;
    int j = mid + 1;

    while (i <= mid && j <= r) {
        if (q[i] <= q[j]) temp[k++] = q[i++];
        if (j <= r) temp[k++] = q[j++];
    }

    while (i <= mid) temp[k++] = q[i++];
    while (j <= r) tmep[k++] = q[j++];

    for (int i = l, j = 0; i <= r; i++, j++) {
        q[i] = tmep[j];
    }
}

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/MergeSort.java)

### 整数二分

- 区间`[left, right]`被划分成`[left, mid]` 和`[mid + 1, right]`使用左二分查询，查找左侧第一个满足条件的数

- 区间`[left, right]`被划分成`[left, mid - 1]` 和`[mid, right]`使用右二分查询，查找右侧第一个满足条件的数

```java

    public boolean check(int x) {

    }

    public static int leftBinarySearch(int[] arr, int left, int right) {

        while (left < right) {
            int mid = arr[left + right >> 1];
            if (check(mid)) right = mid;
            else left = mid + 1;
        }

        return left;

    }

    public static int rightBinarySearch(int[] arr, int left, int right) {

        while (left < right) {
            int mid = arr[left + right + 1 >> 1];
            if (check(mid)) left = mid;
            else right = mid - 1; 
        }

        return left
    }

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/IntegerBinary.java)

### 浮点数二分

- EPS表示精度，取决于题目对精度的要求，默认负6次方

```java

    public static boolean check(double x) {}

    public static double floatBinarySearch(double left, double right) {

        while (right - left > EPS) {
            double mid = (left + right) / 2;
            if (check(mid)) right = mid;
            else left = mid;
        }

        return left;
    }

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/FloatBinary.java)

### 一维前缀和

```txt

    S[i] = a[1] + a[2] + a[3] ... a[i];

    a[l] + ... + a[r] = s[r] - s[l - 1];

    构造前缀和数组
    S[i] = S[i - 1] + a[i];

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/PrefixesSum.java)

### 二维前缀和

```txt

 以(x1, x2)为左上角 
 以(x2, y2)为右下角
 求子矩阵的和

 S[x2, y2] - S[x1 - 1, y2] - S[x2 - y1 - 1] + S[x1 - 1, y1 - 1]

 二维构造前缀和
 S[i][j] =  S[i - 1][j] + S[i][j - 1] - S[i - 1][j - 1] + a[i][j]

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/PrefixesSum2.java)

### 一维差分

a[1] = b[1]  

a[2] = b[1] + b[2]  

a[3] = b[1] + b[2] + b[3]  

a[n] = b[1] + b[2] + b[3] + ... + b[n]  

- a数据是b数组的前缀和，b数据是a数组的差分

```txt

    给区间[l, r]中的每个数加上c
    b[l] += c
    b[r + 1] -= c

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/differential.java)


### 二维差分

```txt

    以(x1, y1)为左上角
    以(x2, y2)为右上角
    在这子矩阵的所有元素中加上c

    S[x1, y1] += c
    S[x2 + 1, y1] -= c
    S[x1, y2 + 1] -= c
    S[x2 + 1, y2 + 1] += c

```

[Code🌰](https://github.com/Agility6/algorithm/blob/main/algorithm-java/src/basic_algorithm/differential2.java)
