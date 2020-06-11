module.exports = {
    publicPath:'/',
    devServer:{
        port :8888,
        host:"localhost",
        https:false,
        open:"false",
        proxy : {               //   /dev-api/banner.json 
            [process.env.VUE_APP_BASE_API] : {
                target : process.env.VUE_APP_SERVICE_URL,   
                changOrigin : true,
                pathRewrite : {
                    // "^/dev-api" : ""
                    ["^" + process.env.VUE_APP_BASE_API] : ""
                }
            }
        }
    },
    lintOnSave:false,
    productionSourceMap:false
}