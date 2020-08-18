Page({
	data: {
		name: '',
		id: '',
		class: '',
		room: '',
		time: '',
		reason: '',
		state: 0,
		type: 0,
	},

	onLoad(o) {
		let that = this;
		wx.request({
			url: 'http://localhost:3000/details',
			data: {
				id: o.id,
			},
			success({data}) {
				that.setData({
					time: data.data[0].time,
					state: data.data[0].state,
					type: data.data[0].type,
					reason: data.data[0].reason,
				});
			},
		});

		let app = getApp();
		this.setData({
			name: app.globalData.name,
			id: app.globalData.id,
			class: app.globalData.class,
			room: app.globalData.room,
		});
	},
});
