const Movie = require("./movie");
const { v4: uuidv4 } = require('uuid');

const movie1 = new Movie({
    titel: 'DRUNK',
    regisseur: 'Thomas Vinterberg',
    hoofdrollen: ['Mads Mikkelsen', 'Thomas Bo Larsen'],
    release_datum: '9 juni 2021',
    land: 'Denemarken',
    duur: '1u57',
    description: 'Vier vrienden, allemaal leraren op dezelfde middelbare school, testen een theorie uit die beweert dat ze hun leven kunnen verbeteren door een constant alcoholpromille in hun bloed te handhaven. Als Churchill op een ontbijt van whisky een wereldoorlog kan winnen...',
    img_url: 'https://tickets.cinemafocus.be/storage/e/3/poster/3674/md.jpg?1634570545',
    trailer_url: 'https://cdn-videos.cinenews.be/Movies/20581/videos/trailers/compresed/987/MP4/video.mp4',
    vertoningen: [
        {
            datum: getLocalDateString(new Date(Date.now())).split(" ").slice(1).join(" "),
            dag: getLocalDateString(new Date(Date.now())).split(" ")[0],
            uur: "20:00",
            zaal: "1",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ")[0],
            uur: "20:00",
            zaal: "1",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ")[0],
            uur: "20:00",
            zaal: "1",
            _id: uuidv4()
        },
    ],
    isReleased: true
});

const movie2 = new Movie({
    titel: 'ETERNALS',
    regisseur: 'Chloé Zhao',
    hoofdrollen: ['Angelina Jolie', 'Salma Hayek', 'Richard Madden'],
    land: 'Verenigde Staten',
    release_datum: '3 november 2021',
    duur: '2u35',
    description: 'Met Eternals verwelkomt Marvel Studios een opwindend nieuw team van superhelden in het Marvel Cinematic Universe. Het epische verhaal, dat duizenden jaren beslaat, gaat over een groep onsterfelijke helden die uit de schaduw worden gedwongen om zich te herenigen tegen de oudste vijand van de mensheid, de Deviants. De uitstekende cast bestaat uit Richard Madden als de almachtige Ikaris, Gemma Chan als de menslievende Sersi, Kumail Nanjiani als de kosmisch aangedreven Kingo, Lauren Ridloff als de supersnelle Makkari, Brian Tyree Henry als de intelligente uitvinder Phastos, Salma Hayek als de wijze en spirituele leider Ajak, Lia McHugh als de eeuwig jonge, oude ziel Sprite, Don Lee als de machtige Gilgamesh, Barry Keoghan als afstandelijke eenling Druig en Angelina Jolie als de woeste krijger Thena. Kit Harington speelt Dane Whitman. Geregisseerd door Chloé Zhao.',
    img_url: 'https://tickets.cinemafocus.be/storage/e/3/poster/3780/md.jpg?1635776217',
    trailer_url: 'https://www.youtube.com/watch?v=vRKeodTrICw',
    vertoningen: [
        {
            datum: getLocalDateString(new Date(Date.now())).split(" ").slice(1).join(" "),
            dag: getLocalDateString(new Date(Date.now())).split(" ")[0],
            uur: "20:00",
            zaal: "2",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ")[0],
            uur: "20:00",
            zaal: "2",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ")[0],
            uur: "20:00",
            zaal: "2",
            _id: uuidv4()
        },
    ],
    isReleased: true
});

const movie3 = new Movie({
    titel: 'NO TIME TO DIE',
    regisseur: 'Cary Joji Fukunage',
    hoofdrollen: ['Rami Malek', 'Daniel Craig', 'Léa Seydoux'],
    land: 'Verenigde Staten',
    release_datum: '30 september 2021',
    duur: '2u43',
    description: 'Bond heeft zijn actieve dienst achter zich gelaten en geniet van een rustig leven in Jamaica. Zijn rust is echter van korte duur wanneer zijn oude vriend Felix Leiter van de CIA om hulp komt vragen. De missie om een ontvoerde wetenschapper te redden blijkt veel lastiger te zijn dan verwacht en leidt Bond tot een mysterieuze schurk, gewapend met gevaarlijke nieuwe technologie.',
    img_url: 'https://tickets.cinemafocus.be/storage/e/3/poster/3494/md.jpg?1632750772',
    trailer_url: 'https://cdn-videos.cinenews.be/Movies/19523/videos/trailers/compresed/1329/MP4/video.mp4',
    vertoningen: [
        {
            datum: getLocalDateString(new Date(Date.now())).split(" ").slice(1).join(" "),
            dag: getLocalDateString(new Date(Date.now())).split(" ")[0],
            uur: "17:00",
            zaal: "2",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ")[0],
            uur: "17:00",
            zaal: "2",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ")[0],
            uur: "17:00",
            zaal: "2",
            _id: uuidv4()    
        },
    ],
    isReleased: true
});

const movie4 = new Movie({
    titel: 'RED SANDRA',
    regisseur: 'Jan Verheyen & Lien Willaert',
    hoofdrollen: ['Sven De Ridder', 'Sara De Roo', 'Darya Gantura','Rosalie Charles', 'Elke Van Mello'],
    land: 'België',
    release_datum: '27 oktober 2021',
    duur: '1u40',
    description: '"Red Sandra" vertelt het waargebeurde verhaal van de familie Massart, een verhaal dat 10 jaar geleden de media en de publieke opinie in België en ver daarbuiten beroerde. William en Olga krijgen onverwacht de diagnose dat hun enige dochtertje Sandra (6) lijdt aan MLD, een zeldzame spierziekte. Ze heeft nog ongeveer een jaar te leven. De wereld van het gezin stort in elkaar. De vader weigert de hoop op te geven en gooit zich in een verbeten strijd tegen de farma-industrie',
    img_url: 'https://tickets.cinemafocus.be/storage/e/3/poster/3613/md.jpg?1634213382',
    trailer_url: 'https://cdn-videos.cinenews.be/Movies/20415/videos/trailers/compresed/965/MP4/video.mp4',
    vertoningen: [
        {
            datum: getLocalDateString(new Date(Date.now())).split(" ").slice(1).join(" "),
            dag: getLocalDateString(new Date(Date.now())).split(" ")[0],
            uur: "17:00",
            zaal: "1",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ")[0],
            uur: "17:00",
            zaal: "1",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ")[0],
            uur: "17:00",
            zaal: "1",
            _id: uuidv4()
        },
    ],
    isReleased: true
});

const movie5 = new Movie({
    titel: 'VENOM: LET THERE BE CARNAGE',
    regisseur: 'Andy Serkis',
    hoofdrollen: ['Andy Serkis', 'Tom Hardy', 'Michelle Williams','Stephen Graham'],
    land: 'Verenigde Staten',
    release_datum: '13 oktober 2021',
    duur: '1u30',
    description: "Tom Hardy keert terug naar het groot scherm als dodelijke beschermer Venom, één van MARVEL's belangrijkste en meest complexe personages.",
    img_url: 'https://tickets.cinemafocus.be/storage/e/3/poster/3541/md.jpg?1633348646',
    trailer_url: 'https://cdn-videos.cinenews.be/Movies/19688/videos/trailers/compresed/1122/MP4/video.mp4',
    vertoningen: [
        {
            datum: getLocalDateString(new Date(Date.now())).split(" ").slice(1).join(" "),
            dag: getLocalDateString(new Date(Date.now())).split(" ")[0],
            uur: "20:00",
            zaal: "3",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 1)).split(" ")[0],
            uur: "20:00",
            zaal: "3",
            _id: uuidv4()
        },
        {
            datum: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ").slice(1).join(" "),
            dag: getLocalDateString(addDays(new Date(Date.now()), 2)).split(" ")[0],
            uur: "20:00",
            zaal: "3",
            _id: uuidv4()
        },
    ],
    isReleased: true
});

const movie6 = new Movie({
    titel: 'WEST SIDE STORY',
    regisseur: 'Steven Spielberg',
    hoofdrollen: ['Ansel Elgort','Rachel Zegler' ,'Ariana DeBose'],
    duur: "/",
    release_datum: "8 december 2021",
    description: "Nog geen samenvatting gekend.",
    isReleased: false,
    img_url: "https://kinepolis.be/nl/sites/kinepolis.be.nl/files/styles/kinepolis_filter_movie_poster/public/posters/WestSideStory_OV_poster_final.jpg",
    trailer_url: "https://www.youtube.com/watch?v=A5GJLwWiYSg",
});

const movie7 = new Movie({
    titel: 'SPIDER-MAN: NO WAY HOME',
    regisseur: 'Jon Watts',
    release_datum: '15 december 2021',
    duur: "/",
    hoofdrollen: ['Tom Holland', 'Benedict Cumberbatch', 'Jamie Foxx', 'Angourie Rice', 'Zendaya'],
    isReleased : false,
    description: "Nog geen samenvatting gekend.",
    img_url: 'https://kinepolis.be/nl/sites/kinepolis.be.nl/files/styles/kinepolis_filter_movie_poster/public/posters/spiderman.jpg',
    trailer_url: 'https://www.youtube.com/embed/041ONYrWQpA'
});

const movie8 = new Movie({
    titel: "THE KING'S MAN: THE BEGINNING",
    regisseur: 'Matthew Vaugh',
    release_datum: '8 december 2021',
    hoofdrollen: ['Ralph Fiennes'],
    isReleased : false,
    duur: "/",
    description: "Een verzameling van 's werelds ergste tirannen en criminele meesterbreinen verzamelt zich om een oorlog uit te zetten die miljoenen zal vernietigen. De hoop is gevestigd op één man die tegen de tijd zal moeten racen om ze te stoppen. Het leidt tot de origine van de eerste onafhankelijke inlichtingendienst, 'The King's Man'",
    img_url: 'https://kinepolis.be/nl/sites/kinepolis.be.nl/files/styles/kinepolis_filter_movie_poster/public/posters/THE_KING_S_MAN_-_POSTER_NL.jpg?itok=h15F5rhJ',
    trailer_url: 'https://www.youtube.com/embed/xYPDS5k_kTI'
});

const movie9 = new Movie({
    titel: "THE MATRIX RESSURECTIONS",
    regisseur: 'Lana Wachowski',
    release_datum: '22 december 2021',
    hoofdrollen: ["Keanu Reeves", "Jada Pinkett Smith", "Carrie-Anne Moss"],
    isReleased : false,
    duur: "/",
    description: "“The Matrix Resurrections”, van grensverleggend filmmaker Lana Wachowski, is de langverwachte vierde film in een franchise die het scifi-genre voorgoed heeft veranderd. In deze nieuwe film keren Keanu Reeves en Carrie-Anne Moss terug als hun beroemde personages Neo en Trinity.",
    img_url: 'https://kinepolis.be/nl/sites/kinepolis.be.nl/files/styles/kinepolis_filter_movie_poster/public/posters/Matrix4_FL.jpg',
    trailer_url: 'https://www.youtube.com/watch?v=9ix7TUGVYIo'
});

const movie10 = new Movie({
    titel: "DEATH ON THE NILE",
    regisseur: 'Kenneth Branagh',
    release_datum: '02 februari 2022',
    hoofdrollen: ["Armie Hammer", "Kenneth Branagh", "Annette Bening", "Gal Gadot"],
    isReleased : false,
    duur: "/",
    description: "Hercule Poirot’s Egyptische avontuur begint op een glamoreuze cruiseboot op de Nijl. De luxe trip verandert echter al snel in een angstaanjagende jacht op een moordenaar als een huwelijksreis wordt opgeschrikt door agressieve moorden. Het is het sinistere verhaal van obsessieve liefde en de moordende consequenties hiervan en speelt zich af in een episch landschap van woestijn en Koninklijke pyramides van Egypte. De film volgt een groep voortreffelijk gekleedde reizigers met genoeg schokkende wendingen die het publiek zullen verrassen tot aan de laatste ontknoping.",
    img_url: 'https://kinepolis.be/nl/sites/kinepolis.be.nl/files/styles/kinepolis_filter_movie_poster/public/posters/DEATH_ON_THE_NILE_-_POSTER_NL.jpg?itok=24O5eqnZ',
    trailer_url: 'https://www.youtube.com/watch?v=JM1U-Whb-P0'
});

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function getLocalDateString(date) {
    return date.toLocaleDateString("nl-BE", {
        day: "numeric",
        month: "long",
        year: "numeric",
        weekday: 'long'
    });
}

const movies = [movie1, movie2, movie3, movie4, movie5, movie6, movie7, movie8, movie9, movie10];

module.exports.movies = movies;
