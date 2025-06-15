
export default {
  basePath: '/frontend/',
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
