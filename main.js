const dialog = document.querySelector('#access-dialog');
const openButtons = document.querySelectorAll('[data-open-dialog]');
const closeButton = dialog?.querySelector('.dialog-close');

openButtons.forEach(button => button.addEventListener('click', () => {
  dialog?.showModal();
  closeButton?.focus();
}));

closeButton?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});
