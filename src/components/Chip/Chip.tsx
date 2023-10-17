import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './Chip.module.css'

interface ChipProps {
  color: string
  onClick?: any
  children: ReactNode
}

export default function Chip({ color, children, ...props }: ChipProps) {
  return (
    <div
      className={`${styles.chip} bg-${color} ${
        props.onClick ? 'cursor-pointer' : ''
      }`}
      {...props}
    >
      {children}
    </div>
  )
}
