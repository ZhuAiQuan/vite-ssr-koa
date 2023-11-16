import { createSSRApp } from 'vue'
import './style.css'
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

export function createSSR() {
  const app = createSSRApp(App);
  const store = createPinia();
  const initialState: {
    pinia: null | typeof store.state.value
  } = {
    pinia: null
  };
  app.use(router).use(store);
  if (import.meta.env.SSR) {
    initialState.pinia = store.state.value
  } else {
    store.state.value = window.__INITIAL_STATE__
  }
  return {
    app,
    router,
    store,
    initialState,
  }
}
