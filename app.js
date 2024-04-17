
function handleFormSubmission(event) {
    event.preventDefault(); 
    calculateDeductions(); 

    
    document.getElementById("taxModal").style.display = "block";
}


document.getElementById("deductionForm").addEventListener("submit", handleFormSubmission);


document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("taxModal").style.display = "none";
});


window.addEventListener("click", function(event) {
    const modal = document.getElementById("taxModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


const tooltipIcons = document.querySelectorAll('.tooltip-icon');
tooltipIcons.forEach((icon) => {
    const tooltip = icon.nextElementSibling;

    
    icon.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
    });

    
    icon.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
    });
});


const inputs = document.querySelectorAll("input[type='text']");
inputs.forEach(input => {
    input.addEventListener("input", function() {
        const errorIcon = input.nextElementSibling;
        const errorTooltip = errorIcon.nextElementSibling;
        const value = input.value.trim();

        if (value && isNaN(value)) {
            errorIcon.style.display = "inline";
            errorTooltip.style.display = "block"; 
        } else {
            errorIcon.style.display = "none";
            errorTooltip.style.display = "none"; 
        }
    });
});

const ageSelect = document.getElementById("ageGroup");
ageSelect.addEventListener("change", function() {
    const errorIcon = ageSelect.nextElementSibling;
    const errorTooltip = errorIcon.nextElementSibling;

    if (!ageSelect.value) {
        errorIcon.style.display = "inline";
        errorTooltip.style.display = "block"; 
    } else {
        errorIcon.style.display = "none";
        errorTooltip.style.display = "none";
    }
});

//  event listeners for hovering over error icons
const errorIcons = document.querySelectorAll(".error-icon");
errorIcons.forEach((errorIcon, index) => {
    const errorTooltip = errorIcon.nextElementSibling;
    errorIcon.addEventListener("mouseenter", () => {
        errorTooltip.style.display = "block";
    });

    errorIcon.addEventListener("mouseleave", () => {
        errorTooltip.style.display = "none";
    });
});

//  function to calculate deductions and tax
function calculateDeductions() {
    const grossIncome = parseFloat(document.getElementById("grossIncome").value);
    const extraIncome = parseFloat(document.getElementById("extraIncome").value);
    const otherIncome = parseFloat(document.getElementById("otherIncome").value);
    const ageGroup = document.getElementById("ageGroup").value;

    // Add up all incomes
    const totalIncome = grossIncome + (extraIncome || 0) + (otherIncome || 0);

    
    let taxRate = 0;
    if (ageGroup === "<40") {
        taxRate = 0.15;
    } else if (ageGroup === "40to59") {
        taxRate = 0.20;
    } else if (ageGroup === "≥60") {
        taxRate = 0.10;
    }

    const totalTax = totalIncome * taxRate;

    // Display the calculation
    const taxDetails = document.getElementById("taxDetails");
    taxDetails.innerHTML = `
        <p>Total Income: Rs. ${totalIncome.toFixed(2)}</p>
        <p>Tax Rate: ${taxRate * 100}%</p>
        <p>Total Tax: Rs. ${totalTax.toFixed(2)}</p>
        <p><b>Your Over all income after TAX deduction is :Rs. ${totalIncome.toFixed(2) - totalTax.toFixed(2)}</b></p>
    `;
}