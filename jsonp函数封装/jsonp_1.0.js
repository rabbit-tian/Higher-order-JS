
/*

cb=jQuery11020919820250376338_1508991367126&_=1508991367129

callback=jquery1508999846233036604137565622197
callback=jquery150899988242306700599327855181

*/

function jsonp(obj){

    var opt = {
        url:'',
        data:{},
        callback:'callback',
        //设置fnName为了不让函数名重名
        fnName:('jquery'+new Date().getTime()+Math.random()).replace('.',''),
        success:function(){},
        fail:function(){}
    };

    for(var attr in obj){
        opt[attr] = obj[attr];
    }

    //{query:ss} -> {query:ss,cb:'fn'},方便一次性循环就拼接成最后的结果
    opt.data[opt.callback] = opt.fnName; 
    
    var arr = [];
    for(var attr in opt.data){
        arr.push(attr + '=' + opt.data[attr]);
    }

   var queryString =  arr.join('&'); //query=sdf&callback=fn

   //console.log(queryString) 
   //query=ss&xxx=hh

   var timer = null;
   timer = setTimeout(function(){
        opt.fail();
    },5000);

   window[opt.fnName] = function (obj){
        clearTimeout(timer);
        opt.success(obj);
   };

//    console.log(opt.url + '?' + queryString + '&' + opt.callback + '=' +opt.fnName);

    var os = document.createElement('script');
    os.src = opt.url + '?' + queryString; //+ '&' + opt.callback + '=' +opt.fnName;
    document.getElementsByTagName('head')[0].append(os);
    os.remove();
}