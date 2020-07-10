//index.js

Page({
	data: {
		accountNumber: '',
		password: '',
	},

	forgetPassword() {

	},

	toLogin() {
		
		wx.switchTab({
			url: '../Leave/Leave',
		});
	},
});
