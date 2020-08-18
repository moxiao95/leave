// pages/listInfo/listInfo.js
Page({
    data: {
        queryId: null,
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
        this.setData({
            queryId: o.id,
        });
		console.log(o.id);
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
					id: data.data[0].s_id,
					reason: data.data[0].reason,
					name: data.data[0].s_name,
				});
				wx.request({
					url: 'http://localhost:3000/student',
					data: {
						id: data.data[0].s_id,
					},
					success(d) {
						that.setData({
							class: d.data.data[0].class,
							room: d.data.data[0].room,
						});
					},
				});
			},
		});
    },
});
