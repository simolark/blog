'use client'

import React, { useState } from 'react'
import {
  LiquidCard,
  LiquidButton,
  LiquidInput,
  LiquidNav,
  LiquidTag,
  LiquidModal,
  LiquidProgress,
  LiquidLoader,
  LiquidToast,
  LiquidBackground,
  LiquidPanel
} from '../../components/liquid-ui'

export default function LiquidDemo() {
  const [modalOpen, setModalOpen] = useState(false)
  const [progress, setProgress] = useState(65)
  const [toastVisible, setToastVisible] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const navItems = [
    { label: '首页', href: '/', active: true },
    { label: '关于', href: '/about' },
    { label: '博客', href: '/blog' },
    { label: '联系', href: '/contact' }
  ]

  return (
    <LiquidBackground variant="mesh" className="liquid-page-enter">
      <div className="container mx-auto px-4 py-8">
        
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold liquid-text-gradient mb-4">
            液态玻璃设计语言
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            融合苹果2025年WWDC液态玻璃效果的现代UI设计系统，
            带来前所未有的视觉体验和交互感受。
          </p>
        </div>

        {/* 导航栏示例 */}
        <div className="mb-12">
          <LiquidNav items={navItems} className="mb-4" />
          <p className="text-sm text-gray-500 text-center">液态玻璃导航栏 - 自适应模糊背景</p>
        </div>

        {/* 卡片展示区域 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          
          {/* 基础卡片 */}
          <LiquidCard variant="default" size="md">
            <h3 className="text-lg font-semibold mb-3 liquid-text-gradient">基础液态卡片</h3>
            <p className="text-gray-600 mb-4">
              采用液态玻璃材质，具有半透明背景和模糊效果，
              提供优雅的视觉层次感。
            </p>
            <LiquidTag color="blue">默认样式</LiquidTag>
          </LiquidCard>

          {/* 悬浮卡片 */}
          <LiquidCard variant="hover" size="md">
            <h3 className="text-lg font-semibold mb-3 liquid-text-gradient">悬浮效果卡片</h3>
            <p className="text-gray-600 mb-4">
              鼠标悬停时会产生轻柔的浮动效果和阴影变化，
              增强交互反馈。
            </p>
            <LiquidTag color="purple">悬浮交互</LiquidTag>
          </LiquidCard>

          {/* 发光卡片 */}
          <LiquidCard variant="glow" size="md">
            <h3 className="text-lg font-semibold mb-3 liquid-text-gradient">发光效果卡片</h3>
            <p className="text-gray-600 mb-4">
              具有柔和的发光边框效果，在悬停时会产生
              更加明显的光晕效果。
            </p>
            <LiquidTag color="pink">光效增强</LiquidTag>
          </LiquidCard>

        </div>

        {/* 交互组件展示 */}
        <LiquidPanel title="交互组件展示" className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 按钮组合 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 liquid-text-gradient">液态按钮</h4>
              <div className="space-y-3">
                <LiquidButton variant="primary" onClick={() => setToastVisible(true)}>
                  主要按钮
                </LiquidButton>
                <LiquidButton variant="secondary" onClick={() => setModalOpen(true)}>
                  次要按钮
                </LiquidButton>
                <LiquidButton variant="ghost">
                  透明按钮
                </LiquidButton>
                <LiquidButton variant="ripple">
                  涟漪效果
                </LiquidButton>
              </div>
            </div>

            {/* 输入框和标签 */}
            <div>
              <h4 className="text-lg font-semibold mb-4 liquid-text-gradient">输入组件</h4>
              <div className="space-y-4">
                <LiquidInput
                  placeholder="输入您的内容..."
                  value={inputValue}
                  onChange={setInputValue}
                />
                <div className="flex flex-wrap gap-2">
                  <LiquidTag color="blue">前端开发</LiquidTag>
                  <LiquidTag color="purple">设计系统</LiquidTag>
                  <LiquidTag color="emerald">用户体验</LiquidTag>
                  <LiquidTag color="amber">创新设计</LiquidTag>
                </div>
              </div>
            </div>

          </div>
        </LiquidPanel>

        {/* 进度条和加载器 */}
        <LiquidPanel title="状态指示器" className="mb-12">
          <div className="space-y-6">
            
            {/* 进度条 */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">项目进度</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <LiquidProgress value={progress} />
              <div className="flex space-x-2 mt-3">
                <LiquidButton 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setProgress(Math.max(0, progress - 10))}
                >
                  -10%
                </LiquidButton>
                <LiquidButton 
                  size="sm" 
                  variant="ghost"
                  onClick={() => setProgress(Math.min(100, progress + 10))}
                >
                  +10%
                </LiquidButton>
              </div>
            </div>

            {/* 加载器 */}
            <div>
              <h5 className="text-sm font-medium mb-3">液态加载器</h5>
              <div className="flex items-center space-x-4">
                <LiquidLoader size="sm" />
                <LiquidLoader size="md" />
                <LiquidLoader size="lg" />
                <span className="text-sm text-gray-500">不同尺寸的液态加载动画</span>
              </div>
            </div>

          </div>
        </LiquidPanel>

        {/* 边框动画卡片 */}
        <div className="mb-12">
          <LiquidCard variant="border-animated" size="lg">
            <div className="text-center py-8">
              <h3 className="text-2xl font-bold liquid-text-gradient mb-4">
                动态边框效果
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                这个卡片具有流动的彩色边框动画，模拟液态光效在边缘流动的视觉效果，
                展现了液态玻璃设计语言的动态美学。
              </p>
              <div className="flex justify-center space-x-4">
                <LiquidTag color="blue">动态边框</LiquidTag>
                <LiquidTag color="purple">光效流动</LiquidTag>
                <LiquidTag color="pink">视觉增强</LiquidTag>
              </div>
            </div>
          </LiquidCard>
        </div>

        {/* 设计原则说明 */}
        <LiquidPanel title="设计原则" className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 liquid-glass rounded-full flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h4 className="font-semibold mb-2">透明度层次</h4>
              <p className="text-sm text-gray-600">
                使用不同透明度创建视觉层次，增强内容的可读性和美观性。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 liquid-glass rounded-full flex items-center justify-center">
                <span className="text-2xl">🌊</span>
              </div>
              <h4 className="font-semibold mb-2">流动动画</h4>
              <p className="text-sm text-gray-600">
                柔和的动画效果模拟液体的自然流动，提供沉浸式体验。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 liquid-glass rounded-full flex items-center justify-center">
                <span className="text-2xl">🎨</span>
              </div>
              <h4 className="font-semibold mb-2">色彩融合</h4>
              <p className="text-sm text-gray-600">
                渐变色彩与模糊效果结合，创造梦幻般的视觉效果。
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 liquid-glass rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">响应交互</h4>
              <p className="text-sm text-gray-600">
                即时的交互反馈和平滑的状态转换提升用户体验。
              </p>
            </div>

          </div>
        </LiquidPanel>

      </div>

      {/* 模态框 */}
      <LiquidModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="液态玻璃模态框"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            这是一个使用液态玻璃效果的模态框，具有模糊背景和优雅的动画效果。
          </p>
          <LiquidInput placeholder="在模态框中输入..." />
          <div className="flex justify-end space-x-3">
            <LiquidButton variant="ghost" onClick={() => setModalOpen(false)}>
              取消
            </LiquidButton>
            <LiquidButton variant="primary" onClick={() => setModalOpen(false)}>
              确认
            </LiquidButton>
          </div>
        </div>
      </LiquidModal>

      {/* 通知提示 */}
      <LiquidToast
        message="液态玻璃设计语言体验开始！"
        type="success"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

    </LiquidBackground>
  )
} 