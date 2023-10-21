---
external: false
title: Auto-words-java
date: 2023-10-20
---

### Introduce

- 它能做什么？

  首先，这个项目是从我个人用途出发的，我在学习英语的时候，喜欢将文章复制到`word文档`中，将不会或者不熟悉的单词标记为其他颜色以便区分，对于不熟悉的单词，我可以将它们上传到`不背单词`中进行复习。

  因此将实现一个自动将`word文档`中标记过的单词输出为`.txt`格式

- 在此之前我使用`Go`实现类似的功能，但是因为需要使用[unioffice](https://unidoc.io/unioffice/)的key...
  
  🔗：[Auto-word-go](https://github.com/Agility6/auto-word)

![auto-words](/assets/auto-word-java/auto—words.png)

### Implement

使用Spire.Doc库进行对word文档的操作

#### Spire.Doc使用指南

**测试文本**

```txt

不要温和地走进那个良夜
作者：Dylan Thomas（狄兰·托马斯）, 1914 - 1953
Do not go gentle into that good night, 不要温和地走进那个良夜,
Old age should burn and rave at close of day; 白昼将尽,暮年仍应燃烧咆哮;
Rage, rage against the dying of the light. 怒斥吧,怒斥光的消逝。

```

- 获取文档，将文本输出

```java

  Document document = new Document();
  document.loadFromFile("example.docx");
  String content = document.getText();
  System.out.println(content);

```

- 获取第一段 `不要温和地走进那个良夜`

```java
  
  Doucment document = new Document();
  document.loadFromFile("example.docx");
  
  
  Section section = document.getSections().get(0);
  Paragraph paragraph = section.getParagraphs().get(0);
  String string = paragraph.getText();

  System.out.println(string);

```

- 获取第一段的字体颜色

    - 使用 TextRange 来访问、操作和获取文本内容以及文本的格式属性，如字体、字号、颜色等。

```java

  for (Object element : paragraph.getChildObjects()) {

    TextRange textRange = (TextRange)element;
    Color color = textRange.getCharacterFormat().getTextColor();
    System.out.println(color);

  }

```

#### 实现思路

根据Sprie.Doc的基本使用，就可以实现auto-words的功能了

1. 首先是获取docx的文件

2. 遍历`section`

3. 通过`section`遍历`paragraph`

4. 最后在遍历`getChildObjects`

5. 获取文本的颜色，进行判断是否等于目标值即可

![auto-words-im](/assets/auto-word-java/auto-words-im.png)

### 🦄️

[auto-words-java](https://github.com/Agility6/auto-words-java)
