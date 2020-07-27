// pages/listInfo/listInfo.js
Page({
    data: {
        queryId: null,
        name: '赵行',
		id: 123456,
		class: '1班',
		room: '101',
		time: '2017.12.11 - 2017.12.12',
		reason: '生病',
		state: 1,
		type: 0,
    },
    onLoad(o) {
        this.setData({
            queryId: o.id,
        });
        console.log(o.id);

        let app = getApp();
		this.setData({
			time: o.time,
			state: o.state,
			type: o.type,
			name: app.globalData.name,
			id: app.globalData.id,
			class: app.globalData.class,
			room: app.globalData.room,
		});
    },
});
