export const emailValidator = (
  pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  message = "Invalid Email"
) => ({
  value: pattern,
  message: message,
});

export const atleastOneIntegerandOneCharacter = (
  pattern = /^(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[a-z A-Z])(?=\S*\d)(?=\S*[^\w\s])\S{8,}$/,
  message = "Password must contain at least one lowercase character, one uppercase character, one number and one special character. Password cannot contain spaces."
) => ({
  value: pattern,
  message: message,
});

export const emailError = (error) => {
  let errorMsg = "";
  if (error.code === "auth/user-not-found") {
    errorMsg = "This email is not registered!";
  } else if (error.code === "auth/user-disabled") {
    errorMsg = "Your account has been disabled by admin!";
  } else if (error.code === "auth/invalid-email") {
    errorMsg = "That email address is invalid!";
  } else if (error.code === "auth/wrong-password") {
    errorMsg = "Invalid Password";
  } else if (error.code === "auth/too-many-requests") {
    errorMsg = "Access to this account has been temporarily disabled!";
  } else if (error.code === "auth/network-request-failed") {
    errorMsg = "Please check your internet connection!";
  } else if (error.code === "auth/internal-error") {
    errorMsg = "An internal error has occurred, please try again!";
  } else if (error.code === "auth/email-already-in-use") {
    errorMsg = "Email is already in use!";
  }
  return errorMsg;
};
