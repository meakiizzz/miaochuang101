#!/bin/zsh
cd -- "${0:A:h}"
if /usr/bin/curl --silent --fail http://127.0.0.1:8871/ > /dev/null; then
  /usr/bin/open http://127.0.0.1:8871/
  exit 0
fi
(sleep 1; /usr/bin/open http://127.0.0.1:8871/) &
echo "妙创 101 本地预览：http://127.0.0.1:8871/"
echo "预览期间请保留此终端窗口。关闭窗口会停止预览服务，文件仍保存在本地。"
python3 -m http.server 8871 --bind 127.0.0.1
