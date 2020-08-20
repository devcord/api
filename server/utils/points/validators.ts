const validGetUser = (params): boolean => {
  if (!Object.keys(params).includes('id')) return false

  return true
}

const validUserDays = (params): boolean => {
  if (!Object.keys(params).includes('days')) return false
  if (typeof params.days !== 'number') return false

  return true
}

const validTopDays = (params): boolean => {
  if (!Object.keys(params).includes('days')) return false
  if (typeof params.days !== 'number') return false

  return true
}


export { validGetUser, validUserDays, validTopDays }
