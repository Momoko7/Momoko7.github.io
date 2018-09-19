
    /*阶乘*/
    /*function factorial(n) {
        return n <= 1="" ?="" :="" n="" *="" factorial(="" n-1="" );="" }="" console.log(factorial(3))="" var="" numarr="[2,3,4]" for="" (var="" i="0;" <n;="" i++)="" {="" }*="" 输出二维数组="" *function="" permute(input)="" permarr="[]," 最终数组="" 容器="" usedchars="[];" 二维数组的元素="" 容器，是个一维数组="" t="0," x="0" function="" main(input){="" ch;="" <="" input.length;="" ch="input.splice(i," 1)[0];="" usedchars.push(ch);="" if="" (input.length="=" 0)="" console.log(i,input.length)="" permarr.push(usedchars.join(''));="" main(input);="" console.log('input11',input)="" input.splice(i,="" 0,="" ch);="" console.log('ch="" i',ch,i)="" console.log('input',input)="" usedchars.pop();="" return="" };*="" console.log(permute([1,2,3]));="" quanpailie(input)="" resarr="[]," 最终结果="" childarr="[];" 最终结果子元素="" digui(input)="" char;="" 存放input的第一个元素="" char="input.splice(i,1)[0]" 取出第一个元素并赋值给char，注意input会改变="" childarr.push(char);="" 组装子元素数组，将char="" push进该数组="" !*当遍历到最后一个数的时候="" 就将子元素push到结果集中="" 生成一个答案*!="" if(input.length="==" 0){="" resarr.push(childarr.join(''))="" digui(input);="" char);="" 将char插入input="" why???????="" childarr.pop();="" 删除最后一个元素="" why？？="" res="quanpailie([1,2,3])" console.log(res)*="" temp(a,="" arr)="" let="" temparr="arr.slice();" if(arr.length="" !="1)" for(let="" arr.length;="" !*="" 例如="" arr="[1," 2,="" 3,]="" *!="" txtemparr="tempArr.slice();" temp(a="" +="" ''="" txtemparr.splice(i,="" 1)[0],="" txtemparr);="" else="" console.log(a="" arr[0]);="" temp('',[1,2,3,4])*="" *var="" a="[..." new="" set(arr)]="" console.log(a)="" b="[...new" set(arr.map(v=""> JSON.stringify(v)))].map(v => JSON.parse(v))
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
</=>