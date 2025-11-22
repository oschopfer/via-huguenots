/**
 * Via Huguenots - Carte Interactive
 * Script pour afficher une carte interactive avec marqueurs cliquables
 */

(function() {
    // Configuration des couleurs par type
    const typeColors = {
        'stage': '#ff6b6b',
        'alternative': '#FF9800',
        'urban': '#2196F3',
        'special': '#9C27B0',
        'regional': '#4CAF50'
    };

    // Données des étapes (embarquées pour éviter les problèmes de sécurité et CORS)
    const stages = [
        {
                "id": "1",
                "name_short": "chancygeneveplain",
                "latitude": 46.130329087376595,
                "longitude": 5.964801048627123,
                "x": 48,
                "y": 689,
                "distance": "27.5 km",
                "name_full_fr": "Chancy - Genève Plainpalais",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/1-1-chancy-frontiere-fr-ch-plainpalais-geneve",
                "name_full_de": "Chancy - Genf Plainpalais",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/1-1-chancy-frontiere-fr-ch-plainpalais-geneve-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "01bis",
                "name_short": "01_bis",
                "latitude": 46.198167,
                "longitude": 6.143019,
                "x": 93,
                "y": 690,
                "distance": "8.8 km",
                "name_full_fr": "Charrot - Genève Plainpalais",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/1-2-charrot-plainpalais",
                "offset_distance": 0,
                "offset_angle": 0,
                "name_full_de": "Charrot - Genf Plainpalais",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/1-2-charrot-plainpalais-2",
                "type": "alternative"
        },
        {
                "id": "2",
                "name_short": "geneveplainpalaisversoix",
                "latitude": 46.198167082388,
                "longitude": 6.14301904733293,
                "x": 99,
                "y": 658,
                "distance": "12.8 km",
                "name_full_fr": "Genève Plainpalais - Versoix",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/1-3-plainpalais-geneve-versoix",
                "name_full_de": "Genf Plainpalais - Versoix",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/1-3-plainpalais-geneve-versoix-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "02bis",
                "name_short": "02_bis",
                "latitude": 46.198167,
                "longitude": 6.143019,
                "x": 101,
                "y": 659,
                "distance": "",
                "name_full_fr": "Parcours urbain de Genève",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/02bis-parcours-urbain-de-geneve",
                "offset_distance": 80,
                "offset_angle": 20,
                "name_full_de": "Stadtrundgang Genf",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/02bis-stadtrundgang-genf",
                "type": "urban"
        },
        {
                "id": "3",
                "name_short": "versoixnyon",
                "latitude": 46.27983708400279,
                "longitude": 6.165978052187711,
                "x": 104,
                "y": 627,
                "distance": "24.8 km",
                "name_full_fr": "Versoix - Nyon",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/03-versoix-nyon",
                "name_full_de": "Versoix - Nyon",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/1-4-versoix-nyon",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "4",
                "name_short": "nyonrolle",
                "latitude": 46.38448147615418,
                "longitude": 6.236416768282652,
                "x": 124,
                "y": 581,
                "distance": "20.8 km",
                "name_full_fr": "Nyon - Rolle",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/04-nyon-rolle",
                "name_full_de": "Nyon - Rolle",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/1-6-prangins-rolle-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "5",
                "name_short": "rollemorges",
                "latitude": 46.46280612726696,
                "longitude": 6.336842412594706,
                "x": 146,
                "y": 549,
                "distance": "24.3 km",
                "name_full_fr": "Rolle - Morges",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/1-7-rolle-morges",
                "name_full_de": "Rolle - Morges",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/1-7-rolle-morges-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "05bis",
                "name_short": "05_bis",
                "latitude": 46.510859,
                "longitude": 6.493545,
                "x": 205,
                "y": 523,
                "distance": "97.3 km",
                "name_full_fr": "Morges - Morat",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/2-4-1-morges-morat",
                "offset_distance": 80,
                "offset_angle": 90,
                "name_full_de": "Morges - Murten",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/2-4-1-morges-morat-2",
                "type": "alternative"
        },
        {
                "id": "05bis2",
                "name_short": "05_bis2",
                "latitude": 46.52,
                "longitude": 6.63,
                "x": 245,
                "y": 520,
                "distance": "",
                "name_full_fr": "Parcours urbain de Lausanne",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/5bis2-parcours-urbain-de-lausanne",
                "offset_distance": 0,
                "offset_angle": 30,
                "name_full_de": "Stadtrundgang Lausanne",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/5bis2-stadtrundgang-lausanne",
                "type": "urban"
        },
        {
                "id": "6",
                "name_short": "morgescossonay",
                "latitude": 46.51085947663523,
                "longitude": 6.4935456761159,
                "x": 198,
                "y": 530,
                "distance": "19.9 km",
                "name_full_fr": "Morges - Cossonay",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/06-morges-cossonay",
                "name_full_de": "Morges - Cossonay",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/06-morges-cossonay-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "7",
                "name_short": "cossonayromainmotier",
                "latitude": 46.60604091058485,
                "longitude": 6.5234835057053715,
                "x": 198,
                "y": 485,
                "distance": "22 km",
                "name_full_fr": "Cossonay - Romainmôtier",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/07-cossonay-romainmotier",
                "name_full_de": "Cossonay - Romainmôtier",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/07-cossonay-romainmotier-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "8",
                "name_short": "romainmotierorbe",
                "latitude": 46.6936423562001,
                "longitude": 6.46070183231495,
                "x": 186,
                "y": 439,
                "distance": "14 km",
                "name_full_fr": "Romainmôtier - Orbe",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/08-romainmotier-orbe",
                "name_full_de": "Romainmôtier - Orbe",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/08-romainmotier-orbe-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "9",
                "name_short": "orbeyverdonlesbains",
                "latitude": 46.724213707028,
                "longitude": 6.53052550414577,
                "x": 204,
                "y": 437,
                "distance": "20.5 km",
                "name_full_fr": "Orbe - Yverdon-les-Bains",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/09-orbe-yverdon",
                "name_full_de": "Orbe - Yverdon-les-Bains",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/2-3-montpreveyres-granges-marnand-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "10",
                "name_short": "yverdonlesbainsstaubin",
                "latitude": 46.781529447995126,
                "longitude": 6.640936984913424,
                "x": 236,
                "y": 416,
                "distance": "20.9 km",
                "name_full_fr": "Yverdon-les-Bains - St-Aubin",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/10-yverdon-st-aubin",
                "name_full_de": "Yverdon-les-Bains - St-Aubin",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/10-yverdon-st-aubin-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "11",
                "name_short": "staubinneuchatel",
                "latitude": 46.89846186363138,
                "longitude": 6.78128302260302,
                "x": 277,
                "y": 371,
                "distance": "20.5 km",
                "name_full_fr": "St-Aubin - Neuchâtel",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/11-st-aubin-neuchatel",
                "name_full_de": "St-Aubin - Neuchâtel",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/11-st-aubin-neuchatel-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "12",
                "name_short": "neuchatelins",
                "latitude": 46.9963774788193,
                "longitude": 6.93593274313025,
                "x": 323,
                "y": 330,
                "distance": "18.2 km",
                "name_full_fr": "Neuchâtel - Ins",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/12-neuchatel-ins",
                "name_full_de": "Neuchâtel - Ins",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/12-neuchatel-ins-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "12bis",
                "name_short": "12_bis",
                "latitude": 46.996377,
                "longitude": 6.935932,
                "x": 323,
                "y": 330,
                "distance": "50.8 km",
                "name_full_fr": "Neuchâtel - Büren an der Aare",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/12bis-neuchatel-bueren",
                "offset_distance": 50,
                "offset_angle": 260,
                "name_full_de": "Neuchâtel - Büren an der Aare",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/12bis-neuchatel-bueren-de",
                "type": "alternative"
        },
        {
                "id": "13",
                "name_short": "insgummenen",
                "latitude": 46.999972310848534,
                "longitude": 7.099797618109733,
                "x": 367,
                "y": 327,
                "distance": "25.6 km",
                "name_full_fr": "Ins - Gümmenen",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/13-ins-guemmenen",
                "name_full_de": "Ins - Gümmenen",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/13-ins-guemmenen-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "14",
                "name_short": "gummenenbern",
                "latitude": 46.94183011353016,
                "longitude": 7.234582080272958,
                "x": 407,
                "y": 351,
                "distance": "21.3 km",
                "name_full_fr": "Gümmenen - Berne",
                "url_fr": "https://www.via-huguenots.ch/fr/berne",
                "name_full_de": "Gümmenen - Bern",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/14-guemmenen-berne-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "15",
                "name_short": "bernaarberg",
                "latitude": 46.9484011190943,
                "longitude": 7.44022609083913,
                "x": 468,
                "y": 345,
                "distance": "23.5 km",
                "name_full_fr": "Berne - Aarberg",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/15-berne-aarberg",
                "name_full_de": "Bern - Aarberg",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/15-bern-aarberg",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "15bis",
                "name_short": "15_bis",
                "latitude": 46.948401,
                "longitude": 7.440226,
                "x": 468,
                "y": 345,
                "distance": "",
                "name_full_fr": "Parcours urbain de Berne",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/parcours-urbain-de-berne",
                "offset_distance": 40,
                "offset_angle": 330,
                "name_full_de": "Stadtrundgang Bern",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/stadtrundgang-bern",
                "type": "urban"
        },
        {
                "id": "16",
                "name_short": "aarbergburenanderaare",
                "latitude": 47.044628420844674,
                "longitude": 7.278465348994359,
                "x": 420,
                "y": 309,
                "distance": "23.3 km",
                "name_full_fr": "Aarberg - Büren an der Aare",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/16-aarberg-bueren",
                "name_full_de": "Aarberg - Büren an der Aare",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/16-aarberg-bueren-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "16bis",
                "name_short": "16_bis",
                "latitude": 47.138171,
                "longitude": 7.371254,
                "x": 411,
                "y": 328,
                "distance": "",
                "name_full_fr": "Visioguide «Naufrage 05.09.1687»",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/visioguide-naufrage-05-09-1689",
                "offset_distance": 50,
                "offset_angle": 310,
                "name_full_de": "Visioguide «Naufrage 05.09.1687»",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/visioguide-naufrage-05-09-1687",
                "type": "special"
        },
        {
                "id": "17",
                "name_short": "burenanderaaresolothurn",
                "latitude": 47.13817131659016,
                "longitude": 7.371254333062097,
                "x": 447,
                "y": 268,
                "distance": "20.4 km",
                "name_full_fr": "Büren an der Aare - Solothurn",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/17-bueren-soleure",
                "name_full_de": "Büren an der Aare - Solothurn",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/17-bueren-solothurn",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "18",
                "name_short": "solothurnaarwangen",
                "latitude": 47.204430018085986,
                "longitude": 7.543229311704636,
                "x": 494,
                "y": 241,
                "distance": "22.3 km",
                "name_full_fr": "Solothurn - Aarwagen",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/18-soleure-aarwangen",
                "name_full_de": "Solothurn - Aarwangen",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/18-solothurn-aarwangen",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "19",
                "name_short": "aarwangenzofingen",
                "latitude": 47.245241205440834,
                "longitude": 7.763669362990186,
                "x": 564,
                "y": 224,
                "distance": "21.5 km",
                "name_full_fr": "Aarwangen - Zofingen",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/2-12-aarwangen-zofingen",
                "name_full_de": "Aarwangen - Zofingen",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/2-12-aarwangen-zofingen-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "20",
                "name_short": "zofingenaarau",
                "latitude": 47.28842258476652,
                "longitude": 7.94363055517897,
                "x": 607,
                "y": 206,
                "distance": "18.5 km",
                "name_full_fr": "Zofingen - Aarau",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/2-13-zofingen-aarau",
                "name_full_de": "Zofingen - Aarau",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/2-13-zofingen-aarau-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "21",
                "name_short": "aaraulenzburg",
                "latitude": 47.39093809016049,
                "longitude": 8.052318064961582,
                "x": 642,
                "y": 166,
                "distance": "18.5 km",
                "name_full_fr": "Aarau - Lenzburg",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/2-14-aarau-lenzburg-musee-burghalde-itineraire-balise",
                "name_full_de": "Aarau - Lenzburg",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/2-14-aarau-lenzburg-musee-burghalde-itineraire-balise-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "22",
                "name_short": "lenzburgbrugg",
                "latitude": 47.39094884414226,
                "longitude": 8.17031545797363,
                "x": 678,
                "y": 166,
                "distance": "17.2 km",
                "name_full_fr": "Lenzburg - Brugg",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/22-lenzburg-brugg",
                "name_full_de": "Lenzburg - Brugg",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/22-lenzburg-brugg-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "23",
                "name_short": "bruggbaden",
                "latitude": 47.48141000443138,
                "longitude": 8.210604961961508,
                "x": 686,
                "y": 127,
                "distance": "12.5 km",
                "name_full_fr": "Brugg - Baden",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/23-brugg-baden",
                "name_full_de": "Brugg - Baden",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/23-brugg-baden-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "24",
                "name_short": "badenzurich",
                "latitude": 47.476408092770725,
                "longitude": 8.307862079702318,
                "x": 718,
                "y": 131,
                "distance": "26.8 km",
                "name_full_fr": "Baden - Zurich",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/24-baden-zurich",
                "name_full_de": "Baden - Zürich",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/24-baden-zurich-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "25",
                "name_short": "zurichkloten",
                "latitude": 47.37874109833501,
                "longitude": 8.541485073976219,
                "x": 784,
                "y": 169,
                "distance": "15.3 km",
                "name_full_fr": "Zurich - Kloten",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/25-zurich-kloten",
                "name_full_de": "Zürich - Kloten",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/25-zurich-kloten-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "25bis",
                "name_short": "25_bis",
                "latitude": 47.476408,
                "longitude": 8.307862,
                "x": 784,
                "y": 169,
                "distance": "",
                "name_full_fr": "Parcours urbain de Zurich",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/24bis-stadtrundgang-zuerich-2",
                "offset_distance": 50,
                "offset_angle": 270,
                "name_full_de": "Stadtrundgang Zürich",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/24bis-stadtrundgang-zuerich",
                "type": "urban"
        },
        {
                "id": "26",
                "name_short": "kloteneglisau",
                "latitude": 47.44859810988419,
                "longitude": 8.583565081469715,
                "x": 796,
                "y": 138,
                "distance": "20.9 km",
                "name_full_fr": "Kloten - Eglisau",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/26-kloten-eglisau",
                "name_full_de": "Kloten - Eglisau",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/26-kloten-eglisau-de",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "27",
                "name_short": "eglisauschaffhausen",
                "latitude": 47.5728960915003,
                "longitude": 8.51609708135948,
                "x": 777,
                "y": 84,
                "distance": "29.8 km",
                "name_full_fr": "Eglisau - Schaffhouse",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/27-eglisau-schaffhouse",
                "name_full_de": "Eglisau - Schaffhausen",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/27-eglisau-schaffhausen",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "28",
                "name_short": "schaffhausenbarzheim",
                "latitude": 47.69760310323909,
                "longitude": 8.63250808417797,
                "x": 809,
                "y": 32,
                "distance": "16.0 km",
                "name_full_fr": "Schaffhausen - Barzheim",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/28-schaffhouse-barzheim",
                "name_full_de": "Schaffhausen - Barzheim",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/28-schaffhausen-barzheim",
                "offset_distance": 0,
                "offset_angle": 0,
                "type": "stage"
        },
        {
                "id": "28bis",
                "name_short": "28_bis",
                "latitude": 47.697603,
                "longitude": 8.632508,
                "x": 809,
                "y": 32,
                "distance": "",
                "name_full_fr": "Parcours urbain de Schaffhouse",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/28bis-stadtrundgang-schaffhausen-2",
                "offset_distance": 50,
                "offset_angle": 330,
                "name_full_de": "Stadtrundgang Schaffhausen",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/28bis-stadtrundgang-schaffhausen",
                "type": "urban"
        },
        {
                "id": "regional",
                "name_short": "regional",
                "latitude": 47.558395,
                "longitude": 7.573271,
                "x": 525,
                "y": 75,
                "distance": "",
                "name_full_fr": "Routes régionales",
                "url_fr": "https://www.via-huguenots.ch/fr/le-chemin/en-suisse/itineraires-suissemobile/regionale-routen-2",
                "offset_distance": 0,
                "offset_angle": 0,
                "name_full_de": "Regionale Routen",
                "url_de": "https://www.via-huguenots.ch/de/der-weg/in-der-schweiz/schweizmobil-strecken/regionale-routen",
                "type": "regional"
        }
];

    // Initialiser la carte directement avec les données embarquées
    initMap(stages);

    function initMap(stages) {
        const svg = document.getElementById('viaMapSvg');
        const tooltip = document.getElementById('viaTooltip');

        if (!svg || !tooltip) return;

        // Calculer la position d'affichage du marqueur (avec offset si nécessaire)
        function calculateMarkerPosition(stage) {
            if (!stage.offset_distance || stage.offset_distance === 0) {
                return { x: stage.x, y: stage.y };
            }
            const angleRad = (stage.offset_angle || 0) * Math.PI / 180;
            const offsetX = stage.offset_distance * Math.cos(angleRad);
            const offsetY = -stage.offset_distance * Math.sin(angleRad);
            return {
                x: stage.x + offsetX,
                y: stage.y + offsetY
            };
        }

        // Créer les lignes de connexion pour les marqueurs avec offset
        stages.forEach((stage) => {
            if (stage.offset_distance && stage.offset_distance > 0) {
                const markerPos = calculateMarkerPosition(stage);
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.classList.add('via-connection-line');
                line.setAttribute('x1', stage.x);
                line.setAttribute('y1', stage.y);
                line.setAttribute('x2', markerPos.x);
                line.setAttribute('y2', markerPos.y);
                line.setAttribute('stroke', typeColors[stage.type] || '#999');
                svg.appendChild(line);
            }
        });

        // Créer les marqueurs
        stages.forEach((stage) => {
            const markerPos = calculateMarkerPosition(stage);
            const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
            group.classList.add('via-stage-marker', stage.type);
            group.setAttribute('data-stage-id', stage.id);

            // Créer un rectangle pour les routes régionales, un cercle pour les autres
            if (stage.type === 'regional') {
                const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('x', markerPos.x - 25);
                rect.setAttribute('y', markerPos.y - 10);
                rect.setAttribute('width', '50');
                rect.setAttribute('height', '20');
                rect.setAttribute('rx', '3');
                group.appendChild(rect);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', markerPos.x);
                text.setAttribute('y', markerPos.y);
                text.textContent = 'REG';
                group.appendChild(text);
            } else {
                const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                circle.setAttribute('cx', markerPos.x);
                circle.setAttribute('cy', markerPos.y);
                circle.setAttribute('r', '10');
                group.appendChild(circle);

                const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
                text.setAttribute('x', markerPos.x);
                text.setAttribute('y', markerPos.y);
                text.textContent = stage.id;
                group.appendChild(text);
            }

            svg.appendChild(group);

            // Événements
            group.addEventListener('click', function() {
                window.location.href = stage.url_fr;
            });

            group.addEventListener('mouseenter', function(e) {
                const nameSpan = tooltip.querySelector('.stage-name');
                nameSpan.textContent = stage.name_full_fr;
                nameSpan.className = 'stage-name ' + stage.type;
                tooltip.querySelector('.stage-distance').textContent = stage.distance || '';
                tooltip.classList.add('show');
                updateTooltipPosition(e);
            });

            group.addEventListener('mousemove', updateTooltipPosition);

            group.addEventListener('mouseleave', function() {
                tooltip.classList.remove('show');
            });
        });

        function updateTooltipPosition(e) {
            const x = e.clientX;
            const y = e.clientY;
            tooltip.style.left = (x + 10) + 'px';
            tooltip.style.top = (y - 5) + 'px';
        }
    }
})();
