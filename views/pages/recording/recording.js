Page({
	data: {
		dataList: [
			{
				time: '2017.10.10 - 2020.12.12',
				state: 0,
				id: 1,
				type: 1,
			},
			{
				time: '2017.10.10 - 2020.12.12',
				state: 1,
				id: 2,
				type: 0,
			},
			{
				time: '2017.10.10 - 2020.12.12',
				state: 2,
				id: 3,
				type: 1,
			},
			{
				time: '2017.10.10 - 2020.12.12',
				state: 2,
				id: 3,
				type: 1,
			},
		],
		show: true,
		recordingList: [
			{
				id: 1,
				state: 1,
				info: '赵兴-1班',
			},
			{
				id: 1,
				state: 2,
				info: '赵兴-1班',
			},
		],
	},

	onLoad() {
		let that = this;
		wx.setNavigationBarColor({
			backgroundColor: '#f9686c',
			frontColor: '#ffffff',
		});
		let app = getApp();
		this.setData({
			show: app.globalData.sOrt,
		});

		if (app.globalData.sOrt) {
			wx.request({
				url: 'http://localhost:3000/sLeaves',
				data: {
					id: app.globalData.id,
				},
				success({data}) {
					that.setData({
						dataList: data.data,
					});
				},
			});
		} else {
			wx.request({
				url: 'http://localhost:3000/tLeaves',
				data: {
					id: '1001',
				},
				success({data}) {
					that.setData({
						dataList: data.data,
					});
				},
			});
		}
	},

	// 学生进入详情页面
	toInfoPage(o) {
		let {time, state, id, leaveClass} = o.currentTarget.dataset.item;
		wx.navigateTo({
		  	url: `../info/info?time=${time}&state=${state}&id=${id}&type=${type}`,
		});
	},

	// 老师进入详情页面
	toListPage(o) {
		let id = o.currentTarget.dataset.id;
		wx.navigateTo({
			url: `../listInfo/listInfo?id=${id}`,
	  	});
	}
});
