# Feedback
Deze feedback is op basis van https://github.com/EHB-TI/web-app-the-wolf-pack/releases/tag/v0.2

## Gebruikte tools
- DAST
    - Zed Attack Proxy(https://www.zaproxy.org/)
- SAST
    - Semgrep(https://semgrep.dev/)
    - Coverity(https://scan.coverity.com/) (gaven geen security breaches)
    - SonarQube(https://www.sonarqube.org/features/security/) (gaven geen securirty breaches)
- SCA
    - Dependabot(https://docs.github.com/en/code-security/supply-chain-security/managing-vulnerabilities-in-your-projects-dependencies/about-alerts-for-vulnerable-dependencies)
    - Snyk(https://snyk.io/test/)
    - npm audit(https://docs.npmjs.com/cli/v7/commands/npm-audit)
- HTTPS
    - https://www.ssllabs.com/ssltest/
- 

### Acceptance criteria

| Criteria                                                                              |  Passed | Notes |
| ------------------------------------------------------------------------------------- |  :----: | ----- |
| Als klant kan ik een account aanmaken | :white_check_mark: |
| Als klant kan ik mij inloggen op mijn account | :white_check_mark: |
| Als klant kan ik een overzicht zien van actuele en/of toekomstige films | :white_check_mark: |
| Als klant kan ik een beschrijving lezen van een film | :white_check_mark: |
| Als klant kan ik een programma zien van wanneer een film zal worden afgespeeld | :white_check_mark: |
| Als klant kan ik mijn klantgegevens wijzigen/bekijken | :x: |
| Als klant kan ik uitloggen van mijn account | :white_check_mark: |
| Als klant kan ik online tickets aankopen | :x: |
| Als klant kan ik me uitschrijven van de website | :white_check_mark: |
| Als beheerder kan ik inloggen op mijn account | :white_check_mark: |
| Als beheerder kan ik films toevoegen | :white_check_mark: |
| Als beheerder kan ik het programma aanmaken voor de films |  | Voegt geen ticket toe voor datum |
| Als beheerder kan ik uitloggen van mijn account | :white_check_mark: |
| Als beheerder kan ik me uitschrijven van de website | :x: |
| Als beheerder kan ik andere beheerders toevoegen | :x: |
| Als bezoeker kan ik een overzicht zien van actuele en/of toekomstige films | :white_check_mark: |
| Als bezoeker kan ik een beschrijving lezen van een film | :white_check_mark: |
| Als bezoeker kan ik een programma zien van wanneer een film zal worden afgespeeld | :white_check_mark: |

### HTTPS

- Het is niet mogelijk om de website (https://thewolfpackreact.web.app/) en de API (https://www.the-wolf-pack.be/movies) te bereiken zonder HTTPS te gebruiken.
- Beide zijn ook trusted door de mainstream browsers:
  - Web App: ![image](https://user-images.githubusercontent.com/44073137/145893922-20acf930-21b3-44d4-ac92-3fae86a28812.png)
  - API: ![image](https://user-images.githubusercontent.com/44073137/145893989-36ef9542-5650-4f67-9392-2fcc755e32b8.png)
- De domeinen krijgen beide een score van A+ op de SSL Labs server test
  - Web App: ![image](https://user-images.githubusercontent.com/44073137/145894085-87d4b7bf-f194-4eca-83ce-adddf42003fc.png)
  - API: ![image](https://user-images.githubusercontent.com/44073137/145894194-ad31e210-8d27-4649-89c2-46d868d6bd6d.png)
- Beide bevatten ook een Strict-Transport-Security header
  - Web App: ![image](https://user-images.githubusercontent.com/44073137/145894428-bc9b705b-a33a-4a04-a084-c835ea209063.png)
  - API: ![image](https://user-images.githubusercontent.com/44073137/145894476-5858098d-4244-4d47-a37c-89d5a4a0bb78.png)
- De web app staat in een HSTS preload list, en het domain van hun API is momenteel pending.
  - Web App: ![image](https://user-images.githubusercontent.com/44073137/145894730-f6943b0c-e965-4106-9b36-30d13a85ee46.png)
  - API: ![image](https://user-images.githubusercontent.com/44073137/145895036-443ee55d-9c98-41a5-833f-f185a8e5a5f5.png)
  ![image](https://user-images.githubusercontent.com/44073137/145894801-c59a2d49-fce0-4935-8706-44a649e66922.png)
- De CAA DNS Resource records zijn ook voor beide in orde.
  - Web App: ![image](https://user-images.githubusercontent.com/44073137/145894962-b5e50b4f-8075-4d00-82c8-8700c995ea40.png)
  - API: ![image](https://user-images.githubusercontent.com/44073137/145895071-0f18e9a0-9826-43f7-9a73-7bc8a39a4e8c.png)

### Aanmelden
De user kan niks aan zijn account aanpassen. Er is ook een waarschuwing vemeld door de gebruikte Auth0.
![Auth0 warning](https://cdn.discordapp.com/attachments/649230019817635854/920046685688844329/unknown.png)

### Wachtwoorden
Wachtwoorden worden niet door eigen applicatie geregeld.

### Web vulnerabilities
Er werden 5 alerts vermeld als uitkomst door de webpagina aan te vallen met behulp van ZAP.
Alerts:
- X-Frame-Options Header Not Set (medium risk)
- Incomplete or No Cache-control Header Set (low risk)
- Timestamps Disclosure – Unix (low risk)
- X-Content-Type-Options Header missing (low risk)
- Information Disclosure – Suspicious Comments (informational)

![ZAP alerts Web](https://cdn.discordapp.com/attachments/649230019817635854/920047817010077716/unknown.png)

Volgende kwetsbaarheden (Comon vulnerabilites and exposures) kwamen naar boven in de synk test:
- missing security headers: 
    - x content type options (low risk)
    - x frame options (medium risk)
    - content security policy (high risk)
    - x xss protection (low risk)
- cross-site scriptin (high risk)
- prototype pullution (medium risk)

![Screenshot 2021-12-14 at 3 20 08 PM](https://user-images.githubusercontent.com/48216176/146016969-8988ff75-fcb9-4b6f-b9a1-4ef053c08a39.png)

Verder kwamen volgende web vulnerabilites boven tijdens de SCA (synk) testen: 
- command injecton (high risk)
- remote code execution (high risk)
- arbritary code injecton (medium risk)
- regular expression denial of service (high risk)
- session fixation (medium risk)

<img width="1552" alt="Screenshot 2021-12-11 at 6 35 10 PM" src="https://user-images.githubusercontent.com/48216176/145994106-dffac9b6-9d05-457e-9182-7e8972c5dffc.png">
<img width="1552" alt="Screenshot 2021-12-11 at 6 35 23 PM" src="https://user-images.githubusercontent.com/48216176/145994166-3e1501c1-ff2f-42d2-898f-b6749b396c77.png">
<img width="1552" alt="Screenshot 2021-12-11 at 6 35 30 PM" src="https://user-images.githubusercontent.com/48216176/145994192-9745a4e4-587f-4857-978a-ce7ef4641fed.png">
<img width="1552" alt="Screenshot 2021-12-11 at 6 35 44 PM" src="https://user-images.githubusercontent.com/48216176/145994237-0bebab06-3013-46a4-a7d7-a9806e6b4fbb.png">


### REST API
Er werden 5 alerts vermeld als uitkomst door de API aan te vallen met behulp van ZAP.
Alerts:
- Incomplete or No Cache-control Header Set (low risk)
- Timestamp Disclosure - Unix (low risk)

![ZAP alerts API](https://cdn.discordapp.com/attachments/649230019817635854/920047215358140426/unknown.png)

## Threat Model
- Niet alle elementen die in het Threat model staan zijn duidelijk wat ze precies betekenen.


## Aanbevelingen
- Verificatie voor fake accounts/fake emails toevoegen
- updaten van packages ! [npm audit.txt](https://github.com/EHB-TI/web-app-the-dark-side/files/7711460/npm.audit.txt)<img width="1552" alt="Screenshot 2021-12-11 at 6 23 21 PM" src="https://user-images.githubusercontent.com/48216176/145995454-35a44089-2ad1-413c-8898-cf74a78a28a9.png">

- owasp injection en secure design moeten herzien worden.
