//example  '  f r  '  it means we want  'f r' avoiding all unnecessary space

var isRealString = (str)=>{
    return typeof str === 'string' && str.trim().length >0;
}

module.exports = {isRealString};


