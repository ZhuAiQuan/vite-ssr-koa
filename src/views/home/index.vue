<script setup lang="ts">
import { ref, onMounted, onServerPrefetch } from "vue";
import { useIndex } from "../../store/index.ts";

const store = useIndex();
const { changeInfo, requestTest } = store;

const data = ref("yyds");
const text = ref("");

onMounted(() => {
  data.value = "test yyds";
  console.log(store.info);
});

onServerPrefetch(async () => {
  const data = await fetch(
    "https://api.uomg.com/api/rand.qinghua?format=json"
  ).then((res) => res.json());
  text.value = data.content;
  await requestTest();
});
</script>

<template>
  <div>
    <div>home page 123456 {{ data }} vite</div>
    <p>{{ store.info.name }}</p>
    <button @click="changeInfo('vite')">test</button>
    <!-- <div v-for="item in list" :key="item">{{  item }}</div> -->
    <h1>request 请求测试</h1>
    <label>随机土味情话</label>
    <p>{{ text }}</p>
    <div v-for="item in store.info.data" :key="item.name">
      <a :href="item.url">
        <img :src="item.picurl" alt="cover" style="width: 100px" />
        <div>
          <h3>{{ item.name }}</h3>
          <h4>{{ item.artistsname }}</h4>
        </div>
      </a>
    </div>
  </div>
</template>
