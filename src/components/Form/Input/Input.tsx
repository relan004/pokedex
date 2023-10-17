import React, { ReactNode } from 'react'
import { useField, useFormikContext } from 'formik'

import clsx from 'clsx'
import styles from './Input.module.css'

interface InputProps {
  id?: string
  name: string
  type?: string
  value?: string
  icon?: ReactNode
  iconPos?: string
  placeholder?: string
  className?: string
}

const Input: React.FC<InputProps> = ({
  id,
  value,
  icon,
  iconPos,
  className,
  ...props
}: InputProps) => {
  const formik = useFormikContext()
  const [field, meta] = useField(props.name)

  // Set styles
  const InputContainerClasses = clsx(
    styles['input-container'],
    iconPos ? styles[`input-container--icon-${iconPos}`] : '',
    className
  )
  const InputClasses = clsx(
    styles['input'],
    icon ? styles['input--icon'] : '',
    className
  )

  return (
    <div className={InputContainerClasses}>
      {icon && <div className={clsx(styles['icon'])}>{icon}</div>}
      <input
        id={id || props.name}
        className={InputClasses}
        {...field}
        {...props}
      />
    </div>
  )
}

export default Input
