// pages/details/details.js
Page({
    data: {
        queryId: null,
        name: '赵行',
		id: 123456,
		class: '1班',
		room: '101',
		time: '2017.12.11 - 2017.12.12',
		reason: '生病',
		type: 0,
	},

    onLoad(o) {
        this.setData({
            queryId: o.id,
        });
		let that  = this;
		let app = getApp();

		wx.request({
			url: 'http://localhost:3000/details',
			data: {
				id: o.id,
			},
			success({data}) {
				console.log(data);
				that.setData({
					time: data.data[0].time,
					state: data.data[0].state,
					type: data.data[0].type,
					id: data.data[0].s_id,
					reason: data.data[0].reason,
				});
				wx.request({
					url: 'http://localhost:3000/student',
					data: {
						id: data.data[0].s_id,
					},
					success(d) {
						console.log(d)
						that.setData({
							mame: d.data.data[0].name,
							class: d.data.data[0].class,
							room: d.data.data[0].room,
						});
					},
				});
			},
		});
    },

	approve() {
		wx.request({
			method: 'POST',
			url: 'http://localhost:3000/leaveState',
			data: {
				state: 1,
				id: this.data.queryId,
			},
			success({data}) {
				wx.navigateBack({
					delta: 1,
				});
			},
		});
	},

	noApprove() {
		wx.request({
			method: 'POST',
			url: 'http://localhost:3000/leaveState',
			data: {
				state: 2,
				id: this.data.queryId,
			},
			success({data}) {
				wx.navigateBack({
					delta: 1,
				});
			},
		});
	},
});