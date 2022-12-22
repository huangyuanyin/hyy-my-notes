import{aP as p,O as o,P as i,Q as n,aa as s,ac as e,aQ as t,z as l}from"./framework.e958797c.js";const c={},u=t(`<h3 id="步骤预览" tabindex="-1"><a class="header-anchor" href="#步骤预览" aria-hidden="true">#</a> 步骤预览：</h3><ol><li>新建项目并开发组件</li><li>编写 index.ts 文件，指明入口</li><li>配置 vite 库模式</li><li>打包</li><li>配置 package.json</li><li>测试</li><li>申请/登录 npm 账号</li><li>发布组件</li></ol><hr><h3 id="第一步-新建项目并开发组件" tabindex="-1"><a class="header-anchor" href="#第一步-新建项目并开发组件" aria-hidden="true">#</a> 第一步：新建项目并开发组件</h3><ul><li><p>使用 pnpm 新建一个空项目，并使用 pnpm 的 monorepo 功能，使这个项目作为总的工作空间</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>使用 vite 在 这个工作空间创建一个 vue 项目</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> create vite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>注：可能会遇到报错：&#39;create&#39; 不是内部或外部命令，也不是可运行的程序或批处理文件。</p><p>解决：升级版本至 7.x</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> <span class="token parameter variable">-g</span> @pnpm/exe
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div></li><li><p>编写组件，并导出组件</p></li><li><p>打包，并测试</p></li></ul><p>启用 pnpm 的 monorepo 功能，只需要在项目根目录创建<code>pnpm-workspace.yaml</code>文件，并指定包含的目录。</p><p><code>pnpm-workspace.yaml</code></p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">packages</span><span class="token punctuation">:</span>
  <span class="token comment"># 所有在 packages/ 和 components/ 子目录下的 package（包含的目录）</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;projects/**&quot;</span>
  <span class="token comment"># 排除的目录</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;!**/test/**&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="第三步-vite-配置库模式" tabindex="-1"><a class="header-anchor" href="#第三步-vite-配置库模式" aria-hidden="true">#</a> 第三步：vite 配置库模式</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> @types/node vite-plugin-dts <span class="token parameter variable">-D</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// vite.config.js</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> defineConfig <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;vite&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> vue <span class="token keyword">from</span> <span class="token string">&quot;@vitejs/plugin-vue&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token punctuation">{</span> resolve <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&quot;path&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> dts <span class="token keyword">from</span> <span class="token string">&quot;vite-plugin-dts&quot;</span><span class="token punctuation">;</span>

<span class="token comment">// https://vitejs.dev/config/</span>
<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token function">defineConfig</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
  plugins<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token function">vue</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">dts</span><span class="token punctuation">(</span><span class="token punctuation">{</span> include<span class="token operator">:</span> <span class="token string">&quot;./lib&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 配置库模式</span>
  build<span class="token operator">:</span> <span class="token punctuation">{</span>
    lib<span class="token operator">:</span> <span class="token punctuation">{</span>
      entry<span class="token operator">:</span> <span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span> <span class="token string">&quot;lib/index.ts&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
      name<span class="token operator">:</span> <span class="token string">&quot;HyyDemoComp&quot;</span><span class="token punctuation">,</span>
      <span class="token comment">// the proper extensions will be added</span>
      fileName<span class="token operator">:</span> <span class="token string">&quot;hyy-demo-comp&quot;</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    rollupOptions<span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token comment">// 确保外部化处理那些你不想打包进库的依赖</span>
      external<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;vue&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
      output<span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token comment">// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量</span>
        globals<span class="token operator">:</span> <span class="token punctuation">{</span>
          vue<span class="token operator">:</span> <span class="token string">&quot;Vue&quot;</span><span class="token punctuation">,</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="第五步-配置-package-json" tabindex="-1"><a class="header-anchor" href="#第五步-配置-package-json" aria-hidden="true">#</a> 第五步：配置 package.json</h3><p>package.json 配置说明：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token comment">/*
   1. 用于定义package.json文件和该文件所在目录根目录中.js文件和无拓展名文件的处理方式。值为&#39;moduel&#39;则当作es模块处理；值为&#39;commonjs&#39;则被当作commonJs模块处理
   2. 目前node默认的是如果pacakage.json没有定义type字段，则按照commonJs规范处理
   3. node官方建议包的开发者明确指定package.json中type字段的值
   4. 无论package.json中的type字段为何值，.mjs的文件都按照es模块来处理，.cjs的文件都按照commonJs模块来处理
    */</span>
  <span class="token property">&quot;type&quot;</span><span class="token operator">:</span> <span class="token string">&quot;module&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">/*
   如果需要避免这个包被发布到公共仓库上去，则可以设置为true，如果需要对外发布，则需要设置为false
   */</span>
  <span class="token property">&quot;private&quot;</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token comment">/*
  执行 npm pub 命令时哪些文件会被发布到npm仓库
   */</span>
  <span class="token property">&quot;files&quot;</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">&quot;dist&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用 require(&#39;xxx&#39;) 方式引入时, 引入的是这个文件</span>
  <span class="token property">&quot;main&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/my-button.umd.cjs&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 使用 import x from &#39;xxx&#39; 方式引入组件时，引入的是这个文件</span>
  <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/my-button.js&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">// 组件ts类型声明文件的入口文件</span>
  <span class="token property">&quot;types&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/index.d.ts&quot;</span><span class="token punctuation">,</span>
  <span class="token comment">/*
  定义外部可访问的资源。
  如果不定义，那么整个发布目录下的资源都是可以访问的。
  如果定义了，那只能访问定义的资源。
  &quot;.&quot;: {
      &quot;import&quot;: &quot;./dist/my-button.js&quot;,
      &quot;require&quot;: &quot;./dist/my-button.umd.cjs&quot;
    }
    上面这个配置表示当使用 import 和 require 方式引入时，分别引入的是哪个具体的js
   
   &quot;./dist/style.css&quot;: &quot;./dist/style.css&quot;
   上面这个配置表示当使用 import &#39;xxx/dist/style.css&#39;时访问的是 dist 目录下的 style.css文件

   定义了exports之后，如果想访问 import &#39;xx/dist/scss/index.scss&#39; 会报错。 因为exports中未声明这个资源
   要么就添加这个资源的定义. 要么就删除exports定义，删除了exports定义之后，发布目录下的所有文件就都可以直接访问了
  */</span>
  <span class="token property">&quot;exports&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;.&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">&quot;import&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/my-button.js&quot;</span><span class="token punctuation">,</span>
      <span class="token property">&quot;require&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/my-button.umd.cjs&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">&quot;./dist/style.css&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./dist/style.css&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 如果是打包成了一个可执行cli，那这里就指定这个cli的名称和cli文件的路径</span>
  <span class="token property">&quot;bin&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span> <span class="token property">&quot;npm&quot;</span><span class="token operator">:</span> <span class="token string">&quot;./cli.js&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 提交bug的url和（或）邮件地址</span>
  <span class="token property">&quot;bugs&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;url&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://github.com/owner/project/issues&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;email&quot;</span><span class="token operator">:</span> <span class="token string">&quot;project@hostname.com&quot;</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token comment">// 指定执行publish命令时，会发布到哪个仓库. 该方式可以用于避免代码不小心被发布到公共仓库</span>
  <span class="token property">&quot;publishConfig&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;registry&quot;</span><span class="token operator">:</span> <span class="token string">&quot;http://localhost:2000&quot;</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="第七步-登录-npm-账号" tabindex="-1"><a class="header-anchor" href="#第七步-登录-npm-账号" aria-hidden="true">#</a> 第七步：登录 npm 账号</h3><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> login
<span class="token function">npm</span> pub
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr><h3 id="关于-pnpm-的-monorepo-的注意点" tabindex="-1"><a class="header-anchor" href="#关于-pnpm-的-monorepo-的注意点" aria-hidden="true">#</a> 关于 pnpm 的 monorepo 的注意点</h3>`,21),r=n("code",null,"demo-comp",-1),d=n("code",null,"pnpm add",-1),m=n("code",null,"外部registry",-1),v=n("code",null,"外部registry",-1),k=n("code",null,"@xx/yyy",-1),b=n("code",null,".npmrc",-1),h=n("code",null,"prefer-workspace-packages",-1),g=n("code",null,"true",-1),q=n("code",null,"工作空间",-1),y=n("code",null,"外部registry",-1),_={href:"https://pnpm.io/zh/npmrc#prefer-workspace-packages",target:"_blank",rel:"noopener noreferrer"},f=t(`<ul><li>给工作空间的项目加上特殊前缀。如: <code>@xxx/yyy</code></li><li>在工作空间根目录创建<code>.npmrc</code>文件，并指定<code>prefer-workspace-packages</code>为<code>true</code></li></ul><p>更新一种添加 workspace 包的方式：</p><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">pnpm</span> <span class="token function">add</span> workspace:npm-my-button@* <span class="token parameter variable">-F</span> web
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>这种方式能够在不修改配置的情况下，也能明确的让 pnpm 知道，你要添加的是 pnpm 中 workspace 里面的包，而非外部 npm 库中的包。</p><p>将<code>npm-my-button</code>替换成你 workspace 中的包名即可。</p><h3 id="个人关于monorepo分包命名建议" tabindex="-1"><a class="header-anchor" href="#个人关于monorepo分包命名建议" aria-hidden="true">#</a> 个人关于<code>monorepo</code>分包命名建议</h3><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">packages</span><span class="token punctuation">:</span>
  <span class="token comment"># 存放实际的项目</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;projects/**&quot;</span>
  <span class="token comment"># 存放公共的ui组件和util组件</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;packages/**&quot;</span>
  <span class="token comment"># 存放ui组件和util组件的使用文档</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;packages-docs/**&quot;</span>
  <span class="token comment"># 存放公共ui组件和util组件的使用示例</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;examples/**&quot;</span>
  <span class="token comment"># 排除目录</span>
  <span class="token punctuation">-</span> <span class="token string">&quot;!**/test/**&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="参考资料" tabindex="-1"><a class="header-anchor" href="#参考资料" aria-hidden="true">#</a> 参考资料</h3>`,8),x={href:"https://zhuanlan.zhihu.com/p/487854862",target:"_blank",rel:"noopener noreferrer"},j={href:"https://vitejs.cn/vite3-cn/guide/build.html#library-mode",target:"_blank",rel:"noopener noreferrer"},w={href:"https://pnpm.io/zh/npmrc#prefer-workspace-packages",target:"_blank",rel:"noopener noreferrer"};function N(z,C){const a=l("ExternalLinkIcon");return o(),i("div",null,[u,n("p",null,[s("当你 pnpm 工作空间中有"),r,s("项目，其他项目需要引用该项目，你通常是直接"),d,s("进来，但如果"),m,s("中存在同名的包时，默认情况下会优先下载和使用"),v,s("中存在的包，此时有必要给项目加个前缀"),k,s("之类的，但如果加了之后外部包还有同名包呢? 此时可以在工作空间根目录创建"),b,s("文件，并设置"),h,s("为"),g,s(", 那么此时"),q,s("中的包将会优先于"),y,s("中的包。配置详见"),n("a",_,[s("官网 prefer-workspace-packages"),e(a)]),s(", 那么实际上就是做两点：")]),f,n("p",null,[n("a",x,[s("设置 NPM Registry 的 4 种姿势"),e(a)])]),n("p",null,[n("a",j,[s("https://vitejs.cn/vite3-cn/guide/build.html#library-mode"),e(a)])]),n("p",null,[n("a",w,[s("pnpm 官网 prefer-workspace-packages 配置属性说明"),e(a)])])])}const B=p(c,[["render",N],["__file","使用vite开发组件并发布到npm.html.vue"]]);export{B as default};
