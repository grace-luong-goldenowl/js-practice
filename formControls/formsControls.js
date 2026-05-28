// 1. Form Properties and Methods
function accessFormElements() {
  const form = document.getElementById("myForm");

  console.log(form.elements.username);

  // Shorthand: form.fieldName
  console.log(form.username);
}

function getFormValues() {
  const form = document.getElementById("myForm");

  const username = form.elements.username.value;
  console.log(username);

  const checkbox = form.elements.agree;
  console.log(checkbox.checked); // true or false

  const select = form.elements.country;
  console.log(select.value); // selected value
}

function setFormValues() {
  const form = document.getElementById("myForm");

  form.elements.username.value = "John";
  form.elements.agree.checked = true;
  form.elements.country.value = "usa";
}

function resetForm() {
  const form = document.getElementById("myForm");
  form.reset(); // Resets all fields to their default values
}

// 2. Focus and Blur Events
function setupFocusEvent() {
  const input = document.getElementById("focusInput");

  input.addEventListener("focus", () => {
    console.log("Input focused");
    input.style.backgroundColor = "lightblue";
  });
}

function setupBlurEvent() {
  const input = document.getElementById("focusInput");

  input.addEventListener("blur", () => {
    console.log("Input lost focus");
    input.style.backgroundColor = "";
  });
}

function setFocus() {
  const input = document.getElementById("focusInput");
  input.focus(); // Focus on the input
}

function removeFocus() {
  const input = document.getElementById("focusInput");
  input.blur(); // Remove focus from input
}

// 3. Change, Input, and Modification Events
function setupChangeEvent() {
  const input = document.getElementById("changeInput");

  input.addEventListener("change", (event) => {
    console.log("Value changed to:", event.target.value);
  });
}

function setupInputEvent() {
  const input = document.getElementById("changeInput");

  input.addEventListener("input", (event) => {
    console.log("Current value:", event.target.value);
    console.log("Characters typed:", event.target.value.length);
  });
}

function setupSelectChange() {
  const select = document.getElementById("changeSelect");

  select.addEventListener("change", (event) => {
    console.log("Selected country:", event.target.value);
  });
}

function setupCheckboxChange() {
  const checkbox = document.getElementById("changeCheckbox");

  checkbox.addEventListener("change", (event) => {
    console.log("Checkbox checked:", event.target.checked);
  });
}

// 4. Cut, Copy, Paste Events
function setupCutEvent() {
  const input = document.getElementById("clipboardInput");

  input.addEventListener("cut", (event) => {
    console.log("Text cut");
    // event.clipboardData.getData('text/plain')
  });
}

function setupCopyEvent() {
  const input = document.getElementById("clipboardInput");

  input.addEventListener("copy", (event) => {
    console.log("Text copied");
    // Set custom data to clipboard
    // event.clipboardData.setData('text/plain', 'Custom text');
  });
}

function setupPasteEvent() {
  const input = document.getElementById("clipboardInput");

  input.addEventListener("paste", (event) => {
    // Prevent default paste behavior
    event.preventDefault();

    const pastedText = event.clipboardData.getData("text/plain");
    console.log("Pasted:", pastedText);

    // Only allow alphanumeric characters
    const sanitized = pastedText.replace(/[^a-zA-Z0-9]/g, "");
    input.value = sanitized;
  });
}


// 5. Form Submission
function setupFormSubmit() {
  const form = document.getElementById("submitForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    console.log("Form submitted");

    const formData = new FormData(form);
    console.log("Username:", formData.get("submitUsername"));
    console.log("Agree:", formData.get("submitAgree"));
  });
}

function validateFormBeforeSubmit() {
  const form = document.getElementById("submitForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = form.elements.submitUsername.value.trim();

    if (username === "") {
      alert("Username is required");
      return;
    }

    if (username.length < 3) {
      alert("Username must be at least 3 characters");
      return;
    }

    console.log("Form is valid, sending data...");
    form.submit();
  });
}
