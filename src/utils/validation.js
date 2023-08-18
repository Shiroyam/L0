export const validateEmail = (email) => {
  const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  return regex.test(email);
};

export const validateTelephone = (telephone) => {
  const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  return regex.test(telephone.replaceAll(" ", "").replaceAll("-", ""));
};

export const validateINN = (inn) => {
  if (inn.replaceAll(" ", "").length >= 10) {
    return true;
  }

  return false;
};

export const validateDefaultField = (string) => {
  if (string.replaceAll(" ", "").length > 1) {
    return true;
  }

  return false;
};
