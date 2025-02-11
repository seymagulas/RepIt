export const authHeader = () => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return { Authorization: `Bearer ${accessToken}` };
  } else {
    return { Authorization: "" };
  }
};
