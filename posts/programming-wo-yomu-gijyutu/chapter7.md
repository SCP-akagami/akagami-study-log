---
title: 'プログラムを読む技術-第7章Pythonのモジュールを読む'
date: '2025-08-02'
tags: ['プログラムを読む技術']
---

# プログラムを読む技術-第7章Pythonのモジュールを読む

## Notes

### random モジュールの randrange() 関数

`randrange()` 関数を定義した73行のコードを次のプログラムを実行することで参照することができる。

```Python
import inspect
import random

# ソースを表示する
print(inspect.getsource(random.randrange))
```

