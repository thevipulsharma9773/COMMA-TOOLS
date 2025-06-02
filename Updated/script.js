const inputArea = document.getElementById("inputNumbers");
const outputArea = document.getElementById("commaOutput");
const inputCount = document.getElementById("inputCount");
const numberCount = document.getElementById("numberCount");
const removeDuplicatesCheckbox = document.getElementById("removeDuplicates");

inputArea.addEventListener("input", updateEverything);
removeDuplicatesCheckbox.addEventListener("change", updateEverything);

function updateEverything() {
  const input = inputArea.value;
  const removeDupes = removeDuplicatesCheckbox.checked;

  const cleanedInput = input.replace(/,/g, ""); // remove commas
  const rawNumbers = cleanedInput
    .split(/\s+/)
    .map((item) => item.replace(/\D/g, ""))
    .filter((item) => item.length > 0);

  inputCount.textContent = `Input numbers: ${rawNumbers.length}`;

  const cleaned = removeDupes ? [...new Set(rawNumbers)] : rawNumbers;

  outputArea.value = cleaned.join(",");
  numberCount.textContent = `Total numbers: ${cleaned.length}`;
}

function copyToClipboard() {
  if (!outputArea.value) {
    alert("Nothing to copy!");
    return;
  }

  navigator.clipboard
    .writeText(outputArea.value)
    .then(() => alert("Copied to clipboard!"))
    .catch(() => alert("Failed to copy."));
}

function exportCSV() {
  const numbers = outputArea.value;
  if (!numbers) {
    alert("No data to export!");
    return;
  }

  const csvContent = "data:text/csv;charset=utf-8," + numbers.split(",").join("\n");

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "numbers.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
