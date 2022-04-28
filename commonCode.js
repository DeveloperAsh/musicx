module.exports = function(){
    var bcrypt = require('bcryptjs');
    var secretKeys=new(require('./secretFile.js'))();
    const UuidEncoder = require('uuid-encoder');
    const encoder = new UuidEncoder('0123456789QWERTYUIOPASDFGHJKLZXCVBNM');
    this.getEncrypt=function(value){
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(secretKeys.CryptrKey); //Server Secret Key
        return cryptr.encrypt(value);
    };
    this.getDecrypt=function(value){
        const Cryptr = require('cryptr');
        const cryptr = new Cryptr(secretKeys.CryptrKey); //Server Secret Key
        return cryptr.decrypt(value);
    };
    this.getHashPassword=function(value){
        return bcrypt.hashSync(value, 8); //8=saltRounds
    };
    this.isCompared=function(value,testValue){
        return bcrypt.compareSync(testValue, value); //8=saltRounds and returns true or false
    };
    this.typeCastObj=function(objectToConvert,objType){
        let listofKeys=Object.keys(objType);
        let convertedObj={};
        for(let i=0;i<listofKeys.length;i++){
            if(objectToConvert.hasOwnProperty(listofKeys[i])){
                convertedObj[listofKeys[i]]=objectToConvert[listofKeys[i]];
            }else{
                convertedObj[listofKeys[i]]=objType[listofKeys[i]];
            }
        }
        return convertedObj;
    };
    this.encodeRandomNum=function(mobileNum){
        return encoder.encode(mobileNum);
    };
    this.deecodeRandomNum=function(encodedNum){
        let msgValue=encoder.decode(encodedNum);
        msgValue=msgValue.substring(msgValue.length-10, msgValue.length);
        return msgValue;
    };

    this.validateEmail = function(email) 
    {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    };

    this.chunks = function(array, parts) {

        let result = [];
        for (let i = parts; i > 0; i--) {
            result.push(array.splice(0, Math.ceil(array.length / i)));
        }
        return result;
      }
};