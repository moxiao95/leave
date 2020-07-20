//index.js

Page({
	data: {
		accountNumber: '',
		password: '',
		type: true,
		items: [
			{value: 'student', name: '学生', checked: 'true'},
			{value: 'teacher', name: '老师'},
		],
	},

	forgetPassword() {

	},

	toLogin() {
		wx.switchTab({
			url: '../Leave/Leave',
		});
	},

	radioChange(e) {
		let value = e.detail.value == 'student' ? true : false;
		this.setData({
			type: value,
		});
		let app = getApp();
		if (this.data.type) {
			app.globalData.sOrt = true;
		} else {
			app.globalData.sOrt = false;
		}
	},
});
