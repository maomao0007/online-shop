export function handleError(error, showMessage, navigate = null) {
  let msg = "Something went wrong. Please try again later.";

  if (error.response?.status === 401) {
    msg = "Please log in to continue.";
    showMessage({ title: "Error", text: msg, type: "warning" });

    if (navigate) {
      navigate("/login");
    }

    return; // 直接跳出，避免顯示兩次
  }

  if (error.response?.data?.message) {
    msg = error.response.data.message;
  }

  showMessage({ title: "Error", text: msg, type: "danger" });
}
