const contactForm = document.querySelector("#contact-form");
const contactFormMessage = document.querySelector("#contact-form-message");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d+$/;

function setContactError(field, message) {
  const input = contactForm.elements[field];
  input.setAttribute("aria-invalid", "true");
  document.querySelector(`#${field}-error`).textContent = message;
}

function clearContactError(field) {
  const input = contactForm.elements[field];
  input.removeAttribute("aria-invalid");
  document.querySelector(`#${field}-error`).textContent = "";
}

contactForm.querySelectorAll("input, textarea").forEach((field) => {
  field.addEventListener("input", () => {
    clearContactError(field.name);
    contactFormMessage.textContent = "";
    contactFormMessage.className = "form-message";
  });
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  contactFormMessage.textContent = "";
  contactFormMessage.className = "form-message";
  const values = {
    name: contactForm.elements.name.value.trim(),
    email: contactForm.elements.email.value.trim(),
    phone: contactForm.elements.phone.value.trim(),
    message: contactForm.elements.message.value.trim()
  };
  let isValid = true;

  Object.entries(values).forEach(([field, value]) => {
    clearContactError(field);
    if (!value) {
      setContactError(field, "This field is required.");
      isValid = false;
    }
  });
  if (values.email && !emailPattern.test(values.email)) {
    setContactError("email", "Enter an email address in a format like name@example.com.");
    isValid = false;
  }
  if (values.phone && !phonePattern.test(values.phone)) {
    setContactError("phone", "Use digits only, with no spaces or symbols.");
    isValid = false;
  }
  if (!isValid) {
    contactFormMessage.textContent = "Please correct the highlighted fields and try again.";
    contactFormMessage.classList.add("message-error");
    const firstInvalidField = contactForm.querySelector('[aria-invalid="true"]');
    firstInvalidField?.focus();
    return;
  }

  contactForm.reset();
  contactFormMessage.textContent = "Thanks! The form passed validation. This is a demonstration only—your message has not been sent.";
  contactFormMessage.classList.add("message-success");
});
