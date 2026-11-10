---
title: "Contact"
layout: single
permalink: /nl/contact/
author_profile: true
translation_key: contact
lang: nl
---

Heb je vragen, opmerkingen of suggesties? Neem gerust contact met me op via onderstaand formulier. Ik neem zo snel mogelijk contact met je op.

<form class="contact-form"
      action="https://formspree.io/f/YOUR_FORM_ID"
      method="POST">

  <div class="form-group">
    <label for="name">Naam</label>
    <input type="text" id="name" name="name" required>
  </div>

  <div class="form-group">
    <label for="email">Email adres</label>
    <input type="email" id="email" name="email" required>
  </div>

  <div class="form-group">
    <label for="subject">Onderwerp</label>
    <input type="text" id="subject" name="subject" required>
  </div>

  <div class="form-group">
    <label for="message">Bericht</label>
    <textarea id="message" name="message" rows="6" required></textarea>
  </div>

  <input type="text" name="_gotcha" style="display:none">

  <button type="submit">Bericht versturen</button>

</form>