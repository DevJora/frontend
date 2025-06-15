
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
    'index.csr.html': {size: 26316, hash: 'd9f6a0807dc2f2314f7e6ce8ca6323294c528034d3e8d31b25d3b934c2e32fa4', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17312, hash: 'f026e4269a55471e286a43edd68cc517d9e8d13738f85d51dd5161c8b453c084', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'info/index.html': {size: 41464, hash: '095308443c362610fa04c8c9e41d7ed526331a1a1bb2e108da38fced91dc1921', text: () => import('./assets-chunks/info_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 82031, hash: '6d78dd85b93280788fb932319f463e0f5a09c79da4a74bbc52006639914fd41e', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'success/index.html': {size: 38133, hash: '6af885d4c7c48f1e261dd8fedd7cd9663c54cc6187092fa968870da75f14682e', text: () => import('./assets-chunks/success_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 39131, hash: '7912ed2eb5159a7013a89c60318808a4e284908c12ed5fdc663e8463e7fb59d3', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/home/index.html': {size: 36218, hash: 'd3a17d05ca39a6836062a9e1417c6928e7fcc0755af1cef72c55c0aef9338842', text: () => import('./assets-chunks/dashboard_home_index_html.mjs').then(m => m.default)},
    'dashboard/profile/index.html': {size: 36218, hash: 'd952571bde71724508a7dfe3b6d4b27e0f88a8ad227b85c5f0668a8f8ae20809', text: () => import('./assets-chunks/dashboard_profile_index_html.mjs').then(m => m.default)},
    'dashboard/optima1/index.html': {size: 36218, hash: '56339ba69e1c723d1ab2606b809105d3bc7a766a68e4ae364c1f573f1ea3de66', text: () => import('./assets-chunks/dashboard_optima1_index_html.mjs').then(m => m.default)},
    'dashboard/optimum2/index.html': {size: 36218, hash: '0582b2dbcb21e3afd53c68e28b61288769104c82051c3ca330e54d4829085d27', text: () => import('./assets-chunks/dashboard_optimum2_index_html.mjs').then(m => m.default)},
    'dashboard/optimum3/index.html': {size: 36218, hash: '6c123e280cb27c4a6b8c3880965071cc18b098ee169786fd18d795217a0daf26', text: () => import('./assets-chunks/dashboard_optimum3_index_html.mjs').then(m => m.default)},
    'dashboard/optimum4/index.html': {size: 36218, hash: 'd3a17d05ca39a6836062a9e1417c6928e7fcc0755af1cef72c55c0aef9338842', text: () => import('./assets-chunks/dashboard_optimum4_index_html.mjs').then(m => m.default)},
    'dashboard/optimum6/index.html': {size: 36218, hash: '56339ba69e1c723d1ab2606b809105d3bc7a766a68e4ae364c1f573f1ea3de66', text: () => import('./assets-chunks/dashboard_optimum6_index_html.mjs').then(m => m.default)},
    'dashboard/optimum5/index.html': {size: 36218, hash: 'f8aad6c8424d4db86e0fa2ce73e1b0a98e711250e1067dbc0c227ff9492c54e8', text: () => import('./assets-chunks/dashboard_optimum5_index_html.mjs').then(m => m.default)},
    'dashboard/optimum7/index.html': {size: 36218, hash: '6c123e280cb27c4a6b8c3880965071cc18b098ee169786fd18d795217a0daf26', text: () => import('./assets-chunks/dashboard_optimum7_index_html.mjs').then(m => m.default)},
    'dashboard/optimum8/index.html': {size: 36218, hash: '8681b319633faca1d96c22adc8db0b6edaa826ccfd0027ef4c3bf158b16146e1', text: () => import('./assets-chunks/dashboard_optimum8_index_html.mjs').then(m => m.default)},
    'dashboard/optimum9/index.html': {size: 36218, hash: 'f8aad6c8424d4db86e0fa2ce73e1b0a98e711250e1067dbc0c227ff9492c54e8', text: () => import('./assets-chunks/dashboard_optimum9_index_html.mjs').then(m => m.default)},
    'dashboard/optimumX/index.html': {size: 36218, hash: 'b134766d4624160b5d42428083777563b72613666c44aecc043030a9c42171c9', text: () => import('./assets-chunks/dashboard_optimumX_index_html.mjs').then(m => m.default)},
    'index.html': {size: 42288, hash: '509d393a7b67bc1bd1737451a4e40cc5c4eb71b19db354b80e70ce89f5f66e49', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-NWVYYYUA.css': {size: 134886, hash: 'dnDn9vAvZc4', text: () => import('./assets-chunks/styles-NWVYYYUA_css.mjs').then(m => m.default)}
  },
};
