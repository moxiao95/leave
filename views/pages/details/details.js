// pages/details/details.js
Page({
    data: {
        queryId: null,
    },
    onLoad(o) {
        this.setData({
            queryId: o.id,
        });
    },
});