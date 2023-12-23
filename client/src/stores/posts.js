import { defineStore } from 'pinia';

export const usePostStore = defineStore({
  id: 'posts',
  state: () => ({
    list: []
  })
});
