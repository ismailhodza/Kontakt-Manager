// ========================================
// KONTAKT MANAGER - JAVASCRIPT LÖSUNGEN
// Schnupperlehre Applikationsentwickler EFZ
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
        email: "gabriele@logiurato.ch",
        phone: "079 456 78 90",
        company: "Creative Studio"
    }
];

// ========================================
// LÖSUNGEN FÜR ALLE TODOs
// ========================================

// ----------------------------------------
// TODO 1: KONTAKTE LADEN ⭐
// ----------------------------------------
function loadContacts() {
    console.log("📂 TODO 1: Kontakte laden...");

    // 1. Versuche Kontakte aus localStorage zu holen
    const savedContacts = localStorage.getItem('contacts');

    // 2. Falls vorhanden: umwandeln, sonst Beispieldaten
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
        console.log("✅ Gespeicherte Kontakte geladen:", contacts.length);
    } else {
        contacts = exampleContacts;
        console.log("✅ Beispiel-Kontakte geladen:", contacts.length);
    }
}

// ----------------------------------------
// TODO 2: KONTAKTE ANZEIGEN ⭐⭐
// ----------------------------------------
function displayContacts(contactsToShow = contacts) {
    console.log("🖼️ TODO 2: Kontakte anzeigen...");

    // 1. Liste leeren
    contactsList.innerHTML = '';

    // 2. Durch alle Kontakte gehen
    contactsToShow.forEach(contact => {
        // 3. HTML für jeden Kontakt erstellen
        const contactCard = `
            <div class="contact-card">
                <div class="contact-header">
                    <div>
                        <div class="contact-name">${contact.name}</div>
                        <div class="contact-info">
                            <p>📧 ${contact.email}</p>
                            <p>📱 ${contact.phone || 'Keine Nummer'}</p>
                            <p>🏢 ${contact.company || 'Keine Firma'}</p>
                        </div>
                    </div>
                    <div class="contact-actions">
                        <button class="btn btn-edit" data-id="${contact.id}">Bearbeiten</button>
                        <button class="btn btn-delete" data-id="${contact.id}">Löschen</button>
                    </div>
                </div>
            </div>
        `;

        // 4. HTML zur Liste hinzufügen
        contactsList.innerHTML += contactCard;
    });

    // 5. Leeren Zustand ein/ausblenden
    toggleEmptyState();

    console.log("✅ Kontakte angezeigt:", contactsToShow.length);
}

// ----------------------------------------
// TODO 3: KONTAKT ERSTELLEN ⭐⭐
// ----------------------------------------
function createContact(contactData) {
    console.log("➕ TODO 3: Kontakt erstellen...", contactData);

    // 1. Neues Kontakt-Objekt erstellen
    const newContact = {
        id: Date.now(), // Eindeutige ID basierend auf aktueller Zeit
        name: contactData.name,
        email: contactData.email,
        phone: contactData.phone,
        company: contactData.company
    };

    // 2. Zum contacts Array hinzufügen
    contacts.push(newContact);

    // 3. Speichern, anzeigen und Anzahl aktualisieren
    saveContacts();
    displayContacts();
    updateContactCount();

    console.log("✅ Kontakt erstellt:", newContact.name);
}

// ----------------------------------------
// TODO 4: KONTAKT AKTUALISIEREN ⭐⭐
// ----------------------------------------
function updateContact(id, contactData) {
    console.log("📝 TODO 4: Kontakt aktualisieren...", id, contactData);

    // 1. Kontakt mit der passenden ID finden
    const contact = contacts.find(contact => contact.id == id);

    // 2. Falls gefunden: Eigenschaften aktualisieren
    if (contact) {
        contact.name = contactData.name;
        contact.email = contactData.email;
        contact.phone = contactData.phone;
        contact.company = contactData.company;

        // 3. Speichern, anzeigen und Anzahl aktualisieren
        saveContacts();
        displayContacts();
        updateContactCount();

        console.log("✅ Kontakt aktualisiert:", contact.name);
    } else {
        console.log("❌ Kontakt nicht gefunden mit ID:", id);
    }
}

// ----------------------------------------
// TODO 5: KONTAKT LÖSCHEN ⭐⭐
// ----------------------------------------
function deleteContact(id) {
    console.log("🗑️ TODO 5: Kontakt löschen...", id);

    // 1. Kontakt für Bestätigung finden
    const contactToDelete = contacts.find(contact => contact.id == id);
    const contactName = contactToDelete ? contactToDelete.name : "Unbekannt";

    // 2. Neues Array ohne den zu löschenden Kontakt erstellen
    contacts = contacts.filter(contact => contact.id != id);

    // 3. Speichern, anzeigen und Anzahl aktualisieren
    saveContacts();
    displayContacts();
    updateContactCount();

    console.log("✅ Kontakt gelöscht:", contactName);
}

// ----------------------------------------
// TODO 6: KONTAKTE SPEICHERN ⭐
// ----------------------------------------
function saveContacts() {
    console.log("💾 TODO 6: Kontakte speichern...");

    // JavaScript-Array in Text umwandeln und speichern
    localStorage.setItem('contacts', JSON.stringify(contacts));

    console.log("✅ Kontakte gespeichert:", contacts.length);
}

// ----------------------------------------
// TODO 7: KONTAKT-ANZAHL ANZEIGEN ⭐
// ----------------------------------------
function updateContactCount() {
    console.log("🔢 TODO 7: Kontakt-Anzahl aktualisieren...");

    const count = contacts.length;

    // Singular/Plural beachten
    const text = count === 1 ?
        `${count} Kontakt gespeichert` :
        `${count} Kontakte gespeichert`;

    contactCount.textContent = text;

    console.log("✅ Anzahl aktualisiert:", count);
}

// ----------------------------------------
// TODO 8: FORMULAR SUBMIT EVENT ⭐⭐⭐
// ----------------------------------------
contactForm.addEventListener('submit', function(e) {
    console.log("📝 TODO 8: Form Submit Event...");

    // 1. Seiten-Reload verhindern
    e.preventDefault();

    // 2. Formular-Daten auslesen
    const formData = new FormData(contactForm);
    const contactData = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        company: formData.get('company')
    };

    console.log("Formular-Daten:", contactData);

    // 3. Bearbeiten oder neu erstellen?
    if (editingContactId) {
        // Bearbeiten
        updateContact(editingContactId, contactData);
        resetForm(); // Formular zurücksetzen
        console.log("✅ Kontakt bearbeitet");
    } else {
        // Neu erstellen
        createContact(contactData);
        contactForm.reset(); // Formular leeren
        console.log("✅ Neuer Kontakt erstellt");
    }
});

// ----------------------------------------
// TODO 9: SUCHFUNKTION ⭐⭐⭐
// ----------------------------------------
searchBox.addEventListener('input', function(e) {
    console.log("🔍 TODO 9: Suche...");

    // 1. Suchbegriff holen und klein schreiben
    const searchTerm = e.target.value.toLowerCase();
    console.log("Suche nach:", searchTerm);

    // 2. Passende Kontakte filtern
    const filteredContacts = contacts.filter(contact => {
        // In mehreren Feldern suchen
        return contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            (contact.phone && contact.phone.includes(searchTerm)) ||
            (contact.company && contact.company.toLowerCase().includes(searchTerm));
    });

    console.log("Gefundene Kontakte:", filteredContacts.length);

    // 3. Gefilterte Kontakte anzeigen
    displayContacts(filteredContacts);
});

// ----------------------------------------
// TODO 10: EDIT/DELETE BUTTONS ⭐⭐⭐⭐
// ----------------------------------------
contactsList.addEventListener('click', function(e) {
    console.log("🖱️ TODO 10: Button geklickt...");

    // Edit Button geklickt?
    if (e.target.classList.contains('btn-edit')) {
        console.log("✏️ Edit Button geklickt");

        // Kontakt-ID aus HTML-Attribut holen
        const contactId = parseInt(e.target.dataset.id);
        console.log("Edit Kontakt ID:", contactId);

        // Kontakt mit dieser ID finden
        const contact = contacts.find(c => c.id === contactId);

        if (contact) {
            // Formular mit Kontakt-Daten füllen (Funktion schon vorhanden)
            fillForm(contact);

            // Merken dass wir bearbeiten (nicht neu erstellen)
            editingContactId = contactId;

            // Button-Text ändern
            submitBtn.textContent = 'Kontakt aktualisieren';

            console.log("✅ Formular gefüllt für:", contact.name);
        }
    }

    // Delete Button geklickt?
    if (e.target.classList.contains('btn-delete')) {
        console.log("🗑️ Delete Button geklickt");

        // Kontakt-ID aus HTML-Attribut holen
        const contactId = parseInt(e.target.dataset.id);
        console.log("Delete Kontakt ID:", contactId);

        // Kontakt für Sicherheitsabfrage finden
        const contact = contacts.find(c => c.id === contactId);

        if (contact) {
            // Sicherheitsabfrage
            const confirmDelete = confirm(`Kontakt "${contact.name}" wirklich löschen?`);

            if (confirmDelete) {
                deleteContact(contactId);
                console.log("✅ Kontakt gelöscht:", contact.name);
            } else {
                console.log("❌ Löschen abgebrochen");
            }
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
// BONUS AUFGABEN (Lösungen)
// ========================================

// BONUS 1: Sortierung nach Name
function sortContacts() {
    console.log("🔤 BONUS: Sortierung...");
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    displayContacts();
    console.log("✅ Kontakte alphabetisch sortiert");
}

// BONUS 2: Export als JSON-Datei
function exportContacts() {
    console.log("📤 BONUS: Export...");
    const dataStr = JSON.stringify(contacts, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'meine-kontakte.json';
    link.click();

    console.log("✅ Kontakte exportiert");
}

// BONUS 3: Validation (Email-Überprüfung)
function validateEmail(email) {
    console.log("✅ BONUS: Validation...");
    return email.includes('@') && email.includes('.');
}

// BONUS 4: Kategorien hinzufügen
function addCategory() {
    console.log("📂 BONUS: Kategorien...");
    // Dropdown-Feld im HTML hinzufügen und entsprechende Logik
}

// BONUS 5: Dark Mode
function toggleDarkMode() {
    console.log("🌙 BONUS: Dark Mode...");
    document.body.classList.toggle('dark-mode');
}

// ========================================
// PROGRAMM STARTEN
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🎯 Kontakt Manager gestartet!");
    console.log("📋 Alle TODOs implementiert:");
    console.log("1. ✅ loadContacts() - Daten laden");
    console.log("2. ✅ displayContacts() - Kontakte anzeigen");
    console.log("3. ✅ createContact() - Neuen Kontakt erstellen");
    console.log("4. ✅ updateContact() - Kontakt bearbeiten");
    console.log("5. ✅ deleteContact() - Kontakt löschen");
    console.log("6. ✅ saveContacts() - Speichern im Browser");
    console.log("7. ✅ updateContactCount() - Anzahl anzeigen");
    console.log("8. ✅ Form Submit Event - Formular handling");
    console.log("9. ✅ Suchfunktion - Live-Suche");
    console.log("10. ✅ Edit/Delete Events - Button-Klicks");
    console.log("🎉 Vollständige Kontakt-Manager App fertig!");

    // App initialisieren
    loadContacts();
    displayContacts();
    updateContactCount();
});