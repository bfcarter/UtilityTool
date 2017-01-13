module.exports = function(length) {
    if(length < 1) { //if greater then 1
        length = 10;
    }

    var result = "";
    var allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"; //allowed variables

    for(var i=0; i<length; i++) {
        result += allowed.charAt(Math.floor(Math.random() * allowed.length));
    }

    return result; //show answer
};