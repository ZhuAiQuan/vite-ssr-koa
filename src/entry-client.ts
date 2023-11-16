import { createSSR } from './main';

const { app, router } = createSSR();

router.isReady().then(() => app.mount('#app'))
