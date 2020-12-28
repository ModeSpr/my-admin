<template>
<div class="">
  <section @click="click" @touchstart="touchstart" @touchend="touchend">Dashboard</section>
<input type="text" v-model.number="num">
<div class="">{{num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}}</div>
<div class=""> {{toChineseNum(num)}}</div>
</div>
</template>

<script>
export default {
  data(){
    return {
      num: 0
    }
  },
methods:{
  click(){
    console.log('click', +Date.now())
  },
  touchstart(){
    console.log('touchstart', +Date.now())
  },
  touchend(){
    console.log('touchend', +Date.now())
  },
  toChineseNum(num) {
    if(isNaN(Number(num))) return ('Not a Number')
    if(num > Math.pow(10, 14) * 9) return ('Number exceed the maximum')
    if(num == 0) return '零'
    let result = num < 0 ? (num = -num, '负') : ''
    let chNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    let chUnit = ['', '十', '百', '千', '万', '十', '百', '千', '亿', '十', '百', '千','万', '十', '百', '千','亿'];
    let integer = num.toString().split(".")[0];
    let decimals = num.toString().split(".")[1];
    result += integer.split('').map((i,idx) => chNum[i] + chUnit[integer.length-idx-1]).join('').replace(/零(千|百|十)/g, '零').replace(/零+/g, '零').replace(/零+$/, '').replace(/零亿/g, '亿').replace(/零万/g, '万').replace(/亿万/g, '亿').replace(/^一十/g, '十');
    result += decimals ? ('点' + decimals.split('').map(i => chNum[i]).join('')) : '';
    return result
  }
}
}
</script>

<style>

</style>