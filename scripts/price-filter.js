document.addEventListener("DOMContentLoaded", () => {
    const minInput = document.getElementById("minPrice");
    const maxInput = document.getElementById("maxPrice");
    const minRange = document.getElementById("priceRangeMin");
    const maxRange = document.getElementById("priceRangeMax");
  
    function updateRangesFromInputs() {
      const minValue = parseInt(minInput.value) || 0;
      const maxValue = parseInt(maxInput.value) || 5000000;
  
      if (minValue <= maxValue) {
        minRange.value = minValue;
        maxRange.value = maxValue;
      }
    }
  
    function updateInputsFromRanges() {
      minInput.value = minRange.value;
      maxInput.value = maxRange.value;
    }
  
    minInput.addEventListener("input", updateRangesFromInputs);
    maxInput.addEventListener("input", updateRangesFromInputs);
  
    minRange.addEventListener("input", updateInputsFromRanges);
    maxRange.addEventListener("input", updateInputsFromRanges);
  
    minRange.addEventListener("change", () => {
      if (parseInt(minRange.value) > parseInt(maxRange.value)) {
        maxRange.value = minRange.value;
        maxInput.value = maxRange.value;
      }
    });
  
    maxRange.addEventListener("change", () => {
      if (parseInt(maxRange.value) < parseInt(minRange.value)) {
        minRange.value = maxRange.value;
        minInput.value = minRange.value;
      }
    });
  });
  