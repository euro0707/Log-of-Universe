document.addEventListener('DOMContentLoaded', () => {
    // DOM要素の取得
    const homeScreen = document.getElementById('home-screen');
    const resultScreen = document.getElementById('result-screen');
    const drawButton = document.getElementById('draw-button');
    const drawAgainButton = document.getElementById('draw-again-button');
    const shareButton = document.getElementById('share-button');
    const resultMessage = document.getElementById('result-message');
    
    // 背景画像のパス
    const backgrounds = {
        home: 'images/bg_home_grid_galaxy.png',
        result: 'images/bg_result_zen_space.png',
        special: 'images/bg_special_supernova.jpg'
    };
    
    // 画面切り替え関数
    function switchScreen(fromScreen, toScreen) {
        fromScreen.classList.add('hidden');
        toScreen.classList.remove('hidden');
    }
    
    // おみくじを引く関数
    function drawOmikuji() {
        // ボタンを一時的に無効化
        drawButton.disabled = true;
        drawAgainButton.disabled = true;
        
        // ランダムなメッセージを選択
        const randomIndex = Math.floor(Math.random() * messages.length);
        const selectedMessage = messages[randomIndex];
        
        // 画面切り替え
        switchScreen(homeScreen, resultScreen);
        
        // 結果表示をリセット
        resultMessage.classList.remove('show', 'special-message', 'calm-message');
        resultMessage.textContent = '';
        
        // メッセージタイプに応じた背景とスタイルを設定
        let backgroundImage = backgrounds.result;
        if (selectedMessage.type === 'special') {
            backgroundImage = backgrounds.special;
            resultMessage.classList.add('special-message');
        } else if (selectedMessage.type === 'calm') {
            resultMessage.classList.add('calm-message');
        }
        
        // 背景画像を変更
        document.body.style.backgroundImage = `url('${backgroundImage}')`;
        
        // メッセージを表示（遅延させて演出効果を高める）
        setTimeout(() => {
            resultMessage.textContent = selectedMessage.text;
            resultMessage.classList.add('show');
            
            // ボタンを再度有効化
            drawButton.disabled = false;
            drawAgainButton.disabled = false;
        }, 800);
    }
    
    // もう一度引くボタンの処理
    function drawAgain() {
        // 結果表示をフェードアウト
        resultMessage.classList.remove('show');
        
        // ホーム画面に戻る
        setTimeout(() => {
            document.body.style.backgroundImage = `url('${backgrounds.home}')`;
            switchScreen(resultScreen, homeScreen);
        }, 500);
    }
    
    // シェアボタンの処理
    function shareResult() {
        const text = encodeURIComponent(`${resultMessage.textContent} #LogOfUniverse`);
        const url = `https://twitter.com/intent/tweet?text=${text}`;
        window.open(url, '_blank');
    }
    
    // イベントリスナーの設定
    drawButton.addEventListener('click', drawOmikuji);
    drawAgainButton.addEventListener('click', drawAgain);
    shareButton.addEventListener('click', shareResult);
    
    // 初期表示設定
    document.body.style.backgroundImage = `url('${backgrounds.home}')`;
    resultScreen.classList.add('hidden');
});
