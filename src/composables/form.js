import { reactive, ref } from 'vue'

export function useForm(initialData = {}) {
  const form = reactive({ ...initialData })
  const errors = reactive({})
  const isSubmitting = ref(false)
  
  const setField = (field, value) => {
    form[field] = value
    if (errors[field]) {
      delete errors[field]
    }
  }
  
  const setError = (field, message) => {
    errors[field] = message
  }
  
  const clearErrors = () => {
    Object.keys(errors).forEach(key => delete errors[key])
  }
  
  const reset = () => {
    Object.keys(form).forEach(key => delete form[key])
    Object.assign(form, initialData)
    clearErrors()
  }

  const validate = (rules) => {
    clearErrors()
    let isValid = true

    Object.keys(rules).forEach(field => {
      const rule = rules[field]
      const value = form[field]

      if (rule.required && (!value || value.toString().trim() === '')) {
        setError(field, rule.required)
        isValid = false
      } else if (rule.email && value && !isValidEmail(value)) {
        setError(field, rule.email)
        isValid = false
      } else if (rule.minLength && value && value.length < rule.minLength.value) {
        setError(field, rule.minLength.message)
        isValid = false
      } else if (rule.maxLength && value && value.length > rule.maxLength.value) {
        setError(field, rule.maxLength.message)
        isValid = false
      }
    })

    return isValid
  }

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const submit = async (submitFn) => {
    if (isSubmitting.value) return

    isSubmitting.value = true
    try {
      await submitFn(form)
    } catch (error) {
      console.error('Form submission error:', error)
      throw error
    } finally {
      isSubmitting.value = false
    }
  }
  
  return {
    form,
    errors,
    isSubmitting,
    setField,
    setError,
    clearErrors,
    reset,
    validate,
    submit
  }
}