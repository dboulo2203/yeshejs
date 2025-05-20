#
- 20-05-2025
    - Passage des fonctions de personSerice en async await, reprise du controler pour fonctionnement avec async/await



# Développement des fonctions de l'application
- Notice : note list to be displayed
- Comment angular fait-il pour gérer des url open data
## TODO
- Finaliser la gestion des résultats de recherche avec les autres types de recherche

- Bug affichage des images sur mobile


## Call fetch
- Voir comment gérer les erreurs dans les fetch.

## Bug 
- TODO Gestion du cache des modules javascripts
- TODO Stopper exécution tant que les initialisations ne sont pas faites

## update d'un enregistrement
- NEW : Fonction opérationnelle
- TODO Réinitailiser les objets à l'initailisation de l'appliication
- TODO ajouter le nom du user de modif et la date 


## Sauvegarde d'un enregistrement
- NEW : Fonction opérationnelle
- TODO Réinitailiser les objets à l'initailisation de l'appliication
- TODO ajouter le nom du user de modif et la date 

## Gestion des traductions
- NEW : Version 1 opérationnelle,
- TODO : ajouter capacité à découvrir les langues en fonction des fichiers présents

## Permaliens et back/forward
- NEW : Fait : Ajouté appel de pages html pour gestion des url et navigation browser 
- TODO : Autre solution à explorer: ajouter un router dde facon à pouvoir gérer les permaliens.

## Conservation des données avec localstorage (state)
- NEW : Save person et disctionnaires: ok
- TODO : Voir la conservation des données entre les pages de navigation, par exemple person
- TODO : Faut-il vider le localstorage
- TODO : mofication personcontroller pour prise en compte du state

## Gestion des utilisateurs
- TODO : controller/view  de login,service de login, sauvegarde de l'utilisateur courant 
- TODO : crypter les mots de passe.


- App.js
    - initalise les données communes
    - lance la première page 
## Structure de l'application
- TODO : gestion des erreurs
- TODO : structure d'un controller, appel de page par URL

# Structure d'une application Javascript frameword DB
- views
    Chaque page de données possède : 
    xxx.html : permet l'appel de l'entité depuis une url unique
    xxx.viewController.js : Controller principal : Gère l'affichage et les interactions principales
    xxx Modale.js : un fichier par modale utilisée par le controller principal

- Services 
    - YYYYYService : un service par objet géré 
        - un service peut ou non posséder un state
        - les states sont sauvés dans le localstorage
        - Le service gère les méthodes de l'objet  

    - commonFunctions : fonctions javascript communes.  

- Locales : fichiers de sauvegarde des traductions

- assets : constantes utilisées par le programme

# Notes
- Améliorer l'API en retrournant coorectement des éléments créés lors d'un POST

## Principes
### un "customcomponent" par entité
- entité = noticce, person, keyword, publisher etc
- rendre chaque écran le plus autonome possible afin de ne pas avoir à re-tester l'ensemble de l'application à chaque modification.
- un écran d'entité peut être appelé par url domainname/screenxxx/id de manière autonome
- un customcomponent gère son affichage, ses évenements
- pas de partage de variables communes
- Une customcomponent peut utiliser des services externes (liste pour liste de choix)
- Dans un customcomponent, l'utillisation de ressources communes est clairement identifié dans le controller principal du customcomponent  
### Parties communes sont composées de : 
- les variables communes sont dans un fichier clairement identifié.
- - Nom de la div dans laquelle le customcomponent doit s'installer
- Les services communs : translation, 
- Les fonctions communes
### Enveloppe
- Les parties communes sont : navbar et menu canvas, le mainpage component

### Cas des écrans multi customcomponent
- Exemple Zopa : écran commande affiche une partie facture. 

    