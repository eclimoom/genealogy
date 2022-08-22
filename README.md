
# 使用parcel创建前端项目

## 全局安装 parcel

``` bash
 yarn add --dev parcel
 ```

## 创建项目、初始化npm

``` bash
mkdir parcel-project && npm init -y
```

## 创建src目录和 index.html、index.js文件

``` bash
mkdir src && cd $_ && touch index.html index.js
```

## 添加Package scripts, and source

```json
{
  "...": "...",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel",
    "build": "parcel build"
  }
}
```

## 运行

``` bash
npm start
```

# 其他

## 添加 gitignore

``` bash
touch .gitignore
```

## 添加目标浏览器 package.json

```json
{
  "...": "...",
  "browserslist": "> 0.5%, last 2 versions, not dead",
}
``

## 配置Prettier自动格式化代码

## 增加代理 proxy, 项目根目录添加.proxyrc文件
``` bash
touch .proxyrc
```

```json
{
  "/api": {
    "target": "http://localhost:8000/",
    "pathRewrite": {
      "^/api": ""
    }
  }
}
```