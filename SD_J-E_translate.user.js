// ==UserScript==
// @name         SD J-E translate
// @namespace    http://tampermonkey.net/
// @version      0.1.1
// @description  add J-E translate button to stable-diffusion-webui
// @author       hetima
// @match        http://localhost:7860/*
// @match        http://127.0.0.1:7860/*
// @run-at       document-end
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/hmac-sha1.js
// @require https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/components/enc-base64-min.js
// @require https://cdn.jsdelivr.net/npm/oauth-1.0a@2.2.6/oauth-1.0a.min.js
// ==/UserScript==

(function () {
    'use strict';

    function setupTextBox(tb) {
        var btn = document.createElement("button");
        btn.innerText = "J→E";
        btn.style.float = "right";
        btn.style.margin = "4px";
        btn.title = "クリックすると日英翻訳します。shift か ctrl を押していると英日翻訳します";
        //btn.class="gr-button gr-button-lg gr-button-secondary self-start";
        btn.classList.add('gr-button', 'gr-button-secondary');
        tb.parentElement.insertBefore(btn, tb.nextSibling);
        btn.addEventListener('click', function (event) {
            if (event.ctrlKey || event.shiftKey) {
                translate(tb, 'en_ja');
            } else {
                translate(tb, 'ja_en');
            }
        }, false);
    }

    function setup() {
        document.querySelector('gradio-app').shadowRoot.querySelectorAll('textarea').forEach(function (value, index, list) {
            if (value && value.placeholder.endsWith("rompt")) {
                console.log(value.placeholder);
                setupTextBox(value);
            }
        });
    }

    // https://github.com/culage/stable-diffusion-webui/commit/65c3ca77c392ff87370f691e1af4c080a894e967
    async function translate(tb, type) {
        function setTextValue(tb, val) {
            tb.value = val;
        }

        var text = tb.value;
        if (text == "") {
            return
        }
        if (text == "clear") {
            localStorage.removeItem("textra_user_name");
            localStorage.removeItem("textra_api_key");
            localStorage.removeItem("textra_api_secret");
            alert("翻訳APIキーをクリアしました。");
            return;
        }

        var name = localStorage.getItem("textra_user_name");
        var key = localStorage.getItem("textra_api_key");
        var secret = localStorage.getItem("textra_api_secret");

        const oauth = OAuth({
            consumer: { key, secret },
            signature_method: "HMAC-SHA1",
            hash_function(base_string, key) {
                return CryptoJS.HmacSHA1(base_string, key).toString(CryptoJS.enc.Base64);
            }
        });

        var url = (type == "en_ja" ?
            "https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/mt/generalNT_en_ja/" :
            "https://mt-auto-minhon-mlt.ucri.jgn-x.jp/api/mt/generalNT_ja_en/");
        const options = {
            url,
            method: "POST",
            data: { text, name, key, type: "json" }
        };

        const cors_support = "https://corsproxy.io/?";
        const res = await fetch(cors_support + options.url, {
            method: options.method,
            body: new URLSearchParams(options.data),
            headers: oauth.toHeader(oauth.authorize(options))
        }).then((r) => r.json());

        if (res.resultset.code != 0) {
            var msg = "";
            msg += "【アクセス失敗】\n";
            msg += "\n";
            msg += "1. みんなの自動翻訳TexTraにログイン\n"
            msg += "2. https://mt-auto-minhon-mlt.ucri.jgn-x.jp/content/setting/user/edit/ を開く\n"
            msg += "3. 「アカウントID/API key/API secret」形式でAPIキーを入力\n"
            msg += "\n";
            msg += "APIキーをクリアしたい場合、プロンプトに「clear」とだけ入力して翻訳ボタンを押してください。";
            msg += "\n";
            var api_key = prompt(msg);
            if (!api_key) {
                return;
            }
            if (api_key == 'clear') {
                localStorage.removeItem("textra_user_name");
                localStorage.removeItem("textra_api_key");
                localStorage.removeItem("textra_api_secret");
            } else {
                localStorage.setItem("textra_user_name", api_key.split("/")[0].trim());
                localStorage.setItem("textra_api_key", api_key.split("/")[1].trim());
                localStorage.setItem("textra_api_secret", api_key.split("/")[2].trim());
            }
            return text;
        }
        setTextValue(tb, res.resultset.result.text);
        return;
    }

    setTimeout(function () {
        setup();
    }, 5000);

})();
