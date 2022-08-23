# 使用 parcel 创建前端项目

## 全局安装 parcel

```bash
 yarn add --dev parcel
```

## 创建项目、初始化 npm

```bash
mkdir parcel-project && npm init -y
```

## 创建 src 目录和 index.html、index.js 文件

```bash
mkdir {src,src/js,src/scss}
cd $_ && touch index.html index.js
```

## 添加 Package scripts, and source

```json
{
  "...": "...",
  "source": "src/index.html",
  "scripts": {
    "start": "parcel",
    "lint": "eslint",
    "build": "parcel build"
  }
}
```

## 启动服务

```bash
npm start
```

# 其他

## 添加 gitignore

```bash
touch .gitignore
```

## 添加目标浏览器 package.json

```json
{
  "...": "...",
  "browserslist": "> 0.5%, last 2 versions, not dead"
}
```

## 配置 Prettier 自动格式化代码

## 增加代理 proxy, 项目根目录添加.proxyrc 文件

```bash
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

## 增加 scss、eslint

```bash
yarn add -D sass
yarn add -D eslint
npm init @eslint/config
```

### eslint package.json

```json
{
  "...": "...",
  "lint": "eslint"
}
```

### compression

Parcel supports compressing bundles using Gzip and Brotli.

```bash
yarn add @parcel/compressor-gzip @parcel/compressor-brotli --dev
```

```json
"compressors": {
    "*.{html,css,js,svg,map}": ["@parcel/compressor-gzip"]
  }
```
