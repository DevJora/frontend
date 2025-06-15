
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
    'index.csr.html': {size: 26316, hash: '98bd486376da240b84de04577573199e225706be61cdd0847fc854cb11c584e9', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17312, hash: '4f8b54353537a8a6817f66c6e1c41c1d05874d5170a6df2518a86938a4e9ef01', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'info/index.html': {size: 41464, hash: '8881c54f7cea0b3446f5652c1ad4557f9c684d470ea495c1bcaf9ad961df3e4c', text: () => import('./assets-chunks/info_index_html.mjs').then(m => m.default)},
    'register/index.html': {size: 82031, hash: '1114b9b7f2de20fb0add71cc0fc5cc54fde4aa7c66fea75caa3d41c28bbf7964', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'dashboard/home/index.html': {size: 36218, hash: '7fbfb8d545e16248f58f7f8250e9483b00bfa94e038ec085a59b56e5fd333b08', text: () => import('./assets-chunks/dashboard_home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 39131, hash: 'e0627da309f01ce5f08888998fa877328fef0929776d158174d70ab556a421ed', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'dashboard/profile/index.html': {size: 36218, hash: 'c615d1fea23342b857c3bcfa49fcfcd1c207c7d9f6fe31b25450111a5cd23a67', text: () => import('./assets-chunks/dashboard_profile_index_html.mjs').then(m => m.default)},
    'dashboard/optima1/index.html': {size: 36218, hash: 'f09d201d98ae99cb63c73823250e91b86a7a8df34b14ee7bca1f8b96b0298563', text: () => import('./assets-chunks/dashboard_optima1_index_html.mjs').then(m => m.default)},
    'dashboard/optimum2/index.html': {size: 36218, hash: 'fe1522431285df45981f404af3bd4be70693e97d34132c52b32e3bbbe52c2b27', text: () => import('./assets-chunks/dashboard_optimum2_index_html.mjs').then(m => m.default)},
    'dashboard/optimum3/index.html': {size: 36218, hash: '7fbfb8d545e16248f58f7f8250e9483b00bfa94e038ec085a59b56e5fd333b08', text: () => import('./assets-chunks/dashboard_optimum3_index_html.mjs').then(m => m.default)},
    'dashboard/optimum4/index.html': {size: 36218, hash: '8a8c3b38c1cfcef35ff0b5bb66cf3c7351b4bf66cb24b28dabbd78c2d5fadbc3', text: () => import('./assets-chunks/dashboard_optimum4_index_html.mjs').then(m => m.default)},
    'dashboard/optimum5/index.html': {size: 36218, hash: 'c615d1fea23342b857c3bcfa49fcfcd1c207c7d9f6fe31b25450111a5cd23a67', text: () => import('./assets-chunks/dashboard_optimum5_index_html.mjs').then(m => m.default)},
    'dashboard/optimum6/index.html': {size: 36218, hash: 'e75f0575010498b6d9712f0de27b7e80d66cbce8de6ff40fd06e0dd005fe080a', text: () => import('./assets-chunks/dashboard_optimum6_index_html.mjs').then(m => m.default)},
    'dashboard/optimum7/index.html': {size: 36218, hash: 'fe1522431285df45981f404af3bd4be70693e97d34132c52b32e3bbbe52c2b27', text: () => import('./assets-chunks/dashboard_optimum7_index_html.mjs').then(m => m.default)},
    'index.html': {size: 42288, hash: 'a39fab0943086f9c5d8fd35ec33d088a9a86b8afebe7e9e1283f01dec6414683', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'dashboard/optimum9/index.html': {size: 36218, hash: '8a8c3b38c1cfcef35ff0b5bb66cf3c7351b4bf66cb24b28dabbd78c2d5fadbc3', text: () => import('./assets-chunks/dashboard_optimum9_index_html.mjs').then(m => m.default)},
    'dashboard/optimum8/index.html': {size: 36218, hash: 'f0b9bc5ddbc1fb8aa3a6ceb1657e69a975843807f4d81bd8c066b59f8b11cd56', text: () => import('./assets-chunks/dashboard_optimum8_index_html.mjs').then(m => m.default)},
    'success/index.html': {size: 38129, hash: 'bf5275e13e636441d01dafe7e5e9a38577ff6bd0c2f4d7b89f6f8f19e3dbcfc1', text: () => import('./assets-chunks/success_index_html.mjs').then(m => m.default)},
    'dashboard/optimumX/index.html': {size: 36218, hash: 'f09d201d98ae99cb63c73823250e91b86a7a8df34b14ee7bca1f8b96b0298563', text: () => import('./assets-chunks/dashboard_optimumX_index_html.mjs').then(m => m.default)},
    'styles-NWVYYYUA.css': {size: 134886, hash: 'dnDn9vAvZc4', text: () => import('./assets-chunks/styles-NWVYYYUA_css.mjs').then(m => m.default)}
  },
};
