// ========================================
// KONTAKT MANAGER - JAVASCRIPT
// Schnupperlehre Applikationsentwickler EFZ
// 3 Stunden Programmieraufgabe
// ========================================

console.log("🚀 Kontakt Manager wird geladen...");

// ========================================
// 1. GLOBALE VARIABLEN
// ========================================

let contacts = []; // Array für alle Kontakte
let editingContactId = null; // ID des aktuell bearbeiteten Kontakts

// ========================================
// 2. DOM ELEMENTE REFERENZIEREN
// ========================================

const contactForm = document.getElementById('contactForm');
const contactsList = document.getElementById('contactsList');
const emptyState = document.getElementById('emptyState');
const contactCount = document.getElementById('contactCount');
const searchBox = document.getElementById('searchBox');
const submitBtn = document.getElementById('submitBtn');

// ========================================
// 3. BEISPIEL KONTAKTE (zum Testen)
// ========================================

const exampleContacts = [
    {
        id: 1,
        name: "Arlind Bekjiri",
        email: "arlind.bekjiri@gmail.com",
        phone: "079 123 45 67",
        company: "TechFirma AG"
    },
    {
        id: 2,
        name: "Mehmet Dere",
        email: "mehmet.dere@firma.ch",
        phone: "079 987 65 43",
        company: "StartUp GmbH"
    },
    {
        id: 3,
        name: "Gabriele Logiurato",
        email: "Gabriele@webdesign.ch",
        phone: "079 456 78 90",
        company: "Creative Studio"
    }
];

// ========================================
// EURE PROGRAMMIER-AUFGABEN (TODOs)
// ========================================

// ----------------------------------------
// TODO 1: KONTAKTE LADEN ⭐
// ----------------------------------------
// Aufgabe: Kontakte aus localStorage laden, sonst Beispieldaten verwenden
function loadContacts() {
    console.log("📂 TODO 1: Kontakte laden...");

    // TIPPS:
    // - localStorage.getItem('contacts') um gespeicherte Daten zu holen
    // - JSON.parse() um Text zurück in JavaScript-Array zu wandeln
    // - Falls null/undefined, dann exampleContacts verwenden

    // ✏️ DEINE LÖSUNG:
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
    } else {
        contacts = exampleContacts;
    }

    updateContactCount()
}

// ----------------------------------------
// TODO 2: KONTAKTE ANZEIGEN ⭐⭐
// ----------------------------------------
// Aufgabe: Alle Kontakte als HTML-Karten darstellen
function displayContacts(contactsToShow = contacts) {
    console.log("🖼️ TODO 2: Kontakte anzeigen...");

    // TIPPS:
    // - contactsList.innerHTML = '' zum Leeren der Liste
    // - contactsToShow.forEach() um durch Array zu gehen
    // - Template Literals `<div>${variable}</div>` für HTML
    // - data-id="${contact.id}" für die Buttons ist wichtig!

    // HTML-Struktur Beispiel:
    // <div class="contact-card">
    //   <div class="contact-header">
    //     <div>
    //       <div class="contact-name">NAME</div>
    //       <div class="contact-info">
    //         <p>📧 EMAIL</p>
    //         <p>📱 PHONE</p>
    //         <p>🏢 COMPANY</p>
    //       </div>
    //     </div>
    //     <div class="contact-actions">
    //       <button class="btn btn-edit" data-id="ID">Bearbeiten</button>
    //       <button class="btn btn-delete" data-id="ID">Löschen</button>
    //     </div>
    //   </div>
    // </div>

    // ✏️ DEINE LÖSUNG:
    contactsList.innerHTML = ''

    contactsToShow.forEach(contact => {
        const contactCard = `
            <div class="contact-card">
                <div class="contact-header">
                    <div>
                    <div class="contact-name">${contact.name}</div>
                    <div class="contact-info">
                        <p>📧 ${contact.email}</p>
                        <p>📱 ${contact.phone}</p>
                        <p>🏢 ${contact.company}</p>
                    </div>
                    </div>
                    <div class="contact-actions">
                        <button class="btn btn-edit" data-id="${contact.id}">Bearbeiten</button>
                        <button class="btn btn-delete" data-id="${contact.id}">Löschen</button>
                    </div>
                </div>
            </div>
        `

        contactsList.innerHTML += contactCard
    })

    // Diese Zeile am Ende nicht vergessen:
    toggleEmptyState();
}

// ----------------------------------------
// TODO 3: KONTAKT ERSTELLEN ⭐⭐
// ----------------------------------------
// Aufgabe: Neuen Kontakt aus Formular-Daten erstellen
function createContact(contactData) {
    console.log("➕ TODO 3: Kontakt erstellen...", contactData);

    // TIPPS:
    // - Date.now() für eindeutige ID verwenden
    // - Neues Objekt mit id, name, email, phone, company erstellen
    // - contacts.push() um zum Array hinzuzufügen
    // - saveContacts(), displayContacts(), updateContactCount() aufrufen

    // ✏️ DEINE LÖSUNG:
    const newContact = {
        id: Date.now(),
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        company: contactData.company
    };
    contacts.push(newContact)
    saveContacts()
    displayContacts()
    updateContactCount()
}

// ----------------------------------------
// TODO 4: KONTAKT AKTUALISIEREN ⭐⭐
// ----------------------------------------
// Aufgabe: Bestehenden Kontakt bearbeiten
function updateContact(id, contactData) {
    console.log("📝 TODO 4: Kontakt aktualisieren...", id, contactData);

    // TIPPS:
    // - contacts.find() um den richtigen Kontakt zu finden
    // - Vergleich: c => c.id == id
    // - Eigenschaften des gefundenen Kontakts überschreiben
    // - saveContacts(), displayContacts(), updateContactCount() aufrufen

    // ✏️ DEINE LÖSUNG:
    const find_contact = contacts.find(contact => contact.id == id)
    find_contact.name = contactData.name
    find_contact.email = contactData.email
    find_contact.phone = contactData.phone
    find_contact.company = contactData.company
    saveContacts()
    displayContacts()
    updateContactCount()
}

// ----------------------------------------
// TODO 5: KONTAKT LÖSCHEN ⭐⭐
// ----------------------------------------
// Aufgabe: Kontakt aus Array entfernen
function deleteContact(id) {
    console.log("🗑️ TODO 5: Kontakt löschen...", id);

    // TIPPS:
    // - contacts.filter() erstellt neues Array ohne den zu löschenden Kontakt
    // - Bedingung: contact => contact.id != id (alle außer diesem behalten)
    // - , displayContacts(), updateContactCount() aufrufen

    // ✏️ DEINE LÖSUNG:
    contacts = contacts.filter(contact => contact.id != id)
    saveContacts()
    displayContacts()
    updateContactCount()
}

// ----------------------------------------
// TODO 6: KONTAKTE SPEICHERN ⭐
// ----------------------------------------
// Aufgabe: Kontakte dauerhaft im Browser speichern
function saveContacts() {
    console.log("💾 TODO 6: Kontakte speichern...");

    // TIPPS:
    // - JSON.stringify() wandelt JavaScript-Array in Text um
    // - localStorage.setItem() speichert im Browser
    // - Key: 'contacts', Value: JSON String

    // ✏️ DEINE LÖSUNG:
    const SaveContacts = JSON.stringify(contacts)
    localStorage.setItem('contacts', SaveContacts)
}

// ----------------------------------------
// TODO 7: KONTAKT-ANZAHL ANZEIGEN ⭐
// ----------------------------------------
// Aufgabe: Status-Bar mit aktueller Anzahl aktualisieren
function updateContactCount() {
    console.log("🔢 TODO 7: Kontakt-Anzahl aktualisieren...");

    // TIPPS:
    // - contacts.length für die Anzahl
    // - contactCount.textContent zum Setzen des Textes
    // - Singular/Plural beachten: 1 Kontakt vs. 2 Kontakte

    // ✏️ DEINE LÖSUNG:
    if (!contacts || contacts.length != 1) {
        contactCount.textContent = contacts.length + ' Kontakte'
    }
    if (contacts.length == 1) {
        contactCount.textContent = contacts.length + ' Kontakt'
    }
}

// ----------------------------------------
// TODO 8: FORMULAR SUBMIT EVENT ⭐⭐⭐
// ----------------------------------------
// Aufgabe: Wenn Formular abgeschickt wird, Kontakt erstellen/bearbeiten
contactForm.addEventListener('submit', function (e) {
    console.log("📝 TODO 8: Form Submit Event...");

    // TIPPS:
    // - e.preventDefault() verhindert Seiten-Reload
    // - new FormData(contactForm) holt alle Formular-Daten
    // - formData.get('name') für spezifische Felder
    // - editingContactId prüfen: null = neu erstellen, sonst bearbeiten
    // - createContact() oder updateContact() aufrufen
    // - Formular zurücksetzen mit contactForm.reset() oder resetForm()

    // ✏️ DEINE LÖSUNG:
    e.preventDefault()
    const formData = new FormData(contactForm)
    const contact = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company'),
    }

    if (editingContactId) {
        updateContact(editingContactId, contact)
    } else {
        createContact(contact)
    }
});

// ----------------------------------------
// TODO 9: SUCHFUNKTION ⭐⭐⭐
// ----------------------------------------
// Aufgabe: Kontakte in Echtzeit durchsuchen
searchBox.addEventListener('input', function (e) {
    console.log("🔍 TODO 9: Suche...");

    // TIPPS:
    // - e.target.value für den eingegebenen Suchbegriff
    // - .toLowerCase() für Groß-/Kleinschreibung ignorieren
    // - contacts.filter() um passende Kontakte zu finden
    // - string.includes(suchbegriff) prüft ob Text enthalten
    // - || für "oder" um mehrere Felder zu durchsuchen
    // - displayContacts(gefilterte_kontakte) zum Anzeigen

    // ✏️ DEINE LÖSUNG:
    const Suchbegriff = e.target.value.toLowerCase()
    const gefilterte_kontakte = contacts.filter(contact =>
        contact.name.toLowerCase().includes(Suchbegriff)
        || contact.email.toLowerCase().includes(Suchbegriff))
    displayContacts(gefilterte_kontakte)

    console.log("❌ TODO 9 noch nicht implementiert!");
});

// ----------------------------------------
// TODO 10: EDIT/DELETE BUTTONS ⭐⭐⭐⭐
// ----------------------------------------
// Aufgabe: Auf Edit/Delete Button-Klicks reagieren (schwierigste Aufgabe!)
contactsList.addEventListener('click', function (e) {
    console.log("🖱️ TODO 10: Button geklickt...");

    // TIPPS für Edit Button:
    // - e.target.classList.contains('btn-edit') prüft CSS-Klasse
    // - e.target.dataset.id holt die data-id vom HTML
    // - parseInt() wandelt Text in Zahl um
    // - contacts.find() um Kontakt zu finden
    // - fillForm(contact) füllt das Formular (schon programmiert!)
    // - editingContactId setzen und Submit-Button Text ändern

    // TIPPS für Delete Button:
    // - e.target.classList.contains('btn-delete') prüfen
    // - confirm() zeigt Sicherheitsabfrage
    // - deleteContact(id) aufrufen falls bestätigt

    // ✏️ DEINE LÖSUNG:
    const id = parseInt(e.target.dataset.id)
    if (e.target.classList.contains('btn-edit')) {
        const find_contact = contacts.find(contact => contact.id == id)
        fillForm(find_contact)
        editingContactId = id
        submitBtn.textContent = 'Kontakt bearbeiten'
    }
    if (e.target.classList.contains('btn-delete')) {
        if (confirm('Sind sie sich sicher?')) {
            deleteContact(id)
        }
    }
});

// ========================================
// HILFSFUNKTIONEN (schon programmiert!)
// ========================================

// Formular zurücksetzen
function resetForm() {
    contactForm.reset();
    editingContactId = null;
    submitBtn.textContent = 'Kontakt hinzufügen';
    console.log("🔄 Formular zurückgesetzt");
}

// Formular mit Kontakt-Daten füllen
function fillForm(contact) {
    document.getElementById('name').value = contact.name || '';
    document.getElementById('email').value = contact.email || '';
    document.getElementById('phone').value = contact.phone || '';
    document.getElementById('company').value = contact.company || '';
    console.log("📝 Formular gefüllt mit:", contact.name);
}

// Leeren Zustand ein/ausblenden
function toggleEmptyState() {
    if (contacts.length === 0) {
        emptyState.style.display = 'block';
    } else {
        emptyState.style.display = 'none';
    }
}

// ========================================
// BONUS AUFGABEN (für Schnelle!)
// ========================================

// BONUS 1: Sortierung nach Name
function sortContacts() {
    console.log("🔤 BONUS: Sortierung...");
    // TIPP: contacts.sort((a, b) => a.name.localeCompare(b.name))
}

// BONUS 2: Export als JSON-Datei
function exportContacts() {
    console.log("📤 BONUS: Export...");
    // TIPP: Blob und URL.createObjectURL() verwenden
}

// BONUS 3: Validation (Email-Überprüfung)
function validateEmail(email) {
    console.log("✅ BONUS: Validation...");
    // TIPP: email.includes('@') && email.includes('.')
    return true; // Placeholder
}

// BONUS 4: Kategorien hinzufügen
function addCategory() {
    console.log("📂 BONUS: Kategorien...");
    // TIPP: Select-Dropdown im HTML hinzufügen
}

// BONUS 5: Dark Mode
function toggleDarkMode() {
    console.log("🌙 BONUS: Dark Mode...");
    // TIPP: CSS Custom Properties und classList.toggle()
}

// ========================================
// PROGRAMM STARTEN
// ========================================

document.addEventListener('DOMContentLoaded', function () {
    console.log("🎯 Kontakt Manager gestartet!");
    console.log("📋 TODOs für heute:");
    console.log("1. ⭐ loadContacts() - Daten laden");
    console.log("2. ⭐⭐ displayContacts() - Kontakte anzeigen");
    console.log("3. ⭐⭐ createContact() - Neuen Kontakt erstellen");
    console.log("4. ⭐⭐ updateContact() - Kontakt bearbeiten");
    console.log("5. ⭐⭐ deleteContact() - Kontakt löschen");
    console.log("6. ⭐ saveContacts() - Speichern im Browser");
    console.log("7. ⭐ updateContactCount() - Anzahl anzeigen");
    console.log("8. ⭐⭐⭐ Form Submit Event - Formular handling");
    console.log("9. ⭐⭐⭐ Suchfunktion - Live-Suche");
    console.log("10. ⭐⭐⭐⭐ Edit/Delete Events - Button-Klicks");
    console.log("🚀 Viel Erfolg beim Programmieren!");
    console.log("💡 Vergiss nicht: F12 → Console für Debugging!");

    // Diese Funktionen werden aufgerufen, sobald ihr sie programmiert habt:
    loadContacts();
    displayContacts();
});