import moment from 'moment'

export const formatDateWithMoment = (date: Date) => {
  const momentDate = moment(date)
  if (!momentDate.isValid()) return ''
  return momentDate.format('DD/MM/YYYY')
}
export const formatDateWithMomentHs = (date: Date) => {
  const momentDate = moment(date)
  if (!momentDate.isValid()) return ''
  return momentDate.format('DD/MM/YYYY HH:mm')
}
export const formatDateWithMomentHsm = (date: Date) => {
  const momentDate = moment(date)
  if (!momentDate.isValid()) return ''
  return momentDate.format('DD/MM/YYYY HH:mm:ss SSS')
}
