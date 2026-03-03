const formatPhoneNumber = (phoneNumber) => {
  let cleaned = ("" + phoneNumber).replace(/\D/g, "");

  if (!cleaned.startsWith("1")) {
    cleaned = "1" + cleaned;
  }

  const match = cleaned.match(/^(\d{1})(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return `+${match[1]}(${match[2]}) ${match[3]}-${match[4]}`;
  }
  return phoneNumber;
};

export default formatPhoneNumber;
