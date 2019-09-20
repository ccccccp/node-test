async function as1(){
        console.log('as1 start');
        await as2();
        console.log('as1 end');
    }
    async function as2(){
        console.log('as2');
    }
    console.log('script start');
    setTimeout(function(){
        console.log('setTimeout');
    },0)
    as1();
    new Promise(function(resolve){
        console.log('prom1');
        resolve();
    }).then(function(){
        console.log('prom2');
    });
    console.log('script end');