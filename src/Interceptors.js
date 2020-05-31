var axios = require("axios");


axios.interceptors.request.use(
    function(config) {
        var jwtToken = localStorage.getItem("Authentication");
        console.log(jwtToken);
        if (jwtToken) {
            config.headers["Authentication"] = "Bearer " + jwtToken;
        }
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);