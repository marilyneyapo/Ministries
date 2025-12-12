export const validationRules = {
  required: (message = 'Ce champ est requis') => ({
    required: message
  }),

  email: (message = 'Email invalide') => ({
    email: message
  }),

  minLength: (length, message) => ({
    minLength: {
      value: length,
      message: message || `Minimum ${length} caractères requis`
    }
  }),

  maxLength: (length, message) => ({
    maxLength: {
      value: length,
      message: message || `Maximum ${length} caractères autorisés`
    }
  }),

  phone: (message = 'Numéro de téléphone invalide') => ({
    pattern: {
      value: /^(\+33|0)[1-9](\d{8})$/,
      message
    }
  }),

  age: (min = 0, max = 120, message) => ({
    min: {
      value: min,
      message: message || `L'âge doit être supérieur à ${min} ans`
    },
    max: {
      value: max,
      message: message || `L'âge doit être inférieur à ${max} ans`
    }
  })
}

export const validateField = (value, rules) => {
  for (const rule of rules) {
    if (rule.required && (!value || value.toString().trim() === '')) {
      return rule.required
    }

    if (rule.email && value && !isValidEmail(value)) {
      return rule.email
    }

    if (rule.minLength && value && value.length < rule.minLength.value) {
      return rule.minLength.message
    }

    if (rule.maxLength && value && value.length > rule.maxLength.value) {
      return rule.maxLength.message
    }

    if (rule.pattern && value && !rule.pattern.value.test(value)) {
      return rule.pattern.message
    }

    if (rule.min && value && parseInt(value) < rule.min.value) {
      return rule.min.message
    }

    if (rule.max && value && parseInt(value) > rule.max.value) {
      return rule.max.message
    }
  }

  return null
}

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+33|0)[1-9](\d{8})$/
  return phoneRegex.test(phone)
}

export const isValidDate = (date) => {
  const dateObj = new Date(date)
  return dateObj instanceof Date && !isNaN(dateObj)
}