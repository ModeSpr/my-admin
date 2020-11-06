function zeroize(num) {
  return num < 10 ? `0${num}` : num
}

function countDown(deadline) {
  let rest = ~~(Math.abs(new Date(deadline.replace(/-/g, '/')) - new Date()) / 1000);
  let d = zeroize(~~(rest / 3600 / 24))
  let h = zeroize(~~(rest / 3600))
  let m = zeroize(~~((rest % 3600) / 60))
  let s = zeroize(~~(rest % 60))
  return { d, h, m, s }
}