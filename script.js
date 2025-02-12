// INPUT ERROR MANAGMENT
let inputs = form.querySelectorAll("input, textarea");
let button = document.getElementById("form-button");
let errorMessage = document.getElementById("error-message");

function checkFields() {
  let allFilled = true;

  inputs.forEach((input) => {
    if (input.value.trim() === "") {
      allFilled = false;
    }
  });

  button.disabled = !allFilled;
}

// Vérifie au chargement
checkFields();

// Vérifie à chaque changement
inputs.forEach((input) => {
  input.addEventListener("input", checkFields);
});

const elements = ["email", "phone"].map((id) => document.getElementById(id));

elements.forEach((el) => {
  el.addEventListener("focusin", function (event) {
    event.preventDefault();
    errorMessage.textContent = "";
    return;
  });
});

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  const publicKey = "9VQgBMftXDqn8DHez";
  const serviceID = "service_gnms7cv";
  const templateID = "template_45ek7bf";

  emailjs.init({ publicKey });

  let lastName = document.getElementById("last-name").value.trim();
  let firstName = document.getElementById("first-name").value.trim();
  let email = document.getElementById("email").value.trim();
  let phoneNumber = document.getElementById("phone").value.trim();
  let message = document.getElementById("message").value.trim();

  // EMAIL VALIDATION FUNCTION
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // PHONE NUMBER VALIDATION FUNCTION
  function validatePhoneNumber(phoneNumber) {
    const regex = /^(?:\+33|0)[1-9](?:[ .-]?[0-9]{2}){4}$/;
    return regex.test(phoneNumber);
  }

  if (!validateEmail(email)) {
    errorMessage.textContent = "Veuillez entrer un email valide.";
    return;
  }

  if (!validatePhoneNumber(phoneNumber)) {
    errorMessage.textContent = "Veuillez entrer un numéro de téléphone valide.";
    return;
  }

  let params = {
    lastName,
    firstName,
    email,
    phoneNumber,
    message,
  };

  emailjs.send(serviceID, templateID, params).then(
    function (response) {
      // INPUT RESET
      setTimeout(() => {
        document.getElementById("last-name").value = "";
        document.getElementById("first-name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = "";
        document.getElementById("error-message").textContent = "";
        button.disabled = true;
      }, 1000);

      // SEND SUCCESS MESSAGE
      alert("Message envoyé avec succès !");
    },
    function (error) {
      // SEND ERROR MESSAGE
      alert("Erreur lors de l'envoi : " + error.text);
    }
  );
});
