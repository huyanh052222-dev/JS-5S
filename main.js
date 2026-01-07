const rangeInputs = document.querySelectorAll(".range-slider input");
const priceInputs = document.querySelectorAll(".input-box input");
const rangeFill = document.querySelector(".range-fill");
const minText = document.getElementById("min-value");
const maxText = document.getElementById("max-value");

let priceGap = 1; 
function updateEverything(minVal, maxVal) {
    const minLimit = parseInt(rangeInputs[0].min);
    const maxLimit = parseInt(rangeInputs[0].max);
    const rangeRange = maxLimit - minLimit;

    rangeInputs[0].value = minVal;
    rangeInputs[1].value = maxVal;

    priceInputs[0].value = minVal;
    priceInputs[1].value = maxVal;
    
    minText.innerHTML = "$" + minVal.toLocaleString();
    maxText.innerHTML = "$" + maxVal.toLocaleString();

    const minPercent = ((minVal - minLimit) / rangeRange) * 100;
    const maxPercent = ((maxVal - minLimit) / rangeRange) * 100;
    rangeFill.style.left = minPercent + "%";
    rangeFill.style.width = (maxPercent - minPercent) + "%";
}

priceInputs.forEach(input => {
    input.addEventListener("change", e => {
        let minVal = parseInt(priceInputs[0].value);
        let maxVal = parseInt(priceInputs[1].value);
        const minLimit = parseInt(rangeInputs[0].min);
        const maxLimit = parseInt(rangeInputs[0].max);

        if (minVal < minLimit) {
            minVal = minLimit;
            priceInputs[0].value = minLimit;
        }

        if (maxVal > maxLimit) {
            maxVal = maxLimit;
            priceInputs[1].value = maxLimit;
        }
        
        if ((maxVal - minVal >= priceGap) && maxVal <= maxLimit) {
            updateEverything(minVal, maxVal);
        } else {
            priceInputs[0].value = rangeInputs[0].value;
            priceInputs[1].value = rangeInputs[1].value;
        }
    });
});

rangeInputs.forEach(input => {
    input.addEventListener("input", e => {
        let minVal = parseInt(rangeInputs[0].value);
        let maxVal = parseInt(rangeInputs[1].value);

        if (maxVal - minVal < priceGap) {
            if (e.target.className === "min-price") {
                minVal = maxVal - priceGap;
            } else {
                maxVal = minVal + priceGap;
            }
        }
        updateEverything(minVal, maxVal);
    });
});

updateEverything(parseInt(rangeInputs[0].value), parseInt(rangeInputs[1].value));