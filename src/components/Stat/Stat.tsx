import clsx from 'clsx'
import styles from './Stat.module.css'

interface StatProps {
  label: string
  value: number
}

export default function Stat({ label, value }: StatProps) {
  const statClass = clsx(
    styles['stat__base'],
    value < 50
      ? 'border-red-400 bg-red-100'
      : value < 85
      ? 'border-yellow-400 bg-yellow-100'
      : 'border-green-400 bg-green-100'
  )
  return (
    <div className={styles['stat']}>
      <div className={statClass}>{value}</div>
      <div className={styles['stat__label']}>{label}</div>
    </div>
  )
}
