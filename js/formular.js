const form = document.getElementById("formular");
const fnameField = document.getElementById("fname");
const lnameField = document.getElementById("lname");
const emailField = document.getElementById("email");
const phoneField = document.getElementById("phone");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  await databaseClient.insertInto("formulareigaben", {
    vorname: fnameField.value,
    nachname: lnameField.value,
    email: emailField.value,
    telefon: phoneField.value,
  });
  alert("Formular erfolgreich eingereicht!");
});
