export const isValidEmail = (email: string) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  return regex.test(email);
};

export const isValidPassword = (password: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]{8,}$/;
  return regex.test(password);
};

export const isValidUsername = (username: string) => {
  const regex = /^(?=.*[a-z])[a-z0-9]+$/;
  return regex.test(username);
};
