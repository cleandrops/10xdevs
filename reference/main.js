const card = document.querySelector('.calculator-card');
const input = document.querySelector('#page-count');
const error = document.querySelector('#page-count-error');
const baseDisplay = document.querySelector('#base-display');
const extraDisplay = document.querySelector('#extra-display');
const totalDisplay = document.querySelector('#total-display');
const emailLink = document.querySelector('#email-link');

const settings = {
  basePrice: Number(card.dataset.basePrice),
  includedPages: Number(card.dataset.includedPages),
  extraPagePrice: Number(card.dataset.extraPagePrice),
  maxPages: Number(card.dataset.maxPages),
  contactEmail: card.dataset.contactEmail,
};

const currency = new Intl.NumberFormat('pl-PL', {
  style: 'currency',
  currency: 'PLN',
  maximumFractionDigits: 0,
});

function render() {
  const pages = Number(input.value);
  const quote = input.value.trim() === '' ? null : calculateQuote(pages, settings);
  baseDisplay.textContent = currency.format(settings.basePrice);
  if (!quote) {
    error.hidden = false;
    error.textContent = `Podaj liczbę całkowitą od 1 do ${settings.maxPages}.`;
    input.setAttribute('aria-invalid', 'true');
    extraDisplay.textContent = '—';
    totalDisplay.textContent = '—';
    emailLink.setAttribute('aria-disabled', 'true');
    emailLink.removeAttribute('href');
    return;
  }
  error.hidden = true;
  error.textContent = '';
  input.removeAttribute('aria-invalid');
  extraDisplay.textContent = currency.format(quote.extraCost);
  totalDisplay.textContent = currency.format(quote.total);
  emailLink.removeAttribute('aria-disabled');
  const subject = `Zapytanie o stronę WordPress — liczba podstron: ${pages}`;
  const body = `Dzień dobry,\n\nInteresuje mnie strona WordPress z liczbą podstron: ${pages}.\nOrientacyjna wycena z kalkulatora: ${currency.format(quote.total)}.\nProszę o kontakt i omówienie zakresu.\n\nPozdrawiam`;
  emailLink.href = `mailto:${settings.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

input.addEventListener('input', render);
document.querySelector('#decrease').addEventListener('click', () => {
  input.value = String(Math.max(1, Number(input.value) - 1 || 1));
  render();
});
document.querySelector('#increase').addEventListener('click', () => {
  input.value = String(Math.min(settings.maxPages, Number(input.value) + 1 || 1));
  render();
});
render();
