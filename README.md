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

### 5.0.8
- NEW : Search : affichage de la photo en grand
- NEW : nouveau menu avec ...
- NEW : limiter la taille des images à 100px
- NEW : nom des champs plus foncés
- NEW : mode theme dark par écran

### 5.0.7
- NEW : general : finalisé liens avec # pour notice, keyword, person
- NEW : icons notes, predictive, abstract
- NEW : notice abstract : nouvelle présentation, bouton d'envoi de mail.
- NEW notice : pictogrammes pour les description, publication etc
- NEW : Search : Ajouté Message si le champ de recherche est vide
- NEW : Search : version 1 de la recherche predictive

### 5.0.6
- NEW : search : multi criteria search
- NEW : limit le nb de notices linked à 5000.
- FIX : Sub notice : liens foctionnement avec cTRL
- NEW : simple entities : lien vers sous notice n'est pas souligné

### 5.0.5
- NEW : Notice : liens publisher, printer, genre etc + person, keyword, language : onhover red + souligné
- NEW : Présentation de la zone de recherche : supprime liste de choix, ajoute checkbox predictive.
- NEW : Person : affichage photo + note sur une ligne puis les aliases à raison d'un par ligne.
- [A valider]  NEW : notice, person : la photo s'adapte à la taille de l'écran 
- NEW : Search, notice : Touche CTRL pour afficher une nouvelle page dans un nouvel onglet
    [Que faire pour les notices linked ?]
- NEW : Keyword : reprise du format : note puis aliases puis notices linked
- NEW : Search : premier test de la barre de recheche et du formulaire multi critères
- FIX : Simple Entities : Header de la page est invisible

### Requests 05/12 - 5.0.4
- [Abandonné] notice, partie copies : Ajouter un accordéon par bibliothèque 
- [Abandonné] notice : Agrandir la photo, modale grande taille
- [Abandonné] notice : augmenter la police 
- [Abandonné] notice : mettre les noms des champs en plus foncé 
- [Abandonné] notice : Ajouter des traits verticaux entre partie general description et publication, 
- [Fait] Notice ajouter espace avant publication sur mobile, [Fait ajouté ligne de séparation]
- [Abandonné] notice : mettre le titre au niveau de la photo 
- [Fait] notice : afficher les langues à raison de 1 par ligne,
- [Fait] notice : persons, keywords, supprimer les . et , 
- [Fait mais modifié] notice : ce qui est clickable doit etre en bleu [Proposition pour souligné et changement de couleur]
- [Fait] notice : partie note : après chaque nom de note, ajouter un <br> pour rendre la séparation entre notes plus vosibles 
- [Fait] Notices : il reste des espaces entre : et contenu du champ  
- [Abandonné] Notice, une barre de menu peut être ajoutée 
- [Fait] recherche : rendre database invisible 
- [Abandonné] recherche supprimer le trait dans le menu
- [Fait] person : afficher comme dans yeshe : image + nom + note dans une même ligne : Note en face de la photo, aliases en 2 colonnes
-  [Pas possible car en PHP]- Natural search : recherche avec 3 caractères, ou liste d'exceptions 

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
- NEW : imple entity : limite le nombre de résultats affichés.
 
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
## TODO 

- Page Search : 
    - Clic sur la photo affiche une modale avec la photo
    - Search predictive
    - Search multi media

- Page notice : 
    - Clic sur la photo affiche une modale
    - Rendre les multi media accessibles
    - Gérer les liens dans les notes

- Page Person :
   [ A voir]  - Clic sur la photo affiche une modale 
    - Aliases en colonnes

- Page simple entity :
    - Détecter les sous-notices liées et afficher

## TODO tech
- Traduire les tooltips
- notice : publiqher et printer nd
- Valider l'ordre du search
- [abandonné] Comment rendre la recherche plus accessible quand on est dans une notice

## TODO after
- Réécrire les url pour qu'elles soient compatbles avec #/bbb. Voir s'il convient de modifier toutes les URL
- Sécuriser la recherche database en vérifiant les mots clés utilisés
- Supprimer le $tooltip
- Initialisation de l'application (faite à chaque page ou bien ). l'init est exécutée à chaque fois, on teste si l'entité est chargée ou non.
- Tester Bootstrap troncate dans la page de search
- Rendre la photo visible dans Whatssapp lorsqu'on colle le lien d'une notice

## TOTO Bugs
- Affichage de la note dans 'karmapa word' BUg
 

------------------
## Installation
- Copier la totalité du répertoire dans un répertoire du serveur
- Configurer l'accès au web service du back end.

