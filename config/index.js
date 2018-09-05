const url = {
	development: {
		targetUrl: 'http://customer.dev-zt.bnq.com.cn',
		apiUrl: 'http://localhost:8089',
		apiUrlFilter: '/customerAdmin',
		authUrl: 'http://auth.dev-zt.bnq.com.cn',
		authUrlFilter: '/auth',
		port: 8089,
		autoOpenBrowser: true, 
		proxyFilter: '/customerAdmin',
        addressUrl:'http://customer.dev-zt.bnq.com.cn/areas/district',
	},
	prodDev: {
		apiUrl: 'http://192.168.200.54:8080/',
		apiUrlFilter: '/productAdmin',
		addressUrl:'http://customer.dev-zt.bnq.com.cn/areas/district',
		authUrl: 'http://auth.dev-zt.bnq.com.cn',
		authUrlFilter: '/auth'
	},
	uat: {
		apiUrl: 'http://customer.dev-zt.bnq.com.cn',
		apiUrlFilter: '/customerAdmin',
		addressUrl:'http://customer.dev-zt.bnq.com.cn/areas/district',
		authUrl: 'http://auth.dev-zt.bnq.com.cn',
		authUrlFilter: '/auth'
	},
	production: {
		apiUrl: 'http://customer.dev-zt.bnq.com.cn',
		apiUrlFilter: '/customerAdmin',
		addressUrl:'http://customer.dev-zt.bnq.com.cn/areas/district',
		authUrl: 'http://auth.dev-zt.bnq.com.cn',
		authUrlFilter: '/auth'
  }
}

module.exports = url;