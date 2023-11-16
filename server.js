import Koa from "koa";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const resolve = (p) => path.resolve(__dirname, p);

async function createServerApp(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const app = new Koa();
  const indexProd = isProd
    ? fs.readFileSync(resolve("./dist/client/index.html"), "utf-8")
    : fs.readFileSync(resolve("index.html"), "utf-8");
  const manifest = isProd
    ? fs.readFileSync(resolve("./dist/client/ssr-manifest.json"), "utf-8")
    : {};
  let vite;
  if (isProd) {
    // 压缩
    app.use((await import("koa-compress")).default());
    // 设置静态目录
    app.use(
      (await import("koa-static")).default(resolve("./dist/client"), {
        index: false,
      })
    );
  } else {
    // 开发环境
    vite = await (
      await import("vite")
    ).createServer({
      root,
      server: {
        middlewareMode: "ssr",
        watch: {
          usePolling: true,
          interval: 100,
        },
        // hmr: {
        //   port: hmrPort,
        // },
      },
    });
    app.use((await import("koa-connect")).default(vite.middlewares));
  }
  app.use(async (ctx) => {
    try {
      let template, render;
      if (isProd) {
        template = indexProd;
        render = (await import("./dist/server/entry-server.js")).render;
      } else {
        template = await vite.transformIndexHtml(ctx.originalUrl, indexProd);
        render = (await vite.ssrLoadModule("/src/entry-server.ts")).render;
      }
      const {
        html: appHtml,
        preloadLinks,
        piniaState,
      } = await render(ctx.originalUrl, manifest);
      const html = template
        .replace("<!--ssr-outlet-->", appHtml)
        .replace("<!--preload-links-->", preloadLinks)
        .replace("<!--pinia-state-->", piniaState);

      ctx.type = "text/html";
      ctx.body = html;
    } catch (e) {
      // 兜底 防止报错直接崩溃
      vite && vite.ssrFixStacktrace(e);
      ctx.status(500).end(e.stack);
    }
  });
  return {
    app,
  };
}

createServerApp().then(({ app }) => {
  app.listen(2000, () => {
    console.log(`[ssr server] run http://localhost:2000`);
  });
});
