
# Interface utilisateur en JS 

## Description 

Récupérer les données d'une API (fournie) et les afficher par catégories dans une interface navigateur en JS. 


## Démarrage de l'APi 

https://grafikart.fr/tutoriels/carrousel-javascript-87#autopla


1. Ouvrir le dossier de l'API : `$ cd OCMovies-API-EN-FR` 
2. Installer les dépendances du projet : `pipenv install` 
3. Créer et remplir la BDD : `pipenv run python manage.py create_db` 
4. Démarrer le serveur Python : `pipenv run python manage.py runserver` 


## Démarrage de Docker pour l'interface 

1. Ouvrir le dossier du front end : `cd P6_work` 
2. Lancer le fichier compose.yaml : `docker compose up` 


## SASS 

### Lancement en mode live-compilation 

Pour modifier les propriétés CSS via le fichier `styles.scss`, il faut lancer Sass en live-compilation : `sass.bat --watch styles.scss styles.css` 


## Conslutation dans un navigateur 

Visiter l'adresse `http://localhost:80/` ou juste `http://localhost` 



