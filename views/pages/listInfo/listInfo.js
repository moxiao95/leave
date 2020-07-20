// pages/listInfo/listInfo.js
Page({
    data: {
        queryId: null,
    },
    onLoad(o) {
        this.setData({
            queryId: o.id,
        });
        console.log(o.id);
    },
});
