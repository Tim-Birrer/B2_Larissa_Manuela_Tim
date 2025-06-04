// Elemente aus dem HTML ins JavaScript holen
const form = document.getElementById("form");
const fnameField = document.getElementById("fname");
const lnameField = document.getElementById("lname");
const emailField = document.getElementById("email");
const telField = document.getElementById("tel");
const loader = document.getElementById("loader");
const submitButton = document.getElementById("submit");

// Wenn man auf Absenden klickt, wird Seiten-Reload verhindert und stattdessen läuft eigene JS-Logik weiter
submitButton.addEventListener("click", async (event) => {
  event.preventDefault();

  // Funktion prüft, ob alle Felder korrekt ausgefüllt sind (falls etwas nicht korrekt -> Vorgang abbrechen)
  const isValid = validateForm();
  if (!isValid) return;

  // Überprüfen, ob E-Mail schon in DB ist
  const emailValue = emailField.value.trim().toLowerCase();

  // Abfrage: Gibt es diese E-Mail bereits?
  const checkResult = await databaseClient.executeSqlQuery(
    `SELECT * FROM formulareingaben WHERE email = '${emailValue}'`
  );

  // checkResult[1] enthält die eigentlichen Datenzeilen
  if (checkResult[1] && checkResult[1].length > 0) {
    setError(emailField, "Diese E-Mail wurde bereits verwendet.");
    return;
  }
  // Loader anzeigen
  loader.classList.remove("hidden");

  // Es wird geprüft, ob Werte bei Radio Buttons gewählt wurden (Ja -> Wertzuweisung, Nein -> Leerer String)
  const genderField = document.querySelector('input[name="gender"]:checked');
  const genderValue = genderField ? genderField.value : "";

  const seatField = document.querySelector('input[name="seat"]:checked');
  const seatValue = seatField ? seatField.value : "";

  const colorField = document.querySelector('input[name="color"]:checked');
  const colorValue = colorField ? colorField.value : "";

  const engineField = document.querySelector('input[name="engine"]:checked');
  const engineValue = engineField ? engineField.value : "";

  // Daten an Datenbank senden
  await databaseClient.insertInto("formulareingaben", {
    vorname: fnameField.value,
    nachname: lnameField.value,
    email: emailValue,
    telefon: telField.value.replace(/\s+/g, ""),
    anrede: genderValue,
    sitze: seatValue,
    aussenfarbe: colorValue,
    treibstoff: engineValue,
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));
  loader.classList.add("hidden");

  // Kurz warten bis Erfolgs-Meldung erscheint
  setTimeout(() => {
    alert(
      "Deine Daten wurden erfolgreich übermittelt. Deine Offerte erhältst du innerhalb von zwei Werktagen per E-Mail."
    );
    form.reset();
  }, 50);
  form.reset();
});

// Fehler anzeigen
const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");
  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// Fehler entfernen, wenn alles gut ist
const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = "";
  inputControl.classList.add("success");
  inputControl.classList.remove("error");
};

// Validierung
const validateForm = () => {
  let isValid = true;
  const fnameValue = fnameField.value.trim();
  const lnameValue = lnameField.value.trim();
  const emailValue = emailField.value.trim();
  const telValue = telField.value.trim();
  const engineChecked = document.querySelector('input[name="engine"]:checked');
  const seatChecked = document.querySelector('input[name="seat"]:checked');
  const colorChecked = document.querySelector('input[name="color"]:checked');
  const radioErrorContainer = document.querySelector(".form-section .error");

  // Vorname validieren
  if (fnameValue === "") {
    setError(fnameField, "Vorname ist ein Pflichtfeld.");
    isValid = false;
  } else if (fnameValue.length < 2) {
    setError(fnameField, "Vorname muss mindestens 2 Zeichen lang sein.");
    isValid = false;
  } else if (fnameValue.length > 1000) {
    setError(fnameField, "Vorname darf nicht länger als 1000 Zeichen sein.");
    isValid = false;
  } else if (!/^[A-Za-zÄäÖöÜüß\s]+$/.test(fnameValue)) {
    setError(fnameField, "Nur Buchstaben verwenden.");
    isValid = false;
  } else {
    setSuccess(fnameField);
  }

  // Vorname live validieren
  fnameField.addEventListener("input", () => {
    const currentValue = fnameField.value.trim();
    if (currentValue === "") {
      setError(fnameField, "Vorname ist ein Pflichtfeld.");
    } else if (currentValue.length < 2) {
      setError(fnameField, "Vorname muss mindestens 2 Zeichen lang sein.");
    } else if (currentValue.length > 1000) {
      setError(fnameField, "Vorname darf nicht länger als 1000 Zeichen sein.");
    } else if (!/^[A-Za-zÄäÖöÜüß\s]+$/.test(currentValue)) {
      setError(fnameField, "Nur Buchstaben verwenden.");
    } else {
      setSuccess(fnameField);
    }
  });

  // Nachname validieren
  if (lnameValue === "") {
    setError(lnameField, "Nachname ist ein Pflichtfeld.");
    isValid = false;
  } else if (lnameValue.length < 2) {
    setError(lnameField, "Nachname muss mindestens 2 Zeichen lang sein.");
    isValid = false;
  } else if (lnameValue.length > 1000) {
    setError(lnameField, "Nachname darf nicht länger als 1000 Zeichen sein.");
    isValid = false;
  } else if (!/^[A-Za-zÄäÖöÜüß\s]+$/.test(lnameValue)) {
    setError(lnameField, "Nur Buchstaben verwenden.");
    isValid = false;
  } else {
    setSuccess(lnameField);
  }

  // Nachname live validieren
  lnameField.addEventListener("input", () => {
    const currentValue = lnameField.value.trim();
    if (currentValue === "") {
      setError(lnameField, "Nachname ist ein Pflichtfeld.");
    } else if (currentValue.length < 2) {
      setError(lnameField, "Nachname muss mindestens 2 Zeichen lang sein.");
    } else if (currentValue.length > 1000) {
      setError(lnameField, "Nachname darf nicht länger als 1000 Zeichen sein.");
    } else if (!/^[A-Za-zÄäÖöÜüß\s]+$/.test(currentValue)) {
      setError(lnameField, "Nur Buchstaben verwenden.");
    } else {
      setSuccess(lnameField);
    }
  });

  // Hilfsfunktion für E-Mail-Validierung
  function isValidEmail(email) {
    const atIndex = email.indexOf("@");
    const domain = email.slice(atIndex + 1);
    return (
      atIndex > 0 && // @ nicht am Anfang
      atIndex < email.length - 1 && // @ nicht am Ende
      atIndex === email.lastIndexOf("@") && // nur ein @
      email.indexOf(" ") === -1 && // keine Leerzeichen
      domain.includes(".") && // Punkt in Domain
      !domain.includes("..") && // kein doppelter Punkt
      !domain.endsWith(".") // kein Punkt am Ende
    );
  }
  // E-Mail validieren
  if (emailValue === "") {
    setError(emailField, "E-Mail ist ein Pflichtfeld.");
    isValid = false;
  } else if (emailValue.length < 5) {
    setError(emailField, "E-Mail muss mindestens 5 Zeichen lang sein.");
    isValid = false;
  } else if (emailValue.length > 250) {
    setError(emailField, "E-Mail darf maximal 250 Zeichen lang sein.");
    isValid = false;
  } else if (!isValidEmail(emailValue)) {
    setError(emailField, "Gültige E-Mail im Format name@domain.ch eingeben.");
    isValid = false;
  } else {
    setSuccess(emailField);
  }

  // E-Mail live validieren
  emailField.addEventListener("input", () => {
    const currentValue = emailField.value.trim();
    if (currentValue === "") {
      setError(emailField, "E-Mail ist ein Pflichtfeld.");
    } else if (currentValue.length < 5) {
      setError(emailField, "E-Mail muss mindestens 5 Zeichen lang sein.");
    } else if (currentValue.length > 250) {
      setError(emailField, "E-Mail darf maximal 250 Zeichen lang sein.");
    } else if (!isValidEmail(currentValue)) {
      setError(emailField, "Gültige E-Mail im Format name@domain.ch eingeben.");
    } else {
      setSuccess(emailField);
    }
  });

  // Telefon validieren
  if (telValue !== "") {
    if (!telValue.startsWith("+")) {
      setError(telField, "Telefonnummer muss mit + beginnen.");
      isValid = false;
    } else if (!/^\+[\d\s]+$/.test(telValue)) {
      setError(telField, "Nur Zahlen und Leerzeichen erlaubt.");
      isValid = false;
    } else if (telValue.length > 20) {
      setError(
        telField,
        "Telefonnummer darf nicht länger als 20 Zeichen sein."
      );
      isValid = false;
    } else if (telValue.length < 6) {
      setError(telField, "Telefonnummer muss mindestens 6 Zeichen haben.");
      isValid = false;
    } else {
      setSuccess(telField);
    }
  } else {
    // leer ist erlaubt → gültig
    setSuccess(telField);
  }

  // Telefon live validieren
  telField.addEventListener("input", () => {
    const currentValue = telField.value.trim();

    if (currentValue === "") {
      setSuccess(telField); // leer ist erlaubt
    } else if (!currentValue.startsWith("+")) {
      setError(telField, "Telefonnummer muss mit + beginnen.");
    } else if (!/^\+[\d\s]+$/.test(currentValue)) {
      setError(telField, "Nur Zahlen und Leerzeichen erlaubt.");
    } else if (currentValue.length > 20) {
      setError(
        telField,
        "Telefonnummer darf nicht länger als 20 Zeichen sein."
      );
    } else if (currentValue.length < 6) {
      setError(telField, "Telefonnummer muss mindestens 6 Zeichen haben.");
    } else {
      setSuccess(telField);
    }
  });

  // Drei Radio-Button-Gruppen validieren
  if (!engineChecked || !seatChecked || !colorChecked) {
    radioErrorContainer.innerText =
      "Alle drei Personalisierungsoptionen wählen.";
    isValid = false;
  } else {
    radioErrorContainer.innerText = "";
  }

  // Drei Radio-Button-Gruppen live validieren
  const updateRadioValidation = () => {
    const engineChecked = document.querySelector(
      'input[name="engine"]:checked'
    );
    const seatChecked = document.querySelector('input[name="seat"]:checked');
    const colorChecked = document.querySelector('input[name="color"]:checked');

    if (engineChecked && seatChecked && colorChecked) {
      radioErrorContainer.innerText = "";
    }
  };

  const allRadios = document.querySelectorAll(
    'input[name="engine"], input[name="seat"], input[name="color"]'
  );
  allRadios.forEach((radio) => {
    radio.addEventListener("change", updateRadioValidation);
  });

  return isValid;
};
