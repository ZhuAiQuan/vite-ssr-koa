import { defineStore } from "pinia";
import { reactive } from "vue";

export default defineStore("music", () => {
  const music = reactive({
    url: "",
    name: "",
    picurl: "",
    artistsname: "",
    avatarurl: "",
    nickname: "",
    content: "",
  });

  async function getMusicInfo() {
    try {
      const { data } = await fetch(
        "https://api.uomg.com/api/comments.163"
      ).then((res) => res.json());

      Object.assign(music, data);
    } catch {
      //
    }
  }

  return {
    music,
    getMusicInfo,
  };
});
