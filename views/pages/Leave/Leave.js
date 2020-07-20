Page({
    data: {
		// 展示学生还是老师
		show: false,
		// 现在时间
		nowTime: '',
		// 请假开始时间
		startTime: '2000-01-01',
		// 请假结束时间
		endTime: '2000-01-01',
		// 默认请假类型
		index: 0,
		// 请假类型
		array: ['事假', '病假'],
		// 请假理由
		textValue: '',
		// 批假列表
		leaveList: [
			{
				id: 1,
				title: '病假',
			},
			{
				id: 2,
				title: '病假',
			},
			{
				id: 3,
				title: '病假',
			},
		],
    },

    onLoad() {
		this.getNowTime();
		let app = getApp();
		this.setData({
			show: app.globalData.sOrt,
		});
		if (app.globalData.sOrt) {
			// 学生
			wx.setTabBarItem({
				index: 0,
				text: '请假',
			});
			wx.setTabBarItem({
				index: 1,
				text: '请假记录',
			});
		} else {
			// 老师
			wx.setTabBarItem({
				index: 0,
				text: '批假',
			});
			wx.setTabBarItem({
				index: 1,
				text: '批假记录',
			});
		}
	},

	// 获取时间
	getNowTime() {
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
		let d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
		let w = date.getDay();
		let weekday = '星期';
		switch (w) {
			case 0:
				weekday += '日';
				break;
			case 1:
				weekday += '一';
				break;
			case 2:
				weekday += '二';
				break;
			case 3:
				weekday += '三';
				break;
			case 4:
				weekday += '四';
				break;
			case 5:
				weekday += '五';
				break;
			case 6:
				weekday += '六';
				break;
		}

		let hours = date.getHours();
		let min = date.getMinutes();

		this.setData({
			nowTime: `${y}-${m}-${d} ${weekday}`,
			startTime: `${y}-${m}-${d}`,
			endTime: `${y}-${m}-${d}`,
		});
	},
	
	// 绑定开始时间
	bindStartDateChange(e) {
        this.setData({
            dayTime: e.detail.value,
        });
	},
	// 绑定结束时间
	bindEndDateChange(e) {
        this.setData({
            endTime: e.detail.value,
        });
	},
	
	// 绑定请假类型
	bindPickerChange(e) {
        this.setData({
            index: e.detail.value,
        });
	},
	
	// 提交申请
	submitApplication() {
		wx.showToast({
			title: '成功',
			icon: 'success',
			duration: 2000,
		});
	},

	// 文本域绑定
	textValueChange(e) {
		this.setData({
            textValue: e.detail.value,
        });
	},

	// 跳转详情页面
	toDetailspage(o) {
		let id = o.currentTarget.dataset.id;
		wx.navigateTo({
			url: `../details/details?id=${id}`,
	  });
	},
});
