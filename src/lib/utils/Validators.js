export const isNotEmpty = value => {
  return !(!value || /^\s*$/.test(value));
};

export const validateEmail = mail => {
  mail = mail.toLowerCase();
  if (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(mail)) {
    return true;
  }
  return false;
};

export const matchValues = (first, second) => {
  return first === second ? true : false;
};

export const validateUrl = str => {
  try {
    new URL(str);
  } catch (_) {
    return false;
  }
  return true;
};
export const isValidDate = (dateObject) => {
  return new Date(dateObject).toString() !== 'Invalid Date';
}
export const isPhoneNumberValid = (number) => {
  var phoneRegExp = /^[0-9]*$/gm
  if (number.match(phoneRegExp)) {
    return true
  }
  else {
    return false
  }
}