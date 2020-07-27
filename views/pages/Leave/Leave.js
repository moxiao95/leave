Page({
    data: {
		// 展示学生还是老师
		show: false,
		id: null,
		// 现在时间
		nowTime: '',
		// 请假开始时间
		startTime: '2000-01-01',
		// 请假结束时间
		endTime: '2000-01-01',
		// 默认请假类型
		leaveIndex: 0,
		// 请假类型
		leaveArray: ['事假', '病假'],
		// 老师index
		tIndex: 0,
		// 老师名字列表
		tNameArray: [],
		// 老师id列表
		tIdArray: [],
		// 请假理由
		textValue: '',
		// 批假列表
		leaveList: [
			{
				id: 1,
				type: '病假',
			},
			{
				id: 2,
				type: '病假',
			},
			{
				id: 3,
				type: '病假',
			},
		],
    },

    onLoad() {
		this.getNowTime();
	},

	loadFn() {
		let app = getApp();
		let that = this;
		this.setData({
			show: app.globalData.sOrt,
			id: app.globalData.id,
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
			// 获取老师
			wx.request({
				url: 'http://localhost:3000/teacher',
				success({data}) {
					let nList = [],
						iList = [];
					data.data.forEach((t) => {
						nList.push(t.name);
						iList.push(t.id);
					})
					that.setData({
						tNameArray: nList,
						tIdArray: iList,
					});
				},
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
			wx.request({
				url: 'http://localhost:3000/lookLeave',
				data: {
					tId: app.globalData.id,
				},
				success({data}) {
					let list = [];
					data.data.forEach((t) => {
						list.push({
							id: t.id,
							type: t.type == 0 ? '事假' : '病假',
						});
						that.setData({
							leaveList: list,
						});
					});
					console.log(data)
				},
			});
		}
	},

	onShow() {
		this.loadFn();
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
		console.log(this.data)
		wx.request({
			url: 'http://localhost:3000/leave',
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			data: {
				id: this.data.id,
				tId: this.data.tIdArray[this.data.tIndex],
				time: `${this.data.startTime}-${this.data.endTime}`,
				reason: this.data.textValue,
				type: this.data.leaveIndex,
			},
			success({data}) {
				console.log(data);
			},
		});
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
