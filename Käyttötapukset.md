# Käyttötapauskuvaukset

## 1. Kirjaudu sisään
**Käyttäjät**: Käyttäjä  
**Laukaisija**: Käyttäjä avaa sovelluksen ja haluaa käyttää sitä.  
**Esiehto**: Käyttäjällä on olemassa olevat tunnukset.  
**Jälkiehto**: Käyttäjä on kirjautunut onnistuneesti sisään tai saanut ilmoituksen virheellisestä salasanasta.  
**Käyttötapauksen kulku**:  
1. Käyttäjä avaa sovelluksen.  
2. Sovellus pyytää käyttäjää syöttämään käyttäjätunnuksen ja salasanan.  
3. Käyttäjä syöttää vaaditut tiedot.  
4. Sovellus tarkistaa, ovatko tiedot oikein.  
5. Jos tiedot ovat oikein, käyttäjä pääsee kirjautumaan sisään.  
6. Jos tiedot ovat väärin, näytetään ilmoitus "Väärä salasana".  
**Poikkeuksellinen toiminta**: Käyttäjä syöttää väärän salasanan -> Näytetään ilmoitus "Väärä salasana".

---

## 2. Ylläpitäjä kirjautuu sisään
**Käyttäjät**: Sovelluksen ylläpitäjä  
**Laukaisija**: Ylläpitäjä avaa sovelluksen ja haluaa käyttää ylläpito-ominaisuuksia.  
**Esiehto**: Ylläpitäjällä on olemassa olevat ylläpitäjätunnukset.  
**Jälkiehto**: Ylläpitäjä on kirjautunut onnistuneesti sisään tai saanut ilmoituksen virheellisestä salasanasta.  
**Käyttötapauksen kulku**:  
1. Ylläpitäjä avaa sovelluksen.  
2. Sovellus pyytää ylläpitäjää syöttämään käyttäjätunnuksen ja salasanan.  
3. Ylläpitäjä syöttää vaaditut tiedot.  
4. Sovellus tarkistaa, ovatko tiedot oikein.  
5. Jos tiedot ovat oikein, ylläpitäjä pääsee kirjautumaan sisään ja pääsee käsiksi ylläpito-ominaisuuksiin.  
6. Jos tiedot ovat väärin, näytetään ilmoitus "Väärä salasana".  
**Poikkeuksellinen toiminta**: Ylläpitäjä syöttää väärän salasanan -> Näytetään ilmoitus "Väärä salasana".

---

## 3. Luo äänestyksiä
**Käyttäjät**: Sovelluksen ylläpitäjä  
**Laukaisija**: Ylläpitäjä haluaa luoda uuden äänestyksen.  
**Esiehto**: Ylläpitäjä on kirjautunut sisään.  
**Jälkiehto**: Äänestys on luotu ja valmis käyttäjille.  
**Käyttötapauksen kulku**:  
1. Ylläpitäjä valitsee vaihtoehdon "Luo äänestys".  
2. Ylläpitäjä asettaa äänestykselle vaihtoehdot.  
3. Ylläpitäjä asettaa äänestyksen keston.  
4. Äänestys tallennetaan ja siitä ilmoitetaan käyttäjille.  
**Poikkeuksellinen toiminta**: Äänestyksen asetuksia ei voida tallentaa -> Ylläpitäjälle näytetään virheilmoitus.

---

## 4. Selaa äänestyksiä
**Käyttäjät**: Käyttäjä  
**Laukaisija**: Käyttäjä haluaa nähdä avoimia äänestyksiä.  
**Esiehto**: Käyttäjä on kirjautunut sisään.  
**Jälkiehto**: Käyttäjä näkee avoimet äänestykset.  
**Käyttötapauksen kulku**:  
1. Käyttäjä valitsee vaihtoehdon "Selaa äänestyksiä".  
2. Sovellus näyttää listan avoimista äänestyksistä.  
**Poikkeuksellinen toiminta**: Ei avoimia äänestyksiä -> Näytetään ilmoitus "Ei avoimia äänestyksiä".

---

## 5. Äänestä
**Käyttäjät**: Käyttäjä  
**Laukaisija**: Käyttäjä haluaa äänestää avoimessa äänestyksessä.  
**Esiehto**: Käyttäjä on kirjautunut sisään ja valinnut äänestyksen.  
**Jälkiehto**: Käyttäjä on antanut äänensä onnistuneesti.  
**Käyttötapauksen kulku**:  
1. Käyttäjä valitsee äänestyksen, jossa hän haluaa äänestää.  
2. Sovellus näyttää äänestysvaihtoehdot.  
3. Käyttäjä valitsee vaihtoehdon ja vahvistaa äänestyksen.  
4. Sovellus rekisteröi käyttäjän äänen.  
**Poikkeuksellinen toiminta**: Ääntä ei voida rekisteröidä -> Näytetään virheilmoitus.

---

## 6. Tarkista äänestyksen tila/tulokset
**Käyttäjät**: Käyttäjä  
**Laukaisija**: Käyttäjä haluaa nähdä äänestyksen tulokset tai nykytilan.  
**Esiehto**: Käyttäjä on äänestänyt tai tarkastelee äänestyksen tuloksia.  
**Jälkiehto**: Käyttäjä näkee äänestyksen tilan tai tulokset.  
**Käyttötapauksen kulku**:  
1. Käyttäjä valitsee äänestyksen tulokset.  
2. Sovellus näyttää äänestyksen nykyisen tilan tai lopulliset tulokset.  
**Poikkeuksellinen toiminta**: Tuloksia ei voida näyttää -> Näytetään virheilmoitus.

---

## 7. Poista ääni
**Käyttäjät**: Käyttäjä  
**Laukaisija**: Käyttäjä haluaa poistaa antamansa äänen.  
**Esiehto**: Käyttäjä on äänestänyt kyseisessä äänestyksessä.  
**Jälkiehto**: Käyttäjän ääni on poistettu.  
**Käyttötapauksen kulku**:  
1. Käyttäjä valitsee vaihtoehdon "Poista ääni".  
2. Sovellus varmistaa, että käyttäjä haluaa poistaa äänen.  
3. Ääni poistetaan ja tulokset päivitetään.  
**Poikkeuksellinen toiminta**: Ääntä ei voida poistaa -> Näytetään virheilmoitus.

---

## 8. Sulje äänestys
**Käyttäjät**: Sovelluksen ylläpitäjä  
**Laukaisija**: Ylläpitäjä haluaa sulkea äänestyksen.  
**Esiehto**: Äänestysaika on umpeutunut tai ylläpitäjä haluaa manuaalisesti sulkea äänestyksen.  
**Jälkiehto**: Äänestys on suljettu ja tulokset ovat saatavilla.  
**Käyttötapauksen kulku**:  
1. Ylläpitäjä valitsee vaihtoehdon "Sulje äänestys".  
2. Sovellus varmistaa, että ylläpitäjä haluaa sulkea äänestyksen.  
3. Äänestys suljetaan ja tulokset lasketaan.  
**Poikkeuksellinen toiminta**: Äänestystä ei voida sulkea -> Näytetään virheilmoitus.

---

## 9. Poista äänestys
**Käyttäjät**: Sovelluksen ylläpitäjä  
**Laukaisija**: Ylläpitäjä haluaa poistaa äänestyksen.  
**Esiehto**: Äänestys on suljettu.  
**Jälkiehto**: Äänestys on poistettu järjestelmästä.  
**Käyttötapauksen kulku**:  
1. Ylläpitäjä valitsee vaihtoehdon "Poista äänestys".  
2. Sovellus varmistaa, että ylläpitäjä haluaa poistaa äänestyksen.  
3. Äänestys poistetaan.  
**Poikkeuksellinen toiminta**: Äänestystä ei voida poistaa -> Näytetään virheilmoitus.
