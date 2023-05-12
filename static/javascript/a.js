var startX;
var startY;
var threshold = 50; // スワイプの閾値

document.addEventListener('touchstart', function(e) {
  var touch = e.touches[0];
  startX = touch.pageX;
  startY = touch.pageY;
});

document.addEventListener('touchmove', function(e) {
  var touch = e.touches[0];
  var deltaX = touch.pageX - startX;
  var deltaY = touch.pageY - startY;
  if (Math.abs(deltaX) > threshold) {
    e.preventDefault(); // デフォルトのスクロールを無効にする
    if (deltaX < 0) {
      // 左にスワイプされた場合
      document.getElementById('page1').style.display = 'none';
      document.getElementById('page2').style.display = 'block';
    } else {
      // 右にスワイプされた場合
      document.getElementById('page1').style.display = 'block';
      document.getElementById('page2').style.display = 'none';
    }
  }
});
