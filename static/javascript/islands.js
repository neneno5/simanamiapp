		// スワイプ距離の閾値（ピクセル）
        const threshold = 50;

        // タッチ開始位置
        let startX = null;
        let startY = null;
        
        // 表示中のページのインデックス
        let currentIndex = 0;
        
        // ページの数
        const numPages = 6;
        
        // ページを切り替える関数
        function changePage(direction) {
          // 現在表示しているページを非表示にする
          document.getElementById(`page${currentIndex}`).style.display = 'none';
        
          // 表示するページのインデックスを計算する
          let nextIndex;
          if (direction === 'left') {
            nextIndex = (currentIndex + 1) % numPages;
          } else {
            nextIndex = (currentIndex + numPages - 1) % numPages;
          }
        
          // 表示するページを表示する
          document.getElementById(`page${nextIndex}`).style.display = 'block';
        
          // 表示中のページのインデックスを更新する
          currentIndex = nextIndex;
        }
        
        // タッチ開始時に呼ばれる関数
        function touchStart(event) {
          startX = event.touches[0].pageX;
          startY = event.touches[0].pageY;
        }
        
        // タッチ移動時に呼ばれる関数
        function touchMove(event) {
          event.preventDefault();
        }
        
        // タッチ終了時に呼ばれる関数
        function touchEnd(event) {
          const endX = event.changedTouches[0].pageX;
          const endY = event.changedTouches[0].pageY;
          const diffX = endX - startX;
          const diffY = endY - startY;
        
          if (Math.abs(diffX) > Math.abs(diffY)) {
            if (diffX > threshold) {
              // 右にスワイプした場合
              changePage('right');
            } else if (diffX < -threshold) {
              // 左にスワイプした場合
              changePage('left');
            }
          }
        }
        
        // タッチ開始、移動、終了時にイベントリスナーを設定する
        const container = document.getElementById('container');
        container.addEventListener('touchstart', touchStart);
        container.addEventListener('touchmove', touchMove);
        container.addEventListener('touchend', touchEnd);
        
        // 最初に表示するページを表示する
        document.getElementById('page0').style.display = 'block';
        