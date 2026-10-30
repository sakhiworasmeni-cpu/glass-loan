const loanAmountInput = document.getElementById('loan-amount');
const loanPeriodInput = document.getElementById('loan-period');
const amountVal = document.getElementById('amount-val');
const periodVal = document.getElementById('period-val');

const monthlyPaymentElem = document.getElementById('monthly-payment');
const totalInterestElem = document.getElementById('total-interest');
const totalPaymentElem = document.getElementById('total-payment');

const ANNUAL_INTEREST_RATE = 0.1175; // 11.75% annual rate

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0
  }).format(amount);
}

function updateCalculations() {
  const principal = parseFloat(loanAmountInput.value);
  const months = parseInt(loanPeriodInput.value, 10);
  const monthlyRate = ANNUAL_INTEREST_RATE / 12;

  amountVal.textContent = formatCurrency(principal);
  periodVal.textContent = `${months} Month${months > 1 ? 's' : ''}`;

  const factor = Math.pow(1 + monthlyRate, months);
  const monthly = (principal * monthlyRate * factor) / (factor - 1);
  const total = monthly * months;
  const interest = total - principal;

  monthlyPaymentElem.textContent = formatCurrency(monthly);
  totalInterestElem.textContent = formatCurrency(interest);
  totalPaymentElem.textContent = formatCurrency(total);
}

loanAmountInput.addEventListener('input', updateCalculations);
loanPeriodInput.addEventListener('input', updateCalculations);

document.getElementById('loan-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Application submitted successfully! Our automated underwriting system is reviewing your profile.');
});

updateCalculations();