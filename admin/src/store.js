 function Store() {
        this.storage = window.localStorage||null;
        this.rules = [];

    }
    Store.prototype ={
        constructor:Store,
        get:function (key, type) {
            var res = null;
            if(type === 'object'){
                try {
                    res = JSON.parse(this.storage.getItem(key));
                }catch (e) {
                    console.warn('...');
                }
            }else{
                res = this.storage.getItem(key);
            }
            return res;
        },
        set:function (key, value, type) {
            var flag = this.rules.every(function (item) {
                return item.test(value);
            });
            if(!value || !flag){
                console.warn('value不合法');
                return;
            }

            if(type === 'object'){
                this.storage.setItem(key, JSON.stringify(value));
            }else {
                this.storage.setItem(key,value);
            }
        },
        destroy:function (key) {
            if(key){
                this.storage.removeItem(key);
            }else{
                this.storage.clear();
            }
        },
        addRule:function (ruleArr) {
            if(!ruleArr instanceof Array){
                console.warn('不是数组');
                return;
            }
            this.rules = ruleArr;
        }
    };

export default new Store();

/*
* 1.对应的数组长度最多为15；
* 2.过期时间  过期后原来的数据全部清空  单位ms  【30*24*3600】
* */
