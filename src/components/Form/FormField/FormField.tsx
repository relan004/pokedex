import React, { ReactNode } from 'react'
import { useField, useFormikContext } from 'formik'

import clsx from 'clsx'
import styles from './FormField.module.css'

interface FormFieldProps {
  id?: string
  name: string
  label?: string
  className?: string
  description?: string
  error?: string
  formPrefix?: string
  children: ReactNode
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  formPrefix,
  label,
  description,
  error,
  className,
  children,
  ...props
}: FormFieldProps) => {
  const formik = useFormikContext()
  const [field, meta] = useField(props.name)

  // Generate fieldID
  const fieldId = `${formPrefix || 'form'}_field_${
    id || (label || '').replace(/ /g, '_').toLowerCase()
  }`

  // Set styles
  const formFieldClasses = clsx('form-field', styles['form-field'], className)

  return (
    <div className={formFieldClasses} {...props}>
      {label && (
        <label htmlFor={fieldId} className={styles['form-field__label']}>
          {label}
        </label>
      )}
      {/* add id to children */}
      {React.cloneElement(children as React.ReactElement, { id: fieldId })}
      {description && (
        <div className={styles['form-field__description']}>{description}</div>
      )}

      {meta?.error && meta?.touched && (
        <div className={styles['form-field__error']}>{meta.error}</div>
      )}
    </div>
  )
}

export default FormField
