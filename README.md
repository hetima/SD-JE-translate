# SD J-E translate


AUTOMATIC1111/stable-diffusion-webui のテキスト入力エリアに日英翻訳ボタンを追加する Tampermonkey スクリプトです。  
CtrlかShiftを押しながらクリックすると逆に英日翻訳します。

Tampermonkeyをインストールしていれば、[このリンク](https://github.com/hetima/SD-JE-translate/raw/main/SD_J-E_translate.user.js)を開くとインストールできます。

- [みんなの自動翻訳＠TexTra®](https://mt-auto-minhon-mlt.ucri.jgn-x.jp/) の API を使用しているのでユーザー登録が必要です。
- ページを開いたら5秒後くらいにボタンが現れます。
- 最初にクリックするとTexTraのIDとAPIキーの入力を求められるので入力してください。値は localStorage に保存されます。

主要部分は [culage 氏によるものです](https://github.com/culage/stable-diffusion-webui/commit/65c3ca77c392ff87370f691e1af4c080a894e967)。この実装ではレポジトリ内を直接変更する必要があるため Tampermonkey スクリプト化した次第です。

![screen shot](https://raw.githubusercontent.com/hetima/SD-JE-translate/main/image.jpg)

## To-Do
- gradio の読み込み完了をちゃんと把握したい