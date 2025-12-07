# Yeshe V5
--------------
## Documentation
### Database search
     - <b>bdd:xxx  </b> : select all entities (notices, keywords etc) whose name contains the string xxx
    - <b>titl:xxx </b> : select all notices whose title contains the string xxx
    - <b>pers:xxx  </b> : select all persons whose name contains the string  xxx
    - <b>keyw:xxx  </b> : select all keywords whose name contains the string  xxx
    - <b>publ:xxx  </b> : select all publishers whose name contains the string  xxx
    - <b>prin:xxx  </b> : select all printers whose name contains the string  xxx
    - <b>cote:xxx  </b> : select all printers whose cote contains the string  xxx
    - <b>stit:xxx  </b> : select all the sub-notices whose main title contains the string  xxx
    - <b>them:xxx  </b> : select all the themes whose name contains the string  xxx
    - <b>genr:xxx  </b> : select all the genres whose name contains the string  xxx
    - <b>lang:xxx  </b> : select all the languages whose name contains the string  xxx
    - <b>matt:xxx  </b> : select all the material types whose name contains the string  xxx
    - <b>doct:xxx  </b> : select all the document types whose name contains the string  xxx
    - <b>coll:xxx  </b> : select all the collections whose name contains the string  xxx
    - <b>lastbr: </b> : select all the database entities that have been modified the last 4 weeks
    - <b>miss:  </b> : select all the missing copies
    - <b>outp:  </b> : select all the out of print bibliographic record
    - <b>mult:  </b> : select all notices with at least one multimedia
</ul>

------------
## Releases notes
### Requests 05/12 - 5.0.4
- notice, partie copies : Ajouter un accordéon par bibliothèque
- notice : Agrandir la photo
- notice : augmenter la police
- notice : mettre les noms des champs en plus foncé
- notice : Ajouter des traits verticaux entre partie general description et publication,
- [Fait] Notice ajouter espace avant publication sur mobile, [Fait ajouté ligne de séparation]
- notice : mettre le titre au niveau de la photo
- [Fait] notice : afficher les langues à raison de 1 par ligne,
- [Fait] notice : persons, keywords, supprimer les . et , 
- notice : ce qui est clickable doit etre en bleu 
- [Fait] notice : partie note : après chaque nom de note, ajouter un <br> pour rendre la séparation entre notes plus vosibles 
- Notices : il reste des espaces entre : et contenu du champ  
- Notice, une barre de menu peut être ajoutée 
- [Fait] recherche : rendre database invisible 
- recherche supprimer le trait dans le menu
- person : afficher comme dans yeshe : image + nom + note dans une même ligne

### 5.0.3 
- NEW notice : test des looks des liens vers les autres entités.
- NEW notice : test des pictos,
- NEW : page simpleEntity : printer, publisher, genr, them, mattype, doctype, collection
- NEW : Créer les liens dans la notice vers publ, prin, genr, them, mattype, doctype,
- NEW : keyword, person, simpleEntity : Display nb of notices linked
- NEW : Page subnotice,
- NEW : réutilisation des fichiers de traduction de Yeshe 4
- NEW Search :  Gérer erreur trop de résultats, 
- NEW Search :  Finaliser les emoj et nom de recherche pour les recherches
- FIX : Notice : présentation de la liste des exemplaires

- NEW : première version du routage sur # avec notice. [à valider]
 
### 5.0.2
- NEW : notice : classer les exemplaires par bibliothèque
- NEW : tous : ajouté les emoj dans les titres des pages des notices, keywords, persons
- FIX : tous :  supprimé les points la fin des lignes d'énumération
- FIX : tous : modifié les espacements entre les hr (barre horizontale)
- FIX : notice : supprimé les affichages de null 
- FIX : Tech : suppression de jquery
- NEW : All : Configurer l'accès au backend dans un fichier de config.

### 5.0.1
- FIX : search : rétrécit la zone de recherche, trop large
- NEW : notice : la photo de la notice reste à gauche même sur écran mobile
- NEW : notice : Ajout d'un texte 'publication',
- NEW : notice : les zones person et keyword sont afffichées dans 2 colonnes
- NEW : Ajout des sites amis dans le menu
- NEW : ajout d'une page de documentation projet sous l'item de menu 'About'
### 5.0.0
- NEW : page principale, y compris menu de l'application
- NEW : page Search
- NEW : page de Notice
- NEW : page de Keyword

------------------
## TODO User
- General 
    - Touche CTRL pour afficher une nouvelle page dans un nouvel onglet
    - Comment rendre la recherche plus accessible quand on est dans une notice
 
- Page Search : 
    - Clic sur la photo affiche une modale
- Search predictive
- Search multi media

- Page notice : 
    - Rendre les multi media accessibles
    - Gérer les liens dans les notes

## questions 
- Collections ?
- Style des liens entre entités [test sur notice]
- Routing pour url contenant un #

## TODO tech
- Tester Bootstrap troncate dans la page de search
- Ajoutre routing sur #
- Entités accessibles par url

------------------
## Installation
- Copier la totalité du répertoire dans un répertoire du serveur
- Configurer l'accès au web service du back end.

