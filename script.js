/*
  script.js = BEHAVIOUR.
  It runs in the browser after index.html has loaded.
  Pattern used everywhere below:
     1. FIND an element     (document.querySelector)
     2. LISTEN for an event (addEventListener)
     3. CHANGE the page     (textContent, classList, style, appendChild ...)
*/

// A small helper: shorter name for document.querySelector.
const $ = (selector) => document.querySelector(selector);

// Writes a plain-English note into the "What script.js just did" line.
function say(message) {
  $("#js-log").textContent = message;
}


/* ================= X-ray view (header button) =================
   Click -> toggle the class "xray" on <body>. styles.css does the drawing. */
const xrayButton = $("#xray-toggle");

xrayButton.addEventListener("click", () => {
  const isOn = document.body.classList.toggle("xray");   // adds the class if missing, removes it if present
  xrayButton.setAttribute("aria-pressed", String(isOn));
  xrayButton.textContent = isOn ? "Turn off X-ray view" : "Turn on X-ray view";
});


/* ================= Section 1: live HTML preview =================
   Every time you type, copy the text from the box into the preview area. */
const htmlEditor  = $("#html-editor");
const htmlPreview = $("#html-preview");

function updatePreview() {
  htmlPreview.innerHTML = htmlEditor.value;   // the browser turns the text into real elements
}
htmlEditor.addEventListener("input", updatePreview);
updatePreview();                              // run once at start so the preview is not empty


/* ================= Section 2: live CSS controls =================
   Each control sets a CSS variable on the card. styles.css already says
   "background: var(--card-bg)", so changing the variable changes the card. */
const card     = $("#sample-card");
const cssCode  = $("#css-output");
const controls = {
  color:  $("#ctl-color"),
  size:   $("#ctl-size"),
  radius: $("#ctl-radius"),
};

function updateCard() {
  const color  = controls.color.value;
  const size   = controls.size.value + "px";
  const radius = controls.radius.value + "px";

  card.style.setProperty("--card-bg", color);
  card.style.setProperty("--card-size", size);
  card.style.setProperty("--card-radius", radius);

  $("#out-size").textContent   = size;
  $("#out-radius").textContent = radius;

  // Show the CSS that is now in effect.
  cssCode.textContent =
`.sample-card {
  background: ${color};
  font-size: ${size};
  border-radius: ${radius};
}`;
}

// "input" fires continuously while a slider or colour picker moves.
Object.values(controls).forEach((control) => control.addEventListener("input", updateCard));
updateCard();


/* ================= Section 3A: counter ================= */
let count = 0;                       // a variable: a named box that remembers a value
const countOut = $("#count-out");

$("#count-btn").addEventListener("click", () => {
  count = count + 1;
  countOut.textContent = count;
  say(`count was increased to ${count} and the number on the page was replaced.`);
});

$("#count-reset").addEventListener("click", () => {
  count = 0;
  countOut.textContent = count;
  say("count was set back to 0.");
});


/* ================= Section 3B: growing list ================= */
const todoForm  = $("#todo-form");
const todoInput = $("#todo-input");
const todoList  = $("#todo-list");

todoForm.addEventListener("submit", (event) => {
  event.preventDefault();            // stop the browser from reloading the page on submit

  const text = todoInput.value.trim();
  if (text === "") {                 // an "if": only continue when something was typed
    say("the box was empty, so nothing was added.");
    return;
  }

  const item = document.createElement("li");   // make a new <li> element from nothing
  item.textContent = text;
  todoList.appendChild(item);                  // put it inside the <ul>

  todoInput.value = "";
  todoInput.focus();
  say(`created a new <li> containing "${text}" and added it to the list.`);
});

// One listener on the list handles clicks on every item, even ones added later.
todoList.addEventListener("click", (event) => {
  const item = event.target.closest("li");
  if (!item) return;
  const nowDone = item.classList.toggle("done");   // styles.css draws the line-through
  say(nowDone
    ? 'added the class "done" to an item. styles.css turned that class into a line-through.'
    : 'removed the class "done" from an item.');
});