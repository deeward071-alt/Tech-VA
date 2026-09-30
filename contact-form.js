(() => {
  const dialog = document.querySelector(".contact-dialog");
  const trigger = document.querySelector(".contact-modal-trigger");
  const closeButton = document.querySelector(".contact-dialog-close");
  const form = document.querySelector("#contact-form");
  const firstField = document.querySelector("#contact-name");
  const status = document.querySelector("#contact-form-status");
  const submitButton = form?.querySelector('button[type="submit"]');

  if (!dialog || !trigger || !closeButton || !form || !firstField || !status || !submitButton) return;

  function openContactForm() {
    status.hidden = true;
    status.textContent = "";
    status.removeAttribute("data-state");
    dialog.showModal();
    document.body.classList.add("contact-modal-open");
    firstField.focus({ preventScroll: true });
  }

  function closeContactForm() {
    if (dialog.open) dialog.close();
  }

  async function handleContactFormSubmit(event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    submitButton.disabled = true;
    form.setAttribute("aria-busy", "true");
    status.hidden = false;
    status.removeAttribute("data-state");
    status.textContent = "Sending your message…";

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(Object.fromEntries(new FormData(form).entries())),
      });
      const result = await response.json();

      if (!response.ok || result.success !== true) {
        throw new Error("Web3Forms did not confirm the submission.");
      }

      status.dataset.state = "success";
      status.textContent = "Thanks for reaching out. Your message has been sent.";
      form.reset();
    } catch (error) {
      status.dataset.state = "error";
      status.textContent = "Your message couldn’t be sent right now. Please try again shortly.";
    } finally {
      submitButton.disabled = false;
      form.removeAttribute("aria-busy");
    }
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