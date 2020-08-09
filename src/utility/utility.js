export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  }
}

export const checkValidity = (value) => {
  let isValid = false

  if (value) isValid = true

  return isValid
}
