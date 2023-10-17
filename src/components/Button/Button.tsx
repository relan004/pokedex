import React, { ButtonHTMLAttributes, ReactNode } from 'react'

import clsx from 'clsx'
import styles from './Button.module.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'text'
  size?: 'sm' | 'md' | 'lg'
  color?: string
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant,
  size,
  color,
  fullWidth,
  className,
  children,
  ...props
}: ButtonProps) => {
  // Set styles
  const buttonClasses = clsx(styles.btn, className)

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

// Prop defaults
Button.defaultProps = {
  variant: 'solid',
  size: 'md',
  color: 'neutral',
  fullWidth: false,
}

export default Button
