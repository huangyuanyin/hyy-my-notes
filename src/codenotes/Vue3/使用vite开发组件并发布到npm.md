---
# 当前页面内容标题
title: 使用vite开发组件并发布到npm
# 当前页面图标
icon: write
# 分类
category:
  - Vue3
# 标签
tag:
  - Vue3
  - pnpm
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

### 步骤预览：

1. 新建项目并开发组件
2. 编写 index.ts 文件，指明入口
3. 配置 vite 库模式
4. 打包
5. 配置 package.json
6. 测试
7. 申请/登录 npm 账号
8. 发布组件

---

### 第一步：新建项目并开发组件

- 使用 pnpm 新建一个空项目，并使用 pnpm 的 monorepo 功能，使这个项目作为总的工作空间

  ```shell
  pnpm init
  ```

- 使用 vite 在 这个工作空间创建一个 vue 项目

  ```shell
  pnpm create vite
  ```

  注：可能会遇到报错：'create' 不是内部或外部命令，也不是可运行的程序或批处理文件。

  解决：升级版本至 7.x

  ```shell
  pnpm add -g @pnpm/exe
  ```

- 编写组件，并导出组件

- 打包，并测试

启用 pnpm 的 monorepo 功能，只需要在项目根目录创建`pnpm-workspace.yaml`文件，并指定包含的目录。

`pnpm-workspace.yaml`

```yaml
packages:
  # 所有在 packages/ 和 components/ 子目录下的 package（包含的目录）
  - "projects/**"
  # 排除的目录
  - "!**/test/**"
```

---

### 第三步：vite 配置库模式

```shell
pnpm add @types/node vite-plugin-dts -D
```

```typescript
// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({ include: "./lib" })],
  // 配置库模式
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "HyyDemoComp",
      // the proper extensions will be added
      fileName: "hyy-demo-comp",
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
});
```

---

### 第五步：配置 package.json

package.json 配置说明：

```json
{
  /*
   1. 用于定义package.json文件和该文件所在目录根目录中.js文件和无拓展名文件的处理方式。值为'moduel'则当作es模块处理；值为'commonjs'则被当作commonJs模块处理
   2. 目前node默认的是如果pacakage.json没有定义type字段，则按照commonJs规范处理
   3. node官方建议包的开发者明确指定package.json中type字段的值
   4. 无论package.json中的type字段为何值，.mjs的文件都按照es模块来处理，.cjs的文件都按照commonJs模块来处理
    */
  "type": "module",
  /*
   如果需要避免这个包被发布到公共仓库上去，则可以设置为true，如果需要对外发布，则需要设置为false
   */
  "private": false,
  /*
  执行 npm pub 命令时哪些文件会被发布到npm仓库
   */
  "files": ["dist"],
  // 使用 require('xxx') 方式引入时, 引入的是这个文件
  "main": "./dist/my-button.umd.cjs",
  // 使用 import x from 'xxx' 方式引入组件时，引入的是这个文件
  "module": "./dist/my-button.js",
  // 组件ts类型声明文件的入口文件
  "types": "./dist/index.d.ts",
  /*
  定义外部可访问的资源。
  如果不定义，那么整个发布目录下的资源都是可以访问的。
  如果定义了，那只能访问定义的资源。
  ".": {
      "import": "./dist/my-button.js",
      "require": "./dist/my-button.umd.cjs"
    }
    上面这个配置表示当使用 import 和 require 方式引入时，分别引入的是哪个具体的js
   
   "./dist/style.css": "./dist/style.css"
   上面这个配置表示当使用 import 'xxx/dist/style.css'时访问的是 dist 目录下的 style.css文件

   定义了exports之后，如果想访问 import 'xx/dist/scss/index.scss' 会报错。 因为exports中未声明这个资源
   要么就添加这个资源的定义. 要么就删除exports定义，删除了exports定义之后，发布目录下的所有文件就都可以直接访问了
  */
  "exports": {
    ".": {
      "import": "./dist/my-button.js",
      "require": "./dist/my-button.umd.cjs"
    },
    "./dist/style.css": "./dist/style.css"
  },
  // 如果是打包成了一个可执行cli，那这里就指定这个cli的名称和cli文件的路径
  "bin": { "npm": "./cli.js" },
  // 提交bug的url和（或）邮件地址
  "bugs": {
    "url": "http://github.com/owner/project/issues",
    "email": "project@hostname.com"
  },
  // 指定执行publish命令时，会发布到哪个仓库. 该方式可以用于避免代码不小心被发布到公共仓库
  "publishConfig": {
    "registry": "http://localhost:2000"
  }
}
```

---

### 第七步：登录 npm 账号

```shell
npm login
npm pub
```

---

### 关于 pnpm 的 monorepo 的注意点

当你 pnpm 工作空间中有`demo-comp`项目，其他项目需要引用该项目，你通常是直接`pnpm add`进来，但如果`外部registry`中存在同名的包时，默认情况下会优先下载和使用`外部registry`中存在的包，此时有必要给项目加个前缀`@xx/yyy`之类的，但如果加了之后外部包还有同名包呢? 此时可以在工作空间根目录创建`.npmrc`文件，并设置`prefer-workspace-packages`为`true`, 那么此时`工作空间`中的包将会优先于`外部registry`中的包。配置详见[官网 prefer-workspace-packages](https://pnpm.io/zh/npmrc#prefer-workspace-packages), 那么实际上就是做两点：

- 给工作空间的项目加上特殊前缀。如: `@xxx/yyy`
- 在工作空间根目录创建`.npmrc`文件，并指定`prefer-workspace-packages`为`true`

更新一种添加 workspace 包的方式：

```shell
pnpm add workspace:npm-my-button@* -F web
```

这种方式能够在不修改配置的情况下，也能明确的让 pnpm 知道，你要添加的是 pnpm 中 workspace 里面的包，而非外部 npm 库中的包。

将`npm-my-button`替换成你 workspace 中的包名即可。

### 个人关于`monorepo`分包命名建议

```yaml
packages:
  # 存放实际的项目
  - "projects/**"
  # 存放公共的ui组件和util组件
  - "packages/**"
  # 存放ui组件和util组件的使用文档
  - "packages-docs/**"
  # 存放公共ui组件和util组件的使用示例
  - "examples/**"
  # 排除目录
  - "!**/test/**"
```

### 参考资料

[设置 NPM Registry 的 4 种姿势](https://zhuanlan.zhihu.com/p/487854862)

https://vitejs.cn/vite3-cn/guide/build.html#library-mode

[pnpm 官网 prefer-workspace-packages 配置属性说明](https://pnpm.io/zh/npmrc#prefer-workspace-packages)
