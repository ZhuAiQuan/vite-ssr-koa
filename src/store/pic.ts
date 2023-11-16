import { defineStore } from "pinia";
import { ref } from 'vue'

export default defineStore('img', () => {
  const img = ref('')

  async function getImg() {
    const { imgurl } = await fetch('https://api.uomg.com/api/rand.img1').then(res => res.json());
    img.value = imgurl;
  }

  return {
    img,
    getImg
  }
})