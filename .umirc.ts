import { defineConfig } from 'umi';

export default defineConfig({
  hash: true,
  history: {
    type: 'hash',
  },
  proxy: {
    "/f": {
      target: "http://nas.lurenjia.in",
    }
  }
}); //export default ({})
