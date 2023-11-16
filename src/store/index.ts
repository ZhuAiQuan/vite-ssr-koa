import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useIndex = defineStore("index", () => {
  const info = reactive({
    name: 'ssr pinia test',
    data: []
  });

  function changeInfo(name: string) {
    info.name = name;
  }
  async function requestTest() {
    const { data: _data } = await fetch('https://api.uomg.com/api/rand.music?sort=热歌榜&format=json').then((res) => res.json());
    info.data = [_data];
    console.log(_data)
  }

  return {
    info,
    changeInfo,
    requestTest,
  }
})