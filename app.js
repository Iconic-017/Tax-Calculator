// Function to handle form submission and tax calculation
function handleFormSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting the default way
    calculateDeductions(); // Calculate the deductions and tax

    // Show the modal
    document.getElementById("taxModal").style.display = "block";
}

// Add event listener for form submission
document.getElementById("deductionForm").addEventListener("submit", handleFormSubmission);

// Close the modal when the close button is clicked
document.querySelector(".close").addEventListener("click", function() {
    document.getElementById("taxModal").style.display = "none";
});

// Close the modal when the user clicks outside of the modal
window.addEventListener("click", function(event) {
    const modal = document.getElementById("taxModal");
    if (event.target == modal) {
        modal.style.display = "none";
    }
});

// Add event listeners for hovering over question mark icons
const tooltipIcons = document.querySelectorAll('.tooltip-icon');
tooltipIcons.forEach((icon) => {
    const tooltip = icon.nextElementSibling;

    // Show the tooltip when hovering over the question mark icon
    icon.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
    });

    // Hide the tooltip when the mouse leaves the question mark icon
    icon.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
    });
});

// Validation and error display logic
const inputs = document.querySelectorAll("input[type='text']");
inputs.forEach(input => {
    input.addEventListener("input", function() {
        const errorIcon = input.nextElementSibling;
        const errorTooltip = errorIcon.nextElementSibling;
        const value = input.value.trim();

        if (value && isNaN(value)) {
            errorIcon.style.display = "inline";
            errorTooltip.style.display = "block"; // Show error tooltip
        } else {
            errorIcon.style.display = "none";
            errorTooltip.style.display = "none"; // Hide error tooltip
        }
    });
});

const ageSelect = document.getElementById("ageGroup");
ageSelect.addEventListener("change", function() {
    const errorIcon = ageSelect.nextElementSibling;
    const errorTooltip = errorIcon.nextElementSibling;

    if (!ageSelect.value) {
        errorIcon.style.display = "inline";
        errorTooltip.style.display = "block"; // Show error tooltip
    } else {
        errorIcon.style.display = "none";
        errorTooltip.style.display = "none"; // Hide error tooltip
    }
});

// Add event listeners for hovering over error icons
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

// Sample function to calculate deductions and tax
function calculateDeductions() {
    // Sample data extraction from form
    const grossIncome = parseFloat(document.getElementById("grossIncome").value);
    const extraIncome = parseFloat(document.getElementById("extraIncome").value);
    const otherIncome = parseFloat(document.getElementById("otherIncome").value);
    const ageGroup = document.getElementById("ageGroup").value;

    // Add up all incomes
    const totalIncome = grossIncome + (extraIncome || 0) + (otherIncome || 0);

    // Sample tax calculation logic
    let taxRate = 0;
    if (ageGroup === "<40") {
        taxRate = 0.15;
    } else if (ageGroup === "40to59") {
        taxRate = 0.20;
    } else if (ageGroup === "≥60") {
        taxRate = 0.10;
    }

    const totalTax = totalIncome * taxRate;

    // Display the calculation in the modal
    const taxDetails = document.getElementById("taxDetails");
    taxDetails.innerHTML = `
        <p>Total Income: $${totalIncome.toFixed(2)}</p>
        <p>Tax Rate: ${taxRate * 100}%</p>
        <p>Total Tax: $${totalTax.toFixed(2)}</p>
    `;
}