## Jak uruchomić
Aby uruchomić proszę wpisać komendę:
```shell
# firstly install dependencies
npm install

# webpack-dev-server
npm run serve

#npm http-server
npm run watch
#or
npm run dev
#or
npm run build

cd dist
npx http-server
```

## Drobne uwagi
Chciałem wypróbować własny plugin Vue do wyświetlenia tostów, i jak się okazało nie jest on jeszcze w pełni gotowy do produkcji :)
Dlatego te powiadomienia nie wyglądają zbyt dobrze.

Także nie udało się uzyskać od serwera pozytywnej odpowiedzi, cały czas dostaję się błąd 500. Zakomentowałem kawałek kodu (plik `SignupPopupComponent.vue`, linijka `135`), który symuluje pozytywną odpowiedź:
```javascript
if (!res.ok)
    throw new Error(res.statusText);

// Something wrong with server, getting 500 Internal server error all the time :/
// return {status: 'ok', message: 'Hello 😉! How are you?'};
return res.json();
```


