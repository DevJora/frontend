
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/frontend/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/frontend"
  },
  {
    "renderMode": 2,
    "route": "/frontend/info"
  },
  {
    "renderMode": 2,
    "route": "/frontend/login"
  },
  {
    "renderMode": 2,
    "route": "/frontend/register"
  },
  {
    "renderMode": 2,
    "route": "/frontend/success"
  },
  {
    "renderMode": 2,
    "route": "/frontend/contact"
  },
  {
    "renderMode": 2,
    "redirectTo": "/frontend/dashboard/profile",
    "route": "/frontend/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/home"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/profile"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optima1"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum2"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum3"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum4"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum5"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum6"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum7"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum8"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimum9"
  },
  {
    "renderMode": 2,
    "route": "/frontend/dashboard/optimumX"
  }
],
  assets: {
    'index.csr.html': {size: 26316, hash: '8c8491ebcf22c23fbe0b432876fb54235d6c75ef8049b088c617671f9c4078fa', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17312, hash: '581424759285281e2ca5a49f05dab7993ce1d07746e983c349c082985ad8a31e', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 42283, hash: 'ac5fc0cb97731e3d3d7de5417e58a7d3a6d201dcfecb91e986abd2cedc6cdaf3', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'info/index.html': {size: 41464, hash: 'b9d3cd02de6676cb1536699789e1f13a9c78d6a1e764aa16310a8ebbf69c9c10', text: () => import('./assets-chunks/info_index_html.mjs').then(m => m.default)},
    'success/index.html': {size: 38129, hash: '590f09782a22fbb330ced6724f3721cb3da82c792822c0eabd1302f6fc283ca7', text: () => import('./assets-chunks/success_index_html.mjs').then(m => m.default)},
    'dashboard/home/index.html': {size: 36218, hash: 'a6744e6093eb87307e4571527dc588dce4a6d70defbe6a77ff1bc8265af829ee', text: () => import('./assets-chunks/dashboard_home_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 81917, hash: '49380f9447a48390f6bbfbff478fe33944b160b06e1daa9d697c7ef97a7a4e0b', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'dashboard/profile/index.html': {size: 36218, hash: '27c2a9d5dd04d573abb4bd17ab4721141b57f715891ea6958b81f7cdf4d1b066', text: () => import('./assets-chunks/dashboard_profile_index_html.mjs').then(m => m.default)},
    'dashboard/optima1/index.html': {size: 36218, hash: 'a6744e6093eb87307e4571527dc588dce4a6d70defbe6a77ff1bc8265af829ee', text: () => import('./assets-chunks/dashboard_optima1_index_html.mjs').then(m => m.default)},
    'dashboard/optimum2/index.html': {size: 36218, hash: '94f6a0ff1dd0e22f472600c03e04b8c0a390e271c60cf61949b868b345d25406', text: () => import('./assets-chunks/dashboard_optimum2_index_html.mjs').then(m => m.default)},
    'dashboard/optimum3/index.html': {size: 36218, hash: '27c2a9d5dd04d573abb4bd17ab4721141b57f715891ea6958b81f7cdf4d1b066', text: () => import('./assets-chunks/dashboard_optimum3_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 39131, hash: '72c0994b0205693ed3e8709fd910f34e363b373d0f7d4569532cad7cc2202617', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/optimum4/index.html': {size: 36218, hash: '2697fad6e37380c9a9e8517108c70c33e07db2466a790e9b3a822b55d508eb56', text: () => import('./assets-chunks/dashboard_optimum4_index_html.mjs').then(m => m.default)},
    'dashboard/optimum5/index.html': {size: 36218, hash: '94f6a0ff1dd0e22f472600c03e04b8c0a390e271c60cf61949b868b345d25406', text: () => import('./assets-chunks/dashboard_optimum5_index_html.mjs').then(m => m.default)},
    'dashboard/optimum6/index.html': {size: 36218, hash: '208bc617a92c0d0cdbd18c1b84e7cab8182bc07dfe2c92aa4fda43aaf7f988c2', text: () => import('./assets-chunks/dashboard_optimum6_index_html.mjs').then(m => m.default)},
    'dashboard/optimum7/index.html': {size: 36218, hash: '9fff051029d2aba0a252d7631fa2da92f1029c83e0ea72c47ce88b8a9fe0056d', text: () => import('./assets-chunks/dashboard_optimum7_index_html.mjs').then(m => m.default)},
    'dashboard/optimum8/index.html': {size: 36218, hash: '2697fad6e37380c9a9e8517108c70c33e07db2466a790e9b3a822b55d508eb56', text: () => import('./assets-chunks/dashboard_optimum8_index_html.mjs').then(m => m.default)},
    'dashboard/optimumX/index.html': {size: 36218, hash: 'b028fd8ee2f20bdfb9fdc5516ba15b4c26fb17c6e75e7ac7ce02dbd03fea999d', text: () => import('./assets-chunks/dashboard_optimumX_index_html.mjs').then(m => m.default)},
    'dashboard/optimum9/index.html': {size: 36218, hash: 'a6744e6093eb87307e4571527dc588dce4a6d70defbe6a77ff1bc8265af829ee', text: () => import('./assets-chunks/dashboard_optimum9_index_html.mjs').then(m => m.default)},
    'contact/index.html': {size: 39296, hash: 'c86b274bbcc61e20ac656703e049bda34e3439ac85c5b7cb8cc636845c883848', text: () => import('./assets-chunks/contact_index_html.mjs').then(m => m.default)},
    'styles-4MLJPAVF.css': {size: 136023, hash: 's2HIbgsz8Lc', text: () => import('./assets-chunks/styles-4MLJPAVF_css.mjs').then(m => m.default)}
  },
};
