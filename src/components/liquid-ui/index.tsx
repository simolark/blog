'use client'

import React, { useState, useEffect, ReactNode } from 'react'

// 液态玻璃卡片组件
interface LiquidCardProps {
  children: ReactNode
  className?: string
  variant?: 'default' | 'hover' | 'glow' | 'border-animated'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export const LiquidCard: React.FC<LiquidCardProps> = ({ 
  children, 
  className = '', 
  variant = 'default',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'p-4 rounded-2xl',
    md: 'p-6 rounded-3xl',
    lg: 'p-8 rounded-3xl',
    xl: 'p-10 rounded-3xl'
  }

  const variantClasses = {
    default: 'liquid-glass backdrop-blur-lg border border-white/20',
    hover: 'liquid-glass backdrop-blur-lg border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500',
    glow: 'liquid-glass backdrop-blur-lg border border-white/20 hover:shadow-2xl hover:shadow-blue-500/20',
    'border-animated': 'liquid-glass backdrop-blur-lg border border-white/20 relative overflow-hidden'
  }

  return (
    <div className={`${variantClasses[variant]} ${sizeClasses[size]} ${className}`}>
      {variant === 'border-animated' && (
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

// 液态玻璃按钮组件
interface LiquidButtonProps {
  children: ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost' | 'ripple'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  className?: string
}

export const LiquidButton: React.FC<LiquidButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const variantClasses = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700',
    secondary: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700',
    ghost: 'bg-white/10 border-2 border-white/30 text-gray-700 hover:bg-white/20',
    ripple: 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 relative overflow-hidden'
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${variantClasses[variant]} ${sizeClasses[size]} rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 backdrop-blur-lg ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {variant === 'ripple' && (
        <div className="absolute inset-0 bg-white/20 transform scale-0 group-active:scale-100 transition-transform duration-300 rounded-full"></div>
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}

// 液态玻璃输入框组件
interface LiquidInputProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  type?: 'text' | 'email' | 'password' | 'search'
  className?: string
}

export const LiquidInput: React.FC<LiquidInputProps> = ({
  placeholder,
  value,
  onChange,
  type = 'text',
  className = ''
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      className={`liquid-glass rounded-2xl px-4 py-3 w-full focus:outline-none focus:shadow-lg placeholder:text-black/50 backdrop-blur-lg border border-white/20 ${className}`}
    />
  )
}

// 液态玻璃导航栏组件
interface LiquidNavProps {
  items: Array<{
    label: string
    href?: string
    onClick?: () => void
    active?: boolean
  }>
  className?: string
}

export const LiquidNav: React.FC<LiquidNavProps> = ({ items, className = '' }) => {
  return (
    <nav className={`liquid-glass rounded-full px-6 py-3 backdrop-blur-lg border border-white/20 ${className}`}>
      <div className="flex items-center space-x-6">
        {items.map((item, index) => (
          <a
            key={index}
            href={item.href}
            onClick={item.onClick}
            className={`transition-all duration-300 font-medium ${
              item.active 
                ? 'text-blue-600 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent' 
                : 'text-gray-700 hover:text-blue-600'
            }`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  )
}

// 液态玻璃标签组件
interface LiquidTagProps {
  children: ReactNode
  color?: 'blue' | 'purple' | 'pink' | 'emerald' | 'amber' | 'teal'
  className?: string
}

export const LiquidTag: React.FC<LiquidTagProps> = ({ 
  children, 
  color = 'blue', 
  className = '' 
}) => {
  const colorClasses = {
    blue: 'bg-blue-500/20 text-blue-700 hover:bg-blue-500/30',
    purple: 'bg-purple-500/20 text-purple-700 hover:bg-purple-500/30',
    pink: 'bg-pink-500/20 text-pink-700 hover:bg-pink-500/30',
    emerald: 'bg-emerald-500/20 text-emerald-700 hover:bg-emerald-500/30',
    amber: 'bg-amber-500/20 text-amber-700 hover:bg-amber-500/30',
    teal: 'bg-teal-500/20 text-teal-700 hover:bg-teal-500/30'
  }

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium backdrop-blur-lg border border-white/20 transition-all duration-300 hover:scale-105 ${colorClasses[color]} ${className}`}>
      {children}
    </span>
  )
}

// 液态玻璃模态框组件
interface LiquidModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  className?: string
}

export const LiquidModal: React.FC<LiquidModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  className = ''
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 模态内容 */}
      <div className={`liquid-glass rounded-3xl p-8 max-w-lg mx-auto backdrop-blur-lg border border-white/20 shadow-2xl relative z-10 ${className}`}>
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100/50 transition-colors duration-200"
            >
              ✕
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

// 液态玻璃进度条组件
interface LiquidProgressProps {
  value: number // 0-100
  showValue?: boolean
  className?: string
}

export const LiquidProgress: React.FC<LiquidProgressProps> = ({
  value,
  showValue = false,
  className = ''
}) => {
  return (
    <div className={`liquid-glass rounded-full h-2 overflow-hidden backdrop-blur-lg border border-white/20 ${className}`}>
      <div 
        className="h-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
      {showValue && (
        <div className="text-center mt-2 text-sm font-medium">
          {Math.round(value)}%
        </div>
      )}
    </div>
  )
}

// 液态玻璃加载器组件
interface LiquidLoaderProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const LiquidLoader: React.FC<LiquidLoaderProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <div className="liquid-glass rounded-full backdrop-blur-lg border border-white/20 p-1">
        <div className="w-full h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

// 液态玻璃通知组件
interface LiquidToastProps {
  message: string
  type?: 'info' | 'success' | 'warning' | 'error'
  isVisible: boolean
  onClose: () => void
}

export const LiquidToast: React.FC<LiquidToastProps> = ({
  message,
  type = 'info',
  isVisible,
  onClose
}) => {
  const typeColors = {
    info: 'bg-blue-500/90 text-white',
    success: 'bg-emerald-500/90 text-white',
    warning: 'bg-amber-500/90 text-white',
    error: 'bg-red-500/90 text-white'
  }

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onClose])

  if (!isVisible) return null

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className={`liquid-glass p-4 rounded-2xl backdrop-blur-lg border border-white/20 shadow-2xl ${typeColors[type]}`}>
        <div className="flex items-center justify-between">
          <span className="font-medium">{message}</span>
          <button
            onClick={onClose}
            className="ml-4 opacity-80 hover:opacity-100 transition-opacity duration-200"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}

// 液态玻璃背景组件
interface LiquidBackgroundProps {
  variant?: 'gradient' | 'mesh' | 'flow'
  className?: string
  children?: ReactNode
}

export const LiquidBackground: React.FC<LiquidBackgroundProps> = ({
  variant = 'gradient',
  className = '',
  children
}) => {
  const variantClasses = {
    gradient: 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50',
    mesh: 'bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50',
    flow: 'bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5'
  }

  return (
    <div className={`min-h-screen ${variantClasses[variant]} ${className}`}>
      {children}
    </div>
  )
}

// 液态玻璃面板组件
interface LiquidPanelProps {
  children: ReactNode
  title?: string
  actions?: ReactNode
  className?: string
}

export const LiquidPanel: React.FC<LiquidPanelProps> = ({
  children,
  title,
  actions,
  className = ''
}) => {
  return (
    <div className={`liquid-glass rounded-3xl overflow-hidden backdrop-blur-lg border border-white/20 ${className}`}>
      {(title || actions) && (
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          {title && <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{title}</h3>}
          {actions && <div className="flex space-x-2">{actions}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  )
} 