# Goal
*Describe how this web app will (eventually) earn money or make the world a better place*

De bedoeling is om de website van onze lokale bioscoop te verbeteren. De Focus bioscoop heeft momenteel twee websites. De eerste website geeft een overzicht van de actuele films, de tweede website wordt gebruikt als webshop waar de klanten hun tickets kunnen aankopen.

- http://www.cinemafocus.be/
- https://tickets.cinemafocus.be/nl/movies


Onze dynamische website zal ervoor zorgen dat de bioscoop over één website beschikt waar een duidelijk en modern overzicht van de actuele en aankomende films getoond zal worden. Verder zullen de aankopen op diezelfde website gebeuren.

# Acceptance criteria
*How do we know that the goals have been reached?*

## Klant

- Als klant kan ik een account aanmaken
- Als klant kan ik mij inloggen op mijn account
- Als klant kan ik een overzicht zien van actuele en/of toekomstige films
- Als klant kan ik een beschrijving lezen van een film
- Als klant kan ik een programma zien van wanneer een film zal worden afgespeeld
- Als klant kan ik mijn klantgegevens wijzigen/bekijken
- Als klant kan ik uitloggen van mijn account
- Als klant kan ik online tickets aankopen
- Als klant kan ik me uitschrijven van de website

## Beheerder

- Als beheerder kan ik inloggen op mijn account
- Als beheerder kan ik films toevoegen
- Als beheerder kan ik het programma aanmaken voor de films
- Als beheerder kan ik uitloggen van mijn account
- Als beheerder kan ik me uitschrijven van de website
- Als beheerder kan ik andere beheerders toevoegen

## Bezoeker

- Als bezoeker kan ik een overzicht zien van actuele en/of toekomstige films
- Als bezoeker kan ik een beschrijving lezen van een film
- Als bezoeker kan ik een programma zien van wanneer een film zal worden afgespeeld

# Threat model
*Describe your threat model. One or more architectural diagram expected. Also a list of the principal threats and what you will do about them*

![ThreatModelDFD](https://user-images.githubusercontent.com/64362709/146467018-f7ae7e17-f3e7-4bf5-8ea0-3d5b3c65943d.jpg)


## OWASP:
| Web Application Security Risks  | Beschrijving van de bedreigingen + **(locatie van bedreiging)** | Oplossing |
| ------------- | ------------- | ------------- |
| Broken Access Control  | Pagina's die verleend worden aan bepaalde rollen maar toch voor iedereen beschikbaar is, Forceer browsen naar de geveerifieerdde pagina's als niet-geverifeerde gebruiker of naar bevoorrechte pagina's gaan als standaargebruiker (klant/bezoeker), Toegangscontroles omzeilen door URL of HTML-pagina te wijzigen. **(Web App)**  | De webpagina's correct gaan toekennen aan de klanten, beheerders en bezoekers door middel van authenticatie en autorisatie  |
| Cryptographic Failures  | Codering die niet afgedwongen wordt bijvoorbeeld HTTP-headers die ontbreken **(Web App, Web API)** | Gevoelige gegevens encrypteren, onnodige data niet opslaan en gebruikmaken van HTTPS, HTTP-headers toevoegen, Caching uitschakelen  |
| Injection  | Een aanvaller die gegevens naar de webtoepassing zendt met bedoeling deze iets te laten doen waarvoor de toepassing niet is ontworpen, Cross-site scripting **(Wep App)**  | Gegevens gescheiden houden van command's en query's, gebruikmaken van de headers (Content-Type en X-Content-Type-Options) om zeker te zijn dat de browser de response interpreteert zoals jij dat wilt  |
| Insecure Design  | Onveilig architectuur ontwerp uitgewerkt **(Web App)** | Use cases en threat model beter uitschrijven, de correcte design patterns gebruiken  |
| Security Misconfiguration  | Slechte configuratie van de webtoepassing **(Wep App)** | Onnodige componenten (frameworks, poorten, functionaliteiten) weglaten  |
| Vulnerable and Outdated Components  | Outdated en unsupported functies of frameworks gebruiken **(Web App)** | Onnodige functies of frameworks verwijderen of niet installeren, SCA tools gebruiken  |
| Identification and Authentication Failures  | Ineffectief identificeren en authoriseren, Brute forces, Ontbrekende of ineffectieve multi-factor authenticatie **(Web App)** | AUTH0 voorzien, Vermijden van zwakke credentials te gebruiken, 2FA, web api beveiligen door middel JWT authentication, CAPTCHA voorzien via AUTH0  |
| Software and Data Integrity Failures  | Gebruiken van niet gevalideerde libararies/plugins **(Wep App)**  | Gebruikmaken van libraries/plugins die erkend zijn op bepaalde websites (NPM)  |
| Security Logging and Monitoring Failures  | Onvoldoende logging, detectie en monitoring **(Web App)**  | De belangrijke activiteiten lokaal bijhouden in logs |
| Server-Side Request Forgery  | Niet valideren van externe bronnen **(Google Firebase Hosting)** | HTTP omleiding uitschakelen, dwing "deny by default" policies en alles behalve essentieel verkeer blokkeren |

## STRIDE:
| Threat  | Beschrijving van de bedreigingen + **(locatie van bedreiging)** | Oplossing |
| ------------- | ------------- | ------------- |
| Spoofing  | Een persoon of een programma die zich voor doet als iemand anders **(Web App)** | Authentication |
| Tampering  | Data aangepast is zonder dat men dit weet (geen data integrity) **(Web App, Web API)** | Encryptie van data in transit |
| Repudiation  | Zeggen dat je een bepaalde actie niet hebt uitgevoerd kan waar of niet waar zijn **(Web App)** | Wanneer een betaling wordt uitgevoerd een email voorzien van de aankoop of een PDF met daarin de aankoop factuur van de tickets |
| Information disclosure  | Blootleggen van informatie aan iemand die niet geauthoriseerd is **(Web App)** | Rollen toekennen (Klant, Beheerder en Bezoeker) |
| Denial of service  | Is een situatie waarin het systeem onbedoeld niet beschikbaar is om een taak uit te voeren van een gebruiker **(Web App)** | Google Firebase Hosting |
| Elevation of privilege  | Bepaalde zaken kunnen doen zonder authorisatie bijvoorbeeld een klant tot beheerder maken terwijl die klant dat totaal niet mag hebben **(Web App)** | Rollen toekennen (Klant, Beheerder en Bezoeker) |

## Andere threads:
- **Insiders:** Probleem: Een huidige werknemer of voormalige werknemer die toegang heeft tot gevoelige data en dit misbruikt. Oplossing: Alle acties die de admins doen gaan loggen. Als een admin stopt met werken in de cinema ervoor zorgen dat zijn account kan worden verwijderd door het hoofdadmin.
- **Bot attack:** Probleem: Gebruik maken van web request voor het manipuleren van de website, API en gebruikers te manipuleren, te bedriegen of verstoren. Oplossing: CAPTCHA in AUTH0 voorzien als men gaat inloggen, monitoren op mislukte inlog pogingen
- **Cyber criminals:** Probleem: Stelen van gevoelige data. Oplossing: SSL certificaat voorzien (Google Firebase Hosting), login pogingen voorzien en sterke wachtwoorden gebruiken.

# Deployment
*Minimally, this section contains a public URL of the app. A description of how your software is deployed is a bonus. Do you do this manually, or did you manage to automate? Have you taken into account the security of your deployment process?*

Onze oplossing bevat 2 applicaties. Enerzijds een React applicatie en anderzijds een Express.js REST API. De applicaties zijn terug te vinden op: 
- De React app is gedeployed via firebase hosting: https://thewolfpackreact.web.app
- De REST API is gedeployed via Nginx: https://www.the-wolf-pack.be/movies

> Demo 1: Het deployment is niet geautomatiseerd voor beide apps. Dit willen we graag automatiseren tegen demo 2. 


# *You may want further sections*
*Especially if the use of your application is not self-evident*
