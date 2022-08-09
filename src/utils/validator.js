const Validator = {
    isPhone(str) {
        const reg = /^1\d{10}$/
        return reg.test(str)
    },
    istelephone(str){
        const reg = /^0\d{2,3}-?\d{7,8}$/
        return reg.test(str)
    },
    getPhoneValidator(){
        var validPhone=(rule, value,callback)=>{
            if (!value){
                callback(new Error('Please insert correct phone number'))
            }else  if (!Validator.isPhone(value)){
                callback(new Error('Please insert correct phone number'))
            }else {
                callback()
            }
        }
        return validPhone
    },
    getspecharsValidator(){
        var specharsValidator=(rule, value,callback)=>{
            let regEn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

            if (regEn.test(value) || regCn.test(value)){
                callback(new Error('Please insert correct value'))
            }else {
                callback()
            }
        }
        return specharsValidator
    },
    getRegexValidator(reg, msg) {
        return (rule, value, callback) => {
            if (reg.test(value)) {
                callback();
            } else {
                callback(new Error(msg || 'Not in requirement'));
            }
        };
    },
    getNameValidator(){
        var specharsValidator=(rule, value,callback)=>{
            let regEn = /[`~!@#$%^&*()+<>?:"{},.\/;'[\]]/im,
                regNo = /[0-9]/im,
                regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

            if (regEn.test(value) || regCn.test(value) || regNo.test(value)){
                callback(new Error('Please insert correct value'))
            }else {
                callback()
            }
        }
        return specharsValidator
    },
    getPhoneOrTel(){
        var validPhoneOrTel = (rule, value, callback) => {
            if (value && value !=="" && !Validator.isPhone(value) && !Validator.istelephone(value)) {
                callback(new Error('Please insert correct phone number'))
            } else {
                callback()
            }
        }
        return validPhoneOrTel
    },
    getIdCard() {
        var validIdCard=(rule, value, callback)=>{
            var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            if(!value){
                callback()
            }else if(!reg.test(value)){
                callback(new Error('Please insert correct ID card'))
            }else{
                callback()
            }
        }
        return validIdCard

    },
    isPrice(str) {
        let newStr = Number(str);
        const reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
        return reg.test(newStr)
    },
    isPosInt(str) {
        const reg = /^[1-9][0-9]*$/;
        return reg.test(str);
    },
};

export default {
    install: function(Vue, Option) {
        Object.defineProperty(Vue.prototype, "$valid", { value: Validator });
    }
};
