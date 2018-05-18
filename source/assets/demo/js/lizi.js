
    /*阶乘*/
    /*function factorial(n) {
        return n <= 1 ? 1 : n * factorial( n-1 );
    }
    console.log(factorial(3))
    var numArr = [2,3,4]
    for (var i = 0; i <n; i++) {

    }*/
    /*
    * 输出二维数组
    *
    * */
    /*function permute(input) {
        var permArr = [],   //最终数组 容器
            usedChars = []; //二维数组的元素 容器，是个一维数组
        var t = 0, x = 0
        function main(input){
            var ch;
            for (var i = 0; i < input.length; i++) {
                ch = input.splice(i, 1)[0];
                usedChars.push(ch);
                if (input.length == 0) {
                    console.log(i,input.length)
                    permArr.push(usedChars.join(''));
                }
                main(input);
                console.log('input11',input)
                input.splice(i, 0, ch);
//                console.log('ch i',ch,i)
//                console.log('input',input)
                usedChars.pop();
            }
            return permArr
        }
        return main(input);
    };*/
//    console.log(permute([1,2,3]));


     /*function quanpailie(input) {
         var resArr = [],   //最终结果 容器
             childArr = []; //最终结果子元素 容器
         function digui(input) {
             var char;      //存放input的第一个元素
             for (var i = 0; i < input.length; i++) {
                 char = input.splice(i,1)[0]  //取出第一个元素并赋值给char，注意input会改变
                 childArr.push(char);         //组装子元素数组，将char push进该数组
                 /!*当遍历到最后一个数的时候 就将子元素push到结果集中  生成一个答案*!/
                 if(input.length === 0){
                     resArr.push(childArr.join(''))
                 }
                 digui(input);
                 input.splice(i, 0, char);   //将char插入input  why???????
                 childArr.pop();     //删除最后一个元素   why？？
             }
             return resArr
         }
         return digui(input)
     }
    var res = quanpailie([1,2,3])
    console.log(res)*/
    /*function temp(a, arr) {
        let tempArr = arr.slice();
        if(arr.length != 1) {
            for(let i = 0; i < arr.length; i++) {
                /!*
                * 例如 i = 0，   arr = [1, 2, 3,]
                * *!/
                let txTempArr = tempArr.slice();
                temp(a + '' + txTempArr.splice(i, 1)[0], txTempArr);
            }
        } else {
            console.log(a + '' + arr[0]);
        }
    }
    temp('',[1,2,3,4])*/
    /*var arr = [{x:1},{x:1},{x:1,y:2},{y:2,x:1}]
    let a = [... new  Set(arr)]
    console.log(a)
       var b = [...new Set(arr.map(v => JSON.stringify(v)))].map(v => JSON.parse(v))
    console.log(b)*/
    var resArr = [];
    function temp(a, arr) {
        console.log('a =',a, '  arr =',arr.join(''))
        let tempArr = arr.slice();
        if(arr.length != 1) {
            for(let i = 0; i < arr.length; i++) {
                let txTempArr = tempArr.slice();
                temp(a + '' + txTempArr.splice(i, 1)[0], txTempArr);
            }
        } else {
            var res = a + '' +arr[0]  //一个完整的排列
            console.log('结果=',res)
            resArr.push(res)
        }
    }
    temp('',[1,2,3])
    console.log(resArr)
