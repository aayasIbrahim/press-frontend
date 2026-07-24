
"use server"
export const createLogin = async(formData: FormData) => {
    console.log(formData)
  const email = formData.get("email");
  const password = formData.get("password");
  console.log(email, password);
};
