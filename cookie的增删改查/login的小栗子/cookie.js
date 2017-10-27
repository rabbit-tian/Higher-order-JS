function setCookie(key,val,time){
    if( time ){
        var d = new Date();
        d.setDate(d.getDate()+time);
       
        document.cookie = key+'='+val+';expires='+d;
    }else{
        document.cookie = key+'='+val;
    }
}

function getCookie(key){
    let cookieArr = document.cookie.split('; ');
    let  temp = '';
    cookieArr.forEach((e)=>{
        let arr = e.split('='); 
        if(arr[0] === key){
            temp = arr[1];
        }
    });
    return temp?temp:null;
}

function removeCookie(key,val){
    setCookie(key,val,-1);
}
