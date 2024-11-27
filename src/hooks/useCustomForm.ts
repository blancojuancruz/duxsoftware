/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ChangeEvent } from 'react'
import { DropdownChangeEvent } from 'primereact/dropdown'

type FieldValues = Record<string, any>

interface FormState<T extends FieldValues> {
  values: T
  errors: Partial<Record<keyof T, string>>
  touched: Partial<Record<keyof T, boolean>>
}

type Validator<T> = (value: T[keyof T]) => string | undefined

export const useFormCustom = <T extends FieldValues>(
  initialValues: T,
  validators: Partial<Record<keyof T, Validator<T>>>
) => {
  const [formState, setFormState] = useState<FormState<T>>({
    values: initialValues,
    errors: {},
    touched: {}
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    updateFormState(name, value)
  }

  const handleDropdownChange = (e: DropdownChangeEvent) => {
    const name = e.target.name || e.target.id
    const value = e.value
    updateFormState(name, value)
  }

  const updateFormState = (name: string, value: any) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, [name]: value },
      touched: { ...prev.touched, [name]: true }
    }))

    if (validators[name as keyof T]) {
      const error = validators[name as keyof T]!(value as T[keyof T])
      setFormState((prev) => ({
        ...prev,
        errors: { ...prev.errors, [name]: error }
      }))
    }
  }

  const reset = () => {
    setFormState({
      values: { ...initialValues },
      errors: {},
      touched: {}
    })
  }

  const setValues = (newValues: Partial<T>) => {
    setFormState((prev) => ({
      ...prev,
      values: { ...prev.values, ...newValues }
    }))
  }

  const validateUserForm = (): boolean => {
    const newErrors: Partial<Record<keyof T, string>> = {}
    let isValid = true

    for (const field in formState.values) {
      const value = formState.values[field]
      const validator = validators[field as keyof T]
      if (validator) {
        const error = validator(value)
        if (error) {
          isValid = false
          newErrors[field as keyof T] = error
        }
      }
    }

    setFormState((prev) => ({ ...prev, errors: newErrors }))
    return isValid
  }

  return {
    values: formState.values,
    errors: formState.errors,
    touched: formState.touched,
    handleInputChange,
    handleDropdownChange,
    reset,
    validateUserForm,
    setFormState,
    setValues
  }
}
