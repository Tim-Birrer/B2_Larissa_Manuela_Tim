const submitButton = document.getElementById("submit");
const fnameField = document.getElementById("fname");
const lnameField = document.getElementById("lname");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");

submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  await databaseClient.insertInto("formulareigaben", {
    vorname: fnameField.value,
    nachname: lnameField.value,
    email: emailField.value,
    telefon: phoneField.value,
  });
  alert("Formular erfolgreich eingereicht!");
});
