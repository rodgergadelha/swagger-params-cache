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
  let paramInputs = document.querySelectorAll("tr[data-param-name] input");

  for(let paramInput of paramInputs) {
    paramInput.addEventListener("change", (event) => {
      let savedParams = loadSavedParams();
      let paramName = paramInput.parentNode.parentNode.getAttribute("data-param-name");
      let newValue = paramInput.value;
      updateSavedParams(savedParams, paramName, newValue);
      fillInputsWithSameParamName(paramName, newValue);
    });
  }
}

function fillInputsWithSameParamName(referenceParamName, newValue) {
  let paramInputs = document.querySelectorAll("tr[data-param-name] input");

  for(let paramInput of paramInputs) {
    let paramName = paramInput.parentNode.parentNode.getAttribute("data-param-name");
    
    if(paramName == referenceParamName) {
      paramInput.value = newValue;
    }
  }
}

function fillInputs() {
  let savedParams = loadSavedParams();
  let paramInputs = document.querySelectorAll("tr[data-param-name] input");

  for(let paramInput of paramInputs) {
    let paramName = paramInput.parentNode.parentNode.getAttribute("data-param-name");
    let savedValue = savedParams[paramName];
    
    if(savedValue) {
      paramInput.value = savedValue;
      paramInput.dispatchEvent(new Event('change', { bubbles: true }));
    }
  }
}

function init() {
  const observer = new MutationObserver(() => fillInputs());
  observer.observe(document.body, { childList: true, subtree: true });
  fillInputs();
  addListenersAtInputs();
}

console.log("starting...");
window.addEventListener("load", () => setTimeout(init, 1000));