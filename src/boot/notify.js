import { Notify } from 'quasar'

export const showSuccess = (message = 'Success') => {
  Notify.create({
    type: 'positive',
    message,
    position: 'top',
    timeout: 2500,
    progress: true,
  })
}

export const showError = (message = 'Something went wrong') => {
  Notify.create({
    type: 'negative',
    message,
    position: 'top',
    timeout: 3000,
    progress: true,
  })
}

export default ({ app }) => {
  app.config.globalProperties.$showSuccess = showSuccess
  app.config.globalProperties.$showError = showError
}
