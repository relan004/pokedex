import * as Yup from 'yup'

import { Checkbox, CheckboxFormless } from '../Checkbox/Checkbox'
import { Formik, Form as FormikForm } from 'formik'

import Button from '../../Button/Button'
import Checkboxes from '../Checkbox/Checkboxes'
import Chip from '@/components/Chip/Chip'
import FormField from '../FormField/FormField'
import Input from '../Input/Input' // Corrected case
import React from 'react'
import { clsx } from 'clsx'
import styles from './Form.module.css'

interface SearchFormProps {
  id?: string
  handleSearch: any
  handleFilter: any
  className?: string
}

const initialValues = {
  name: '',
  pokemon_type: '',
}

const validationSchema = Yup.object().shape({
  // name: Yup.string().required('Name is required'),
  // pokemon_types: Yup.array()
  //   .of(Yup.string())
  //   .min(1, 'Please select at least one option'),
})

const SearchForm: React.FC<SearchFormProps> = ({
  id,
  handleSearch,
  handleFilter,
  className,
  ...props
}: SearchFormProps) => {
  const handleSubmit = (values: any) => {
    handleSearch(values)
  }

  // Set styles
  const formClasses = clsx(styles['form'], className)

  return (
    <div className={formClasses} {...props}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <FormikForm>
          <div className='flex gap-4 mb-4'>
            <FormField label='Search by name' name='name'>
              <Input className='h-10' placeholder='name' name='name' />
            </FormField>
            {/* <FormField name='filter_type'>
              <Checkboxes direction={'horizontal'} legend='boop'>
                <CheckboxFormless
                  name='filter_type'
                  type='radio'
                  value='grass'
                />
                <CheckboxFormless
                  name='filter_type'
                  type='radio'
                  value='fire'
                />
                <CheckboxFormless
                  name='filter_type'
                  type='radio'
                  value='water'
                />
                <CheckboxFormless
                  name='filter_type'
                  type='radio'
                  value='flying'
                />
                <CheckboxFormless
                  name='filter_type'
                  type='radio'
                  value='electricity'
                />
              </Checkboxes>
            </FormField> */}
            <Button className='self-end h-10' type='submit'>
              Submit
            </Button>
          </div>
        </FormikForm>
      </Formik>

      <div className='flex flex-wrap gap-2 text-xs'>
        <Chip onClick={() => handleFilter('')} color='neutral-500'>
          All
        </Chip>
        <Chip onClick={() => handleFilter('grass')} color='green-500'>
          Grass
        </Chip>
        <Chip onClick={() => handleFilter('water')} color='blue-500'>
          Water
        </Chip>
        <Chip onClick={() => handleFilter('fire')} color='red-500'>
          Fire
        </Chip>
        <Chip onClick={() => handleFilter('flying')} color='stone-500'>
          Flying
        </Chip>
        <Chip onClick={() => handleFilter('electric')} color='yellow-500'>
          Electric
        </Chip>
        <Chip onClick={() => handleFilter('ghost')} color='purple-500'>
          Ghost
        </Chip>
        <Chip onClick={() => handleFilter('fighting')} color='orange-500'>
          Fighting
        </Chip>
      </div>
    </div>
  )
}

export default SearchForm
