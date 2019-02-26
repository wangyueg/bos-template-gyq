const url = {
	development: {
		targetUrl: 'http://customer.dev-zt.bnq.com.cn',
		apiUrl: 'http://web.futureshop.dev-zt.bnq.com.cn:8088',
		apiUrlFilter: '/customerAdmin',
		authUrl: 'http://auth.dev-zt.bnq.com.cn',
		authUrlFilter: '/auth',
		port: 8088,
		autoOpenBrowser: true, 
		proxyFilter: '/customerAdmin',
        addressUrl:'http://web.futureshop.dev-zt.bnq.com.cn:8088/areas/district',
	},
	prodDev: {
		apiUrl: 'http://192.168.200.54:8080/',
		apiUrlFilter: '/productAdmin',
		addressUrl:'http://customer.dev-zt.bnq.com.cn/areas/district',
		authUrl: 'http://auth.dev-zt.bnq.com.cn',
		authUrlFilter: '/auth'
	},
	test: {
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