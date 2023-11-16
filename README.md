# Vue 3 + TypeScript + Vite + SSR + Koa

使用vite构建并使用koa部署服务

## 起步

- 安装依赖 `pnpm i`

- 运行服务 `pnpm dev:server`

- 构建 `pnpm build`

- 部署 `pnpm start`

## 特性

- 数据预取
通过vue serverprefetch生命周期 在服务器内执行请求，并将输入传给pinia,与此同时，防止服务器与客户端pinia数据不一致，按照Pinia官方文档说法格式化pinia.state.value并于客户端时取回。

## 注意事项

在serverprefetch执行的请求，请确保在客户端mounted内确认一遍是否存在，不存在则需要再去请求回来。