export const getErrorMessage = (error) => {
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
