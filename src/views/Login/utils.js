export const getErrorMessage = (error) => {
  error = error || error.code
  let errorMsg = ''
  if (error === 'auth/user-not-found') {
    errorMsg = 'This email is not registered!'
  } else if (error === 'auth/user-disabled') {
    errorMsg = 'Your account has been disabled by admin!'
  } else if (error === 'auth/invalid-email') {
    errorMsg = 'That email address is invalid!'
  } else if (error === 'auth/wrong-password') {
    errorMsg = 'Invalid Password'
  } else if (error === 'auth/too-many-requests') {
    errorMsg = 'Access to this account has been temporarily disabled!'
  } else if (error === 'auth/network-request-failed') {
    errorMsg = 'Please check your internet connection!'
  } else if (error === 'auth/internal-error') {
    errorMsg = 'An internal error has occurred, please try again!'
  } else if (error === 'auth/email-already-in-use') {
    errorMsg = 'Email is already in use!'
  } else if (error === 'permission-error') {
    errorMsg = 'You don`t have permission to delete Adminsitrator!'
  }
  return errorMsg
}
