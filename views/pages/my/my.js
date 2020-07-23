Page({
	data: {
		show: true,
		room: null,
		class: null,
		id: null,
		name: null,
	},

	onLoad() {
		wx.setNavigationBarColor({
			backgroundColor: '#51ccf0',
			frontColor: '#ffffff',
		});

		let app = getApp();
		this.setData({
			show: app.globalData.sOrt,
			name: app.globalData.name,
			id: app.globalData.id,
			class: app.globalData.class,
			room: app.globalData.room,
		});
	},

	// 修改信息
	changeInfo() {
		wx.navigateTo({
			url: '../changeInfo/changeInfo',
		});
	},

	// 修改密码
	changePassword() {
		wx.navigateTo({
			url: '../changePassword/changePassword',
		});
	},
});
