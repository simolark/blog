---
title: 'Fixed-size Batching：隐私保护机器学习的数学基础'
date: '2025-07-03'
excerpt: '在隐私保护机器学习的研究中，固定大小批处理（Fixed-size Batching）作为一种看似简单的技术，却在理论分析中扮演着至关重要的角色。本文将从数学角度深入探讨这一技术的理论基础、优势以及在现代隐私保护算法中的应用'
tags: ['隐私保护', '固定大小批处理']
---


# Fixed-size Batching：隐私保护机器学习的数学基础

在隐私保护机器学习的研究中，固定大小批处理（Fixed-size Batching）作为一种看似简单的技术，却在理论分析中扮演着至关重要的角色。本文将从数学角度深入探讨这一技术的理论基础、优势以及在现代隐私保护算法中的应用。

## 问题的数学表述

### 基本设置

考虑一个在线学习问题，其中学习者在每个时间步 $t \in [T]$ 接收到数据点 $z_t \in \mathcal{Z}$，并需要输出决策 $\theta_t \in \Theta$。定义损失函数 $\ell: \Theta \times \mathcal{Z} \rightarrow \mathbb{R}$，则累积regret为：

$$R(T) = \sum_{t=1}^{T} \ell(\theta_t, z_t) - \min_{\theta \in \Theta} \sum_{t=1}^{T} \ell(\theta, z_t)$$

### 差分隐私约束

算法 $\mathcal{A}$ 满足 $(\epsilon, \delta)$-差分隐私，当且仅当对于任意相邻数据集 $D, D'$（即 $|D \triangle D'| = 1$），有：

$$\mathbb{P}[\mathcal{A}(D) \in S] \leq e^{\epsilon} \mathbb{P}[\mathcal{A}(D') \in S] + \delta$$

对于任意可测集合 $S$。

## Fixed-size Batching的数学定义

### 批处理机制

设批大小为 $B \in \mathbb{N}$，Fixed-size Batching将时间轴分割为批次 $\{I_m\}_{m=1}^{M}$，其中：
- $I_m = \{(m-1)B + 1, (m-1)B + 2, \ldots, mB\}$ 
- $M = \lceil T/B \rceil$

关键性质：每个批次 $I_m$ 的大小恰好为 $B$（最后一批可能不满）。

### 更新规则

在Fixed-size Batching下，参数更新遵循以下规则：

$$\theta_t = \theta_{m-1}, \quad \forall t \in I_m$$

即在批次 $I_m$ 内的所有时间步使用相同的参数 $\theta_{m-1}$。

## 理论优势：Composition分析

### 隐私损失的Composition

Fixed-size Batching的核心优势在于其对隐私损失composition的控制。

**定理1**（基本Composition）：若算法 $\mathcal{A}_1, \ldots, \mathcal{A}_k$ 分别满足 $(\epsilon_i, \delta_i)$-差分隐私，则其组合算法满足 $(\sum_{i=1}^k \epsilon_i, \sum_{i=1}^k \delta_i)$-差分隐私。

**定理2**（高级Composition）：若每个 $\mathcal{A}_i$ 满足 $(\epsilon, \delta)$-差分隐私，则对于任意 $\delta' > 0$，组合算法满足 $(\epsilon', k\delta + \delta')$-差分隐私，其中：

$$\epsilon' = \sqrt{2k \ln(1/\delta')} \epsilon + k\epsilon(\e^{\epsilon} - 1)$$

### Fixed-size Batching的Composition优势

在Fixed-size Batching中，总更新次数为 $M = \lceil T/B \rceil$，而非 $T$。这带来了显著的隐私预算节省：

**推论1**：使用批大小 $B$ 的Fixed-size Batching，总隐私损失为 $O(\sqrt{T/B} \cdot \epsilon_{batch})$，而逐点更新的隐私损失为 $O(\sqrt{T} \cdot \epsilon_{point})$。

## 噪声与性能的权衡分析

### 噪声尺度的数学分析

对于敏感度为 $\Delta$ 的查询，高斯机制需要添加方差为 $\sigma^2$ 的噪声，其中：

$$\sigma^2 = \frac{2\Delta^2 \ln(1.25/\delta)}{\epsilon^2}$$

### 批处理下的噪声分析

在Fixed-size Batching中，批级敏感度通常为 $\Delta_{batch} = O(B \cdot \Delta_{point})$。然而，由于更新次数减少，总噪声影响为：

**命题1**：在固定隐私预算 $\epsilon_{total}$ 下，Fixed-size Batching的总噪声方差为：

$$\sigma_{total}^2 = \frac{T}{B} \cdot \frac{2(B\Delta)^2 \ln(1.25/\delta)}{(\epsilon_{total}/\sqrt{T/B})^2} = O\left(\frac{T^2 B \Delta^2}{\epsilon_{total}^2}\right)$$

而逐点更新的总噪声方差为：

$$\sigma_{point}^2 = T \cdot \frac{2\Delta^2 \ln(1.25/\delta)}{(\epsilon_{total}/\sqrt{T})^2} = O\left(\frac{T^2 \Delta^2}{\epsilon_{total}^2}\right)$$

### 最优批大小的推导

**定理3**（最优批大小）：在regret界 $R(T) = O(B + \sqrt{T \sigma^2})$ 的一般框架下，最优批大小为：

$$B^* = \arg\min_B \left\{B + \sqrt{T \cdot \frac{B \Delta^2}{\epsilon^2}}\right\}$$

通过对 $B$ 求导并令其为零：

$$\frac{d}{dB}\left(B + \sqrt{\frac{T B \Delta^2}{\epsilon^2}}\right) = 1 + \frac{1}{2}\sqrt{\frac{T \Delta^2}{B \epsilon^2}} = 0$$

解得：$$B^* = \frac{T \Delta^2}{4\epsilon^2}$$

## 具体应用：线性上下文赌博机

### 问题设定

在线性上下文赌博机中，期望奖励为：
$$\mathbb{E}[r_t | x_t, a_t] = \langle \theta^*, \phi(x_t, a_t) \rangle$$

其中 $\theta^* \in \mathbb{R}^d$ 是未知参数，$\phi(x_t, a_t) \in \mathbb{R}^d$ 是特征映射。

### Private-LSVI-UCB算法

**定理4**：Private-LSVI-UCB算法在噪声方差 $\sigma^2 \sim \frac{K}{e^2 B}$ 的设置下，满足 $(\epsilon, \delta)$-JDP并达到regret界：

$$R(T) \lesssim \text{poly}(H, d)\left(\sqrt{K} + \frac{K^{3/5}}{e^{2/5}}\right)$$

**证明思路**：
1. **隐私分析**：使用tree-based机制和高斯机制，通过advanced composition控制隐私损失
2. **Regret分析**：建立通用的批处理regret界
3. **优化**：平衡批处理项和噪声项

### 关键引理

**引理1**（批处理regret界）：对于总噪声 $\sigma_0^2 = \sigma^2$，有：

$$R(T) \lesssim \text{poly}(H, d)\left(B + d\sqrt{K} + \sqrt{\sigma_0 K}\right)$$

**引理2**（隐私损失控制）：在Fixed-size Batching下，dominated项为 $\tilde{U}^k$，通过advanced composition over $T/B$ 次更新，噪声方差为 $\sigma^2$。

## Adaptive方法的数学困境

### 为什么Adaptive Update失效？

在非隐私设置中，可以使用determinant-trick实现adaptive lazy update：

**更新条件**：$\det(V_t) \geq 2 \det(V_{t_{last}})$

其中 $V_t = \sum_{s=1}^{t} \phi(x_s, a_s) \phi(x_s, a_s)^T$

### 隐私设置下的问题

**问题1**：更新条件本身依赖于数据，可能泄露隐私信息。

**问题2**：标准的determinant-trick无法直接应用隐私保护。

设 $f(D) = \mathbb{I}[\det(V_D) \geq 2 \det(V_{D'})]$，则：

$$\mathbb{P}[f(D) = 1] - \mathbb{P}[f(D') = 1] = \mathbb{P}[\det(V_D) \geq 2 \det(V_{D'})] - \mathbb{P}[\det(V_{D'}) \geq 2 \det(V_{D'})]$$

这个差值可能很大，违反差分隐私约束。

## 扩展应用的数学分析

### Shuffle差分隐私

**定义**：Shuffle差分隐私中，机制 $\mathcal{M} = \mathcal{A} \circ \mathcal{S} \circ \mathcal{R}^n$ 满足 $(\epsilon, \delta)$-SDP，如果 $\mathcal{S} \circ \mathcal{R}^n$ 满足 $(\epsilon, \delta)$-DP。

**定理5**：在Shuffle模型下，Fixed-size Batching实现的regret界为：

$$R(T) = O\left(\text{poly}(d) \left(\sqrt{T} + \frac{T^{3/5}}{\epsilon^{2/5}}\right)\right)$$

### 联邦学习中的应用

**设定**：$K$ 个客户端，每个客户端 $i$ 有数据 $D_i$。

**定理6**：在联邦上下文赌博机中，使用Fixed-size Batching的regret界为：

$$R(T) = O\left(\sqrt{T \log K} + \frac{T^{2/3} \log K}{\epsilon^{2/3}}\right)$$

## 理论局限与开放问题

### 当前局限

1. **效率损失**：可能在不需要更新时强制更新
2. **批大小选择**：最优批大小依赖于未知参数
3. **延迟问题**：更新延迟可能影响在线性能

### 开放问题

**问题1**：是否存在私有的adaptive batching机制？

**问题2**：如何在保护隐私的前提下实现data-dependent的批大小选择？

**问题3**：Fixed-size Batching的下界是什么？

## 结论

Fixed-size Batching作为隐私保护机器学习的基础工具，其数学优势主要体现在：

1. **隐私损失控制**：通过减少更新次数，显著降低composition带来的隐私损失
2. **噪声分析简化**：提供了可分析的噪声-性能权衡框架
3. **理论保证**：为多种学习问题提供了严格的regret界

虽然Fixed-size Batching可能不如adaptive方法那样在非隐私设置中高效，但在隐私约束下，它提供了一个理论上可行且实践上有效的解决方案。随着隐私保护需求的增长，深入理解这一技术的数学基础将为设计更好的私有学习算法提供重要指导。

未来的研究方向包括：探索更sophisticated的批处理策略、分析Fixed-size Batching的信息论下界，以及设计能够在某种程度上自适应的私有批处理机制。这些理论进展将进一步推动隐私保护机器学习的发展。