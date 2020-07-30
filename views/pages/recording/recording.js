Page({
	data: {
		// 学生数据列表
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
		// 老师数据列表
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
		wx.setNavigationBarColor({
			backgroundColor: '#f9686c',
			frontColor: '#ffffff',
		});
		let app = getApp();
		this.setData({
			show: app.globalData.sOrt,
		});
	},

	loadFn() {
		let that = this;
		let app = getApp();
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
					console.log(data)
					that.setData({
						recordingList: data.data,
					});
				},
			});
		}
	},

	onShow() {
		this.loadFn();
	},

	// 学生进入详情页面
	toInfoPage(o) {
		let {time, state, id, type} = o.currentTarget.dataset.item;
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
	},
});
