<script setup lang="ts">
import { onServerPrefetch, onMounted } from 'vue';
import useMusic from '../../store/music';

const musicStore = useMusic();

onMounted(() => {
  if (!musicStore.music.url) musicStore.getMusicInfo();
})
onServerPrefetch(async() => {
  try {
    musicStore.getMusicInfo()
  } catch {
    // 
  }
  
})
</script>

<template>
  <div>about me
    <h1>{{ musicStore.music.name }}</h1>
    <img :src="musicStore.music.picurl" alt="" style="max-width: 100px;">
    <h3>{{ musicStore.music.content }}</h3>
    <audio :src="musicStore.music.url" controls></audio>
  </div>
</template>