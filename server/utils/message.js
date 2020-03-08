var moment =require('moment');
//we are using here moment for the timestamp instead new Date().getTime()

var generateMessage = (from , text)=>{
    return {
        from,
        text,
        createdAt : moment().valueOf()
    };
};

var generateLocationMessage = (from,latitude,longitude)=>{
    return {
        from,
        url:`https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt : moment().valueOf()
    };
};

module.exports= {generateMessage,generateLocationMessage};