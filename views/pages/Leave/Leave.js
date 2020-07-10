Page({
    data: {
		nowTime: '',
		startTime: '2000-01-01',
		endTime: '2000-01-01',
		index: 0,
		array: ['事假', '病假'],
		textValue: '',
    },

    onLoad() {
		this.getNowTime();
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
	}
});
