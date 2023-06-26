---
external: false
title: Hugo-build
date: 2022-08-26
---

# Blog

- **👻使用Hugo框架搭建博客**
- **🐤Github pages自动部署**
- **🐳添加域名**

## **Hugo-download**

**link:💡[https://gohugo.io/getting-started/installing/](https://gohugo.io/getting-started/installing/)**

- **Mac系统⚡**
    - **Homebrew `brew install hugo`**
- **Window(折腾)**
    - **Chocolatey `choco install hugo -confirm`**
    - **add Sass/SCSS `choco install hugo-extended -confirm`**

## **Begin**

- 🧩**创建存放Blog文件夹 `mkdir xxx`**
- 🌤️**初始化`Hugo hugo new site <USERNAME>`**
- 🧁**下载主题 download Theme**
    - **推荐 LoveIt-Theme:[https://github.com/dillonzq/LoveIt](https://github.com/dillonzq/LoveIt)**
    - **文档说明 LoveIt-Doc:[https://hugoloveit.com/zh-cn/theme-documentation-basics/#basic-configuration](https://hugoloveit.com/zh-cn/theme-documentation-basics/#basic-configuration)**

**🎯LoveIt的文档十分详细，可以按照文档的步骤去实现**

## **Gihub-Pages**

- **❗创建<USERNAME>.github.io**
- **📌进入settings → Pages → Build and deployment**
    - **选择Github Actions自动部署Hugo**

**🎯可以根据Hugo部署教程进行[https://gohugo.io/hosting-and-deployment/hosting-on-github/](https://gohugo.io/hosting-and-deployment/hosting-on-github/)**

## **添加域名**

- **首先你需要一个域名(我是在阿里云购买)**
- **在该项目根目录中添加CNAME**
    - **Add file → Create new file**
- **进行域名解析**
    
    
    | 记录类型 | 主机记录 | 解析路径 | 记录值 |
    | --- | --- | --- | --- |
    | CANME | @ | 默认 | <USERNAME>.github.io |
    | CANME | www | 默认 | <USERNAME>.github.io |

**🎯等待…完结撒花**