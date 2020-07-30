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

	// 修改密码
	forgetPassword() {
		console.log('修改密码');
	},

	// 登录
	toLogin() {
		// 判断空值
		if (this.data.accountNumber == '' || this.data.password == '') {
			wx.showToast({
				title: '输入不能为空！',
				image: '../../image/no.png',
				duration: 1000,
			});
		}

		// 判断接口
		let url = 'http://localhost:3000/slogin';
		if (!this.data.type) {
			url = 'http://localhost:3000/tlogin';
		}
		let that = this;

		// 请求数据
		wx.request({
			url: url,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				id: this.data.accountNumber,
				password: this.data.password,
			},
			success({data}) {
				if (data.data.length != 0) {
					// 登录成功
					let app = getApp();
					app.globalData.id = data.data[0].id;
					app.globalData.name = data.data[0].name;
					if (that.data.type) {
						app.globalData.room = data.data[0].room;
						app.globalData.class = data.data[0].class;
					}
					wx.switchTab({
						url: '../Leave/Leave',
					});
				} else {
					// 登录失败
					wx.showToast({
						title: '登录失败',
						image: '../../image/close.png',
						duration: 1000,
					});
				}
			},
		});
	},

	// 切换身份
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
