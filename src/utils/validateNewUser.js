import validator from "validator";

export const validateUser = (data) => {
  const { firstName, lastName, email, password } = data;
  const fields = ["firstName", "lastName", "email", "password"];
  const isFieldsMissing = fields.some((field) => !data[field]);
  if (isFieldsMissing) throw new Error("Required fields are missing");
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is invalid");
  }
};

export const validateLogin = (data) => {
  const { email, password } = data;
  const fields = ["email", "password"];
  const isFieldsMissing = fields.some((field) => !data[field]);

  if (isFieldsMissing) throw new Error("Email or password is missing");
  if (!validator.isEmail(email)) {
    throw new Error("Email is invalid");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is invalid");
  }
};
