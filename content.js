function loadSavedParams() {
  let savedParams = {};
  let savedParamsString = localStorage.getItem("swaggerSavedParams");
  if(savedParamsString) savedParams = JSON.parse(savedParamsString);
  return savedParams;
}

function updateSavedParams(savedParams, paramName, value) {
  savedParams[paramName] = value;
  localStorage.setItem("swaggerSavedParams", JSON.stringify(savedParams));
}

function addListenersAtInputs() {
  let paramInputs = document.querySelectorAll("table.parameters input");

  for(let paramInput of paramInputs) {
    paramInput.addEventListener("change", (event) => {
      let savedParams = loadSavedParams();
      let paramName = paramInput.parentNode.parentNode.querySelector(".parameter__name").innerText.replace("*", "").trim();
      let newValue = paramInput.value;
      updateSavedParams(savedParams, paramName, newValue);
      fillInputsWithSameParamName(paramName, newValue);
    });
  }
}

function fillInputsWithSameParamName(referenceParamName, newValue) {
  let paramInputs = document.querySelectorAll("table.parameters input");

  for(let paramInput of paramInputs) {
    let paramName = paramInput.parentNode.parentNode.querySelector(".parameter__name").innerText.replace("*", "").trim();
    
    if(paramName === referenceParamName) {
      paramInput.value = newValue;
    }
  }
}

function fillInputs() {
  let savedParams = loadSavedParams();
  let paramInputs = document.querySelectorAll("table.parameters input");

  for(let paramInput of paramInputs) {
    let paramName = paramInput.parentNode.parentNode.querySelector(".parameter__name").innerText.replace("*", "").trim();
    let savedValue = savedParams[paramName];
    
    if(savedValue) {
      paramInput.value = savedValue;
      paramInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

function init() {
  const observer = new MutationObserver(() => {
    console.log("DOM changed!");
    fillInputs();
    addListenersAtInputs();
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
  fillInputs();
  addListenersAtInputs();
}

console.log("starting...");
window.addEventListener("load", () => setTimeout(init, 1000));
//init();
