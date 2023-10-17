import * as Yup from 'yup'

import { Field, Formik, Form as FormikForm } from 'formik'

import Button from '../../Button/Button'
import { Checkbox } from '../Checkbox/Checkbox'
import Checkboxes from '../Checkbox/Checkboxes'
import FormField from '../FormField/FormField'
import Input from '../Input/Input' // Corrected case
import React from 'react'
import { clsx } from 'clsx'
import styles from './Form.module.css'

interface DemoFormProps {
  id?: string
  className?: string
}

const initialValues = {
  name: 'test',
  email: 'test@test.com',
  message: 'test',
  color: 'blue',
  radiofield: 'option-2',
  checkboxfield: ['option-1', 'option-2'],
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  message: Yup.string().required('Message is required'),
  checkboxfield: Yup.array()
    .of(Yup.string())
    .min(1, 'Please select at least one option'),
})

const DemoForm: React.FC<DemoFormProps> = ({
  id,
  className,
  ...props
}: DemoFormProps) => {
  const handleSubmit = (values: any) => {
    // Handle form submission here, e.g., make an API call
    console.log(values)
    alert('GO')
  }

  // Set styles
  const formClasses = clsx(
    'form u-bgColorWhite u-padding8gu',
    styles['form'],
    className
  )

  return (
    <div className={formClasses}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <FormField label='Name' name='name' description={'your full name'}>
            <Input placeholder='name' name='name' />
          </FormField>

          <FormField label='Email' name='email'>
            <Input placeholder='email' type='email' name='email' />
          </FormField>

          <FormField
            label='Message'
            name='message'
            description='Enter your message'
          >
            <Field as='textarea' name='message' />
          </FormField>

          <FormField name='selectone' label='select one'>
            <Field as='select' name='color'>
              <option value='red'>Red</option>
              <option value='green'>Green</option>
              <option value='blue'>Blue</option>
            </Field>
          </FormField>

          <FormField name='checkboxfield'>
            <Checkboxes className={'grid--justify-start'} legend='pick some'>
              <Checkbox
                name='checkboxfield'
                type='checkbox'
                value='option-1'
                label='Option One'
              />
              <Checkbox
                name='checkboxfield'
                type='checkbox'
                value='option-2'
                label='Option Two'
              />
              <Checkbox
                name='checkboxfield'
                type='checkbox'
                value='option-3'
                label='Option Three'
              />
            </Checkboxes>
          </FormField>

          <FormField name='radiofield'>
            <Checkboxes direction={'vertical'} legend='pick one'>
              <Checkbox name='radiofield' type='radio' value='option-1' />
              <Checkbox name='radiofield' type='radio' value='option-2' />
            </Checkboxes>
          </FormField>

          <Button type='submit'>Submit</Button>
        </FormikForm>
      </Formik>
    </div>
  )
}

export default DemoForm
