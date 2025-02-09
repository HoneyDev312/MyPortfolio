document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();

  emailjs.init({ publicKey: "9VQgBMftXDqn8DHez" }); // Remplacez par votre User ID

  let serviceID = "service_gnms7cv"; // Remplacez par votre Service ID
  let templateID = "template_45ek7bf"; // Remplacez par votre Template ID

  let params = {
    lastName: document.getElementById("last-name").value,
    firstName: document.getElementById("first-name").value,
    email: document.getElementById("email").value,
    phoneNumber: document.getElementById("phone").value,
    message: document.getElementById("message").value,
  };

  emailjs.send(serviceID, templateID, params).then(
    function (response) {
      setTimeout(() => {
        document.getElementById("last-name").value = "";
        document.getElementById("first-name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("message").value = ""; // Réinitialisation après 1 seconde
      }, 1000);
      alert("Message envoyé avec succès !");
    },
    function (error) {
      alert("Erreur lors de l'envoi : " + error.text);
    }
  );
});
