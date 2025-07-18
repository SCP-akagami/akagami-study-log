---
title: 'MathJax数式表示テスト'
date: '2024-01-30'
tags: ['Math', 'MathJax', 'Test']
---

# MathJax数式表示テスト

このファイルは、MathJax機能が正しく動作するかを確認するためのテストファイルです。

## インライン数式のテスト

文章中に数式を埋め込む例です：

- 二次方程式の解の公式: $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$
- オイラーの公式: $e^{i\pi} + 1 = 0$
- 円周率: $\pi \approx 3.14159$
- 平方根: $\sqrt{2} \approx 1.414$

## ブロック数式のテスト

### 基本的な数式

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

### 複雑な数式

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

### 行列

$$
\begin{pmatrix}
a & b \\
c & d
\end{pmatrix}
\begin{pmatrix}
x \\
y
\end{pmatrix}
=
\begin{pmatrix}
ax + by \\
cx + dy
\end{pmatrix}
$$

### 微分方程式

$$
\frac{dy}{dx} = \frac{x^2 + y^2}{xy}
$$

## 数式とコードの併用テスト

数式の後にコードブロックを表示する例：

$$
f(x) = \sum_{n=0}^{\infty} \frac{f^{(n)}(a)}{n!} (x-a)^n
$$

```javascript
// テイラー展開の実装例
function taylorSeries(f, a, n, x) {
  let result = 0;
  for (let i = 0; i <= n; i++) {
    result += (derivative(f, a, i) / factorial(i)) * Math.pow(x - a, i);
  }
  return result;
}
```

## 数式の説明

上記の数式は以下のような意味を持ちます：

1. **ガウス積分**: $\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}$ は正規分布の基礎となる積分です。

2. **バーゼル問題**: $\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}$ はオイラーが解いた有名な問題です。

3. **テイラー展開**: 関数を多項式で近似する重要な手法です。

このテストファイルで、MathJax機能が正しく動作することを確認できます。 