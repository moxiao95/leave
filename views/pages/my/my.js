Page({
	data: {
		room: '101',
		class: '1班',
		id: 123654,
		name: '赵星',
	},
	onLoad(options) {
		wx.setNavigationBarColor({
			backgroundColor: '#51ccf0',
			frontColor: '#ffffff',
		});

		let app = getApp();
		this.setData({
			name: app.globalData.name,
			id: app.globalData.id,
			class: app.globalData.class,
			room: app.globalData.room,
		});
	},
	changeInfo() {
		wx.navigateTo({
			url: '../changeInfo/changeInfo',
		});
	},

	changePassword() {
		wx.navigateTo({
			url: '../changePassword/changePassword',
		});
	},
});
