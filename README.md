# SD J-E translate


AUTOMATIC1111/stable-diffusion-webui のテキスト入力エリアに日英翻訳ボタンを追加する Tampermonkey スクリプトです。  
CtrlかShiftを押しながらクリックすると逆に英日翻訳します。

Tampermonkeyをインストールしていれば、[このリンク](https://github.com/hetima/SD-JE-translate/raw/main/SD_J-E_translate.user.js)を開くとインストールできます。

- [みんなの自動翻訳＠TexTra®](https://mt-auto-minhon-mlt.ucri.jgn-x.jp/) の API を使用しているのでユーザー登録が必要です。
- ページを開いたら5秒後くらいにボタンが現れます。
- 最初にクリックするとTexTraのIDとAPIキーの入力を求められるので入力してください。値は localStorage に保存されます。

主要な機能は [culage 氏による実装](https://github.com/culage/stable-diffusion-webui/commit/65c3ca77c392ff87370f691e1af4c080a894e967) に拠るものです。

## To-Do
- 読み込み完了をちゃんと把握したい
- 翻訳してテキストの行数が変わると textarea のサイズを自動更新したい