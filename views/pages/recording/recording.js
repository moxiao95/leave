Page({
	data: {
		dataList: [
			{
				time: '2017.10.10 - 2020.12.12',
				state: 0,
				id: 1,
				leaveClass: 1,
			},
			{
				time: '2017.10.10 - 2020.12.12',
				state: 1,
				id: 2,
				leaveClass: 0,
			},
			{
				time: '2017.10.10 - 2020.12.12',
				state: 2,
				id: 3,
				leaveClass: 1,
			},
			{
				time: '2017.10.10 - 2020.12.12',
				state: 2,
				id: 3,
				leaveClass: 1,
			},
		],
	},

	onLoad() {
		wx.setNavigationBarColor({
			backgroundColor: '#f9686c',
			frontColor: '#ffffff',
		});
	},

	toInfoPage(o) {
		let {time, state, id, leaveClass} = o.currentTarget.dataset.item;
		wx.navigateTo({
		  	url: `../info/info?time=${time}&state=${state}&id=${id}&leaveClass=${leaveClass}`,
		});
	},
});
