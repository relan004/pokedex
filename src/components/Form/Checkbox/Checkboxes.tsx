import React from 'react'
import { ReactNode } from 'react' // Added ReactNode
import { clsx } from 'clsx'
import styles from './Checkbox.module.css'

interface CheckboxesProps {
  direction?: string
  legend?: string
  className?: string
  children?: ReactNode
}

const Checkboxes: React.FC<CheckboxesProps> = ({
  direction,
  legend,
  className,
  children,
}: CheckboxesProps) => {
  return (
    <fieldset
      className={clsx(
        'flex',
        direction == 'vertical' ? 'flex-col' : 'flex-row gap-4',
        className
      )}
    >
      {legend && (
        <legend className={styles['checkbox__label']}>{legend}</legend>
      )}
      {children}
    </fieldset>
  )
}

// Prop defaults
Checkboxes.defaultProps = {
  direction: 'horizontal',
  legend: '',
}

export default Checkboxes
