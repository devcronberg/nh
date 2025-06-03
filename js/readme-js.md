# JavaScript Begreber - Remember App

En simpel forklaring af de tekniske begreber brugt i Remember applikationen.

## 🟨 JavaScript
JavaScript er et programmeringssprog der kører i browseren. Det gør hjemmesider interaktive - f.eks. når du klikker på en knap eller skriver i et felt. I Remember appen bruges JavaScript til at tilføje, slette og vise opgaver.

## 💾 LocalStorage
LocalStorage er browserens måde at gemme data lokalt (og kun lokalt) på din computer. Det er som en lille database der kun din browser kan se. I Remember appen gemmes alle dine opgaver her, så de er der næste gang du åbner siden.

## 📦 JSON
JSON (JavaScript Object Notation) er en måde at organisere data på - ligesom at skrive en struktureret liste. F.eks.:
```json
{
  "id": "123",
  "text": "Køb mælk", 
  "completed": false
}
```
Remember appen bruger JSON til at gemme opgaverne i LocalStorage.

## 🌐 DOM
DOM (Document Object Model) er browserens måde at forstå HTML på. Det er som et kort over alle elementer på siden. JavaScript bruger DOM til at ændre indholdet - f.eks. tilføje en ny opgave til listen uden at genindlæse siden.

## ⚡ Events
Events er "begivenheder" der sker på siden - som når du klikker, trykker på en tast eller rører skærmen. JavaScript kan "lytte" efter disse events og reagere. I Remember appen lytter vi efter klik på knapper og long-press for at slette opgaver.

## 🪟 Modal
En modal er en popup-boks der vises oven på siden. Den bruges til at få brugerens opmærksomhed - f.eks. til at bekræfte en handling eller indtaste data. Remember appen bruger modals til at tilføje nye opgaver og bekræfte sletning.

## 📁 ES6 Modules
Modules er en måde at organisere kode i separate filer. I stedet for at have alt JavaScript i én stor fil, deler vi det op i mindre, logiske dele. Remember appen har:
- `app.js` - starter applikationen
- `db.js` - håndterer data 
- `opgave.js` - håndterer brugergrænsefladen

## 🎨 Bootstrap
Bootstrap er et CSS/JavaScript framework der giver færdige komponenter som knapper, modals og responsivt design. Det sparer tid og sikrer at appen ser professionel ud på alle enheder.

## 🆔 GUID
GUID (Globally Unique Identifier) er en unik kode der identificerer hver opgave. Ligesom dit CPR-nummer er unikt for dig, har hver opgave sit eget GUID så systemet kan skelne mellem dem.


