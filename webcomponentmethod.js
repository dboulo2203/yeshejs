
// --------------------------------------------------------------------------------------</meta></meta>
// patterns de développement
// -----------------------------------------------------------
{/* Afficher un string html dans le html en cours */ }

document.querySelector("#" + mainDisplay).innerHTML = personScreen;

{/* Ajout la gestion d'un événement click à une element html (<a, button etc) */ }
document.querySelector("#editButton").onclick = function () {
    console.log("extractButton : ");
    personEditModalDisplay(mainDisplay, person, function (status) {
    });
};


{/* Ajout la gestion d'un événement keypress à une element html (<a, button etc) */ }
document.querySelector(" #searchInputString").addEventListener("keypress", function (event) {
    if (event.keyCode === 13) {
        window.location.href = `${currentApplicationPath}/views/search/search.html?searchStr=` +
            $("#searchInputString").val();
    }
});

{/* Ajouter un evenement à une liste délément (par exemple liste de recherche ) */ }

addMultipleEnventListener(".personButtons", function () {
    console.log("click person details");
    window.location.href = `${currentApplicationPath}/views/person/person.html?personID=` + $(this).attr('searid') +
        `&indep=false`; // launchNoticeController(mainDisplay, $(this).attr('searid')); }); 

    /** * * @param {*} elementClass
    * @param {*} functionOfEvent */
    function addMultipleEnventListener(elementClass, functionOfEvent) {
        const
            cbox = document.querySelectorAll(elementClass); for (let i = 0; i < cbox.length; i++) {
                cbox[i].addEventListener("click", functionOfEvent);
            }
    }

    // Call d'un web service
    import {
        wsUrlformel
    } from '../assets/constants.js';
    /** * Load the language list from the database * the languages list is
    saved in the localStorage */
    export async function getLanguages() {
        var wsUrl = getwsUrlformel() + `list/bdd_language`;
        let responseWS = await fetch(wsUrl);
        if (responseWS.ok) { // *** Get the data and save in the localstorage const
            data = await responseWS.json();
            localStorage.setItem("languages", JSON.stringify(data.content));
            return true;
        } else {
            console.log(`getLanguages Error : ${JSON.stringify(responseWS)}`);
            return (false);
        }
    }

    // Note : la fonction appelante se doitde gérer le try catch 
    // try { getLanguages(); .......................... } catch (error) {
    //     document.querySelector("#messageSection").innerHTML = `<div class="alert alert-danger" style="margin-top:30px"
    //     role="alert"> ${error}</div> `;
    // }


    // ## Pour l'affichage du contenu d'une modale, sans altérer le contenu de la div appelante
    let TempDiv = document.createElement('div');
    TempDiv.innerHTML = editModaleString.trim();
    document.querySelector("#" + htlmPartId).appendChild(TempDiv);



    - Structure des répertoires
○ Racine du projet
§ index.html : re route vers le permier businessComponent

        < script >
        window.location.href = `./views/mainpage/mainpage.html`
</script >


○ un répertoire views contenant les businessComponent
○ Un répertoire shared
§ assets
□ fichier constants.js : les constantes de l'application, par exemple :
® url des web services,
® icons partagés par les business components
§ services
§ components
□ global: les xxx.js utilisés par les business components du projet, sous forme de fonctions appelées.
® par exemple: le header de l'application, les menus de l'application

        - Lancement de l'application par l'URL principale
○ index.html : lancement le premier composant de l'application

        < script >
        window.location.href = `./views/mainpage/mainpage.html`
</script >

        - Lancement de l'application par un businessComponent
○ Une application peut contenir un ou plusieurs business component
○ Les businesscomponents pouvent être appellés individuellement
§ Exemple: https://localhost/yeshejs/views/notice/notice.html?noticeID=4271
○ Il est alors possible de passer dans l'URL d'appel du BC, des paramètres(permettant par exemple de sélectionnner un
élément de la base de données.


// - Structure d'un Component (exmple d'un composant BcName)
// ○ caractéristiques
// § Assure son fonctionnement de manière autonome
// □ Son initialisation.il fait appel au service d'initialisation
//     import { launchInitialisation } from './shared/services/initialisationService.js'
//     /*** Initailisations */
//     await launchInitialisation();

// § Donc initialisationService.js contient
// ® une fonction: launchInitialisation() : initalisation de l'application


// ○ Composé au minimum de:
// § bcname.html composé de
// □ squelette HTML
// ® Important: le fichier HTML décrit les zones d'affichage de l'application(menu, messages, mainpart
// □ appel de la fonction de lancement dans le xxxxxxjs

    < html lang = "en-EN" >

        <head>
            <meta charset="utf-8">
                <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
                    <meta http-equiv="Pragma" content="no-cache">
                        <meta http-equiv="max-age" content="2">
                            <meta name="viewport" content="width=device-width, initial-scale=1">
                                <title>Yeshe JS </title>
                                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
                                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
                                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js">
                                    </script>
                                </head>

                                <body>
                                    <div class="container" id="mainPart">
                                        <div class="col-md-12 " id="menuSection" style="margin-top:50px">
                                        </div>
                                        <div class="col-md-12 " id="messageSection" style="margin-top:50px"></div>
                                        <div class="col-md-12 " id="mainActiveSection" style="margin-top:50px">
                                        </div>
                                        <div id="error"></div>
                                    </div>
                                </body>
                                <script type="module">
                                    import {startbcnameController} from './bcnameViewController.js'
                                    startbcnameController();
                                </script>

                            </html>

§ bcnameViewCont.js

                            {/* □ une fonction startbcnameController : lancement des fonctions et de la logique du composant
        § bcnameService.js : les fonctions de service des données (chargement de fichier, appell d'APIs)

        ○ Composé, si nécessaire de :
        § Les viewController de gestion des modales


        Recommandation pour le viewCOntroller

        - La fonction startBcNameController :
        ○ initialise l'application: appel de shared/serices/initialisationService.js : launchInitialisation();
        ○ Charge éventuellement la partie commune de l'appli (header, menus) par appel de :
        shared/components/global/herderViewCont.js : headerViewDisplay()
        ○ Récupère les éventuels paramètres de l'URL
        ○ Appelle la fonction d'affichage du composant : displayBCNameContent()
        ○ Note : ilpeut exister différentes façon de traiter l'affichage ( exemple de person affiché par son ID ou aliasID).
        C'est le role de startBcNameController() de choisir la fonction d'affichage,
        ○

        - La fonction displayPersonContent
        ○ affiche une première chaine contenant les zones nécessaire à l'affichage du BusinessComponent.
        ○ Récupère les données de l'entité à afficher (person, notice, etc)
        ○ Affiche les données
        § en utilisant au maximum les templates
        § par des document.querySelector("#sectionNamme).innerHTML = 'ljl'
        ○ Ajoute les événements gérés par le composant (affichage d'une modale, sélection d'un élément de liste etc) :


        ○ Gère un try catch permettant de gérer les érreurs des webs services


        Recommandations pour les modales

        - Les modales sont en général utilisées pour des fonctions particulières telles que login, création d'élément,
        modification et sauvegarde etc)
        - Une modale est gérée dans un fichier BCNamexxxxxxxxModalViewController.js
        - Une modale est composé :
        ○ D'une chaine de caractère HTML décrivant le contenu de la modale
        ○ D'une fonction princiipale : personEditModalDisplay()
        ○ Affiche le contenu de la modale
        ○ Ajouter les événements géréspar la modale
        ○ Gère les actions générées par les événements (ex : sauvegarde, création etc)
        ○ Gère un try catch pour les appels API.

        ○ Afficher la modale
        let editModal = new bootstrap.Modal(document.querySelector("#myModalDom")) // document.getElementById('myModalDom'));
        editModal.show({backdrop: 'static', keyboard: false });

        Fermer la modale
        editModal.hide();



        • Interactions entre businessComponent
        - A limiter au maximum
        - Préférer des appels d'URL: voir le paragraphe lancement de l'application par le businessComponent.
        - Le composant peut éventuellement gérer des paramètres permettant d'accéder disrectment à des fonctions du composant.
        Par exemple dans Yeshe, création d'une notice, création d'un person.
        En charge du composant de détecter le paramètre et de lancer la partie du compsant en cause.

        • Que faire si nécessité d'un partage de données entre les composants ?


        Les éléments de shared fixes entre les différentes applications
        - elements à configuer
        ○ css/custom.css
        ○ assets
        § locales pour les traductions
        § constants.js
        ○ components
        § les composants globaux à configurer par application (menu, navbar)
        - éléments fixes entre les applications
        ○ components
        ○ functions
        ○ services
        S'assurer que les dépendances vers les fichiers de assets sont respectées.




        Principes
        - Notion de businessComponent
        ○ un businessComponent peut être appelé :
        ○ - seul, par un appel à une URL
        - dans le cadre d'une application (mais toujours par une Url)
        - un component a une version
        - un component affiche clairement ses dépendances
        ### un "customcomponent" par entité
        - entité = noticce, person, keyword, publisher etc
        - rendre chaque écran le plus autonome possible afin de ne pas avoir à re-tester l'ensemble de l'application à
        chaque modification.
        - un écran d'entité peut être appelé par url domainname/screenxxx/id de manière autonome
        - un customcomponent gère son affichage, ses évenements
        - pas de partage de variables communes
        - Une customcomponent peut utiliser des services externes (liste pour liste de choix)
        - Dans un customcomponent, l'utillisation de ressources communes est clairement identifié dans le controller
        principal du customcomponent
        ### Parties communes sont composées de :
        - les variables communes sont dans un fichier clairement identifié.
        - - Nom de la div dans laquelle le customcomponent doit s'installer
        - Les services communs : translation,
        - Les fonctions communes
        ### Enveloppe
        - Les parties communes sont : navbar et menu canvas, le mainpage component
        ### partie commune
        ### Cas des écrans multi customcomponent
        - Exemple Zopa : écran commande affiche une partie facture.
        ### pu logiciel
        - utilisation maximale du jsx like */}