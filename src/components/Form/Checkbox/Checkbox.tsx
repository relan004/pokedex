import { useField, useFormikContext } from 'formik'

import React from 'react'
import { clsx } from 'clsx'
import styles from './Checkbox.module.css'

interface CheckboxProps {
  id?: string
  name: string
  type?: string
  value?: string
  label?: string
  className?: string
}

const Checkbox: React.FC<CheckboxProps> = ({
  id,
  label,
  ...props
}: CheckboxProps) => {
  const formik = useFormikContext()
  const [field] = useField(props)

  //default id
  if (!id) {
    id = `${props.name}-${props.value}`.replace(' ', '_')
  }

  // Set styles
  const CheckboxContainerClasses = clsx(
    styles['checkbox-container'],
    props.className
  )

  return (
    <div className={CheckboxContainerClasses}>
      <input id={id} {...field} {...props} />
      <label htmlFor={id}>{label || props.value}</label>
    </div>
  )
}

Checkbox.defaultProps = {
  type: 'checkbox',
}

const CheckboxFormless: React.FC<CheckboxProps> = ({
  id,
  label,
  className,
  ...props
}: CheckboxProps) => {
  //default id
  if (!id) {
    id = `${props.name}-${props.value}`.replace(' ', '_')
  }

  // Set styles
  const CheckboxContainerClasses = clsx(
    styles['checkbox__container'],
    className
  )

  return (
    <div className={CheckboxContainerClasses}>
      <input id={id} className={styles[`${props.type}`]} {...props} />
      <label htmlFor={id} className={styles['checkbox__label']}>
        {label || props.value}
      </label>
    </div>
  )
}

CheckboxFormless.defaultProps = {
  type: 'checkbox',
}

export { Checkbox, CheckboxFormless }
