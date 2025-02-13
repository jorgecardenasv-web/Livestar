export async function sendAndSaveContactForm(formData: FormData) {
  const contactForm: Record<string, string> = {};
  ["name", "phone", "email", "comment"].forEach((key) => {
    const value = formData.get(key)?.toString().trim();
    if (value) {
      contactForm[key] = value;
    }
  });
  //   Send to BD or Advisor Email
}
