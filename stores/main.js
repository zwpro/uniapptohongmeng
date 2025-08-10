import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    count: 0,
		token: '',
		version: '',
		uniPlatform: '',
  }),
  actions: {
    increment() {
      this.count++;
    },
  },
});