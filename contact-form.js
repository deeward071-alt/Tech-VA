(() => {
  const dialog = document.querySelector(".contact-dialog");
  const trigger = document.querySelector(".contact-modal-trigger");
  const closeButton = document.querySelector(".contact-dialog-close");
  const form = document.querySelector("#contact-form");
  const firstField = document.querySelector("#contact-name");
  const status = document.querySelector("#contact-form-status");

  if (!dialog || !trigger || !closeButton || !form || !firstField || !status) return;

  function openContactForm() {
    status.hidden = true;
    dialog.showModal();
    document.body.classList.add("contact-modal-open");
    firstField.focus({ preventScroll: true });
  }

  function closeContactForm() {
    if (dialog.open) dialog.close();
  }

  function handleContactFormSubmit(event) {
    event.preventDefault();

    // Native required/email constraints validate the fields before this point.
    if (!form.reportValidity()) return;

    // Front-end only for now. Connect a real form endpoint here before sending messages.
    status.hidden = false;
    status.focus();
  }

  trigger.addEventListener("click", openContactForm);
  closeButton.addEventListener("click", closeContactForm);
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) closeContactForm();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("contact-modal-open");
    trigger.focus();
  });
  form.addEventListener("submit", handleContactFormSubmit);
})();
