"use strict";
// Elements
// Where user will enter values
const rateRange = document.querySelector("#rate-range");
const rateBox = document.querySelector("#rate-box");
const yearsRange = document.querySelector("#years-range");
const yearsBox = document.querySelector("#years-box");
const loan = document.querySelector("#loan");
const tax = document.querySelector("#tax");
const insurance = document.querySelector("#insurance");
//////////////////////////////
// Button Action
const calculateBtn = document.querySelector('input[type="submit"');
//////////////////////////////
// Where results will populate
const summarySection = document.querySelector(".summary");
const taxOutput = document.querySelector("#results-tax");
const insuranceOutput = document.querySelector("#results-insurance");
const principleAndInterestsOutput =
  document.querySelector("#results-principle");
const totalOutput = document.querySelector("#results-total");
const resultAmount = document.querySelectorAll(".resultAmount");
//////////////////////////////
// ERROR MESSAGES
const errorLoan = document.querySelector(".error.loan");
const errorTax = document.querySelector(".error.tax");
const errorInsurance = document.querySelector(".error.insurance");
let html1 = "Mandatory Field";
let html2 = "Please enter valid dollar amount";

// SET BOOLEAN VALUES FOR IF USER HAS ENTERED PROPER INFO
let loanValid = false;
let taxValid = false;
let insuranceValid = false;

// VALUES TO RETURN FOR CALCULATIONS
let interestRate,
  loanAmount,
  yearsOfMortgage,
  principleAndInterests,
  totalResult,
  annualTax,
  annualInsurance;

// SET OR RESET TO DEFAULT VALUES AND STYLING
const init = function () {
  yearsOfMortgage = 0;
  principleAndInterests = 0;
  loanAmount = 0;
  totalResult = 0;
  interestRate = 0;
  annualTax = 0;
  for (let i = 0; i < resultAmount.length; i++) {
    resultAmount[i].style.color = "#bbbcbc";
  }
};

init();
////////////////////////////
// CALCULATING THE PRINCIPLE
const calculatePrinciple = function () {
  yearsOfMortgage = yearsBox.value;
  interestRate = rateBox.value;
  loanAmount = loan.value;

  principleAndInterests =
    ((interestRate / 100 / 12) * loanAmount) /
    (1 - Math.pow(1 + interestRate / 100 / 12, -yearsOfMortgage * 12));
  return principleAndInterests;
};

////////////////////////////
// CALCULATING THE TAX
const calculateTax = () => (annualTax = tax.value / 12);

////////////////////////////
// CALCULATING THE INSURANCE
const calculateInsurance = () => (annualInsurance = insurance.value / 12);

////////////////////////////
// CALCULATING THE GRAND TOTAL
const calculateTotal = function () {
  calculatePrinciple();
  calculateTax();
  calculateInsurance();
  totalResult = principleAndInterests + annualTax + annualInsurance;
  return totalResult;
};

////////////////////////////
// POPULATING THE RESULTS
const showYourResults = function () {
  summarySection.style.height = "340px";
  summarySection.style.padding = "20px 10px 40px 30px";
  calculatePrinciple();
  calculateTax();
  calculateInsurance();
  calculateTotal();
  // FORMATTING THE RESULT POPULATION TO ALWAYS HAVE 2 DECIMAL PLACES
  let finalPrinciple = Number.isInteger(principleAndInterests)
    ? parseFloat(
        parseFloat(principleAndInterests.toFixed(2))
      ).toLocaleString() + ".00"
    : parseFloat(parseFloat(principleAndInterests.toFixed(2))).toLocaleString();

  let finalTax = Number.isInteger(annualTax)
    ? parseFloat(parseFloat(annualTax.toFixed(2))).toLocaleString() + ".00"
    : parseFloat(parseFloat(annualTax.toFixed(2))).toLocaleString();

  let finalInsurance = Number.isInteger(annualInsurance)
    ? parseFloat(parseFloat(annualInsurance.toFixed(2))).toLocaleString() +
      ".00"
    : parseFloat(parseFloat(annualInsurance.toFixed(2))).toLocaleString();

  let finalTotal = Number.isInteger(totalResult)
    ? parseFloat(parseFloat(totalResult.toFixed(2))).toLocaleString() + ".00"
    : parseFloat(parseFloat(totalResult.toFixed(2))).toLocaleString();

  principleAndInterestsOutput.innerHTML = finalPrinciple;
  taxOutput.innerHTML = finalTax;
  insuranceOutput.innerHTML = finalInsurance;
  totalOutput.innerHTML = finalTotal;
  for (let i = 0; i < resultAmount.length; i++) {
    resultAmount[i].style.color = "black";
  }
};

// Once Calculate Button is Pressed
calculateBtn.addEventListener("click", function (e) {
  e.preventDefault();
  loanValid = false;
  taxValid = false;
  insuranceValid = false;

  // VALIDATION
  if (!loanValid || !taxValid || !insuranceValid) {
    init();
  }
  if (!loan.value) {
    loan.style.borderColor = "#d83e00";
    errorLoan.innerHTML = html1;
  } else if (!loan.value || isNaN(loan.value) || loan.value < 0) {
    loan.style.borderColor = "#d83e00";
    errorLoan.innerHTML = html2;
  } else {
    loan.style.borderColor = "";
    errorLoan.innerHTML = "";
    loanValid = true;
  }
  if (!tax.value) {
    tax.style.borderColor = "#d83e00";
    errorTax.innerHTML = html1;
  } else if (!tax.value || isNaN(tax.value) || tax.value < 0) {
    tax.style.borderColor = "#d83e00";
    errorTax.innerHTML = html2;
  } else {
    tax.style.borderColor = "";
    errorTax.innerHTML = "";
    taxValid = true;
  }
  if (!insurance.value) {
    insurance.style.borderColor = "#d83e00";
    errorInsurance.innerHTML = html1;
  } else if (
    !insurance.value ||
    isNaN(insurance.value) ||
    insurance.value < 0
  ) {
    insurance.style.borderColor = "#d83e00";
    errorInsurance.innerHTML = html2;
  } else {
    insurance.style.borderColor = "";
    errorInsurance.innerHTML = "";
    insuranceValid = true;
  }
  // IF ALL FIELDS ARE VALID? SHOW RESULTS
  if (loanValid && taxValid && insuranceValid) {
    showYourResults();
  }
});
