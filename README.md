
# Interface utilisateur en JS 

## Description 

Get the data from a given API, to display them into the browser with Javascript. The CSS is managed with Sass. 
Developped into a Docker container. 

## Démarrage de l'APi 

1. Ouvrir le dossier de l'API : `$ cd OCMovies-API-EN-FR` 
2. Installer les dépendances du projet : `pipenv install` 
3. Créer et remplir la BDD : `pipenv run python manage.py create_db` 
4. Démarrer le serveur Python : `pipenv run python manage.py runserver` 


## Démarrage de Docker pour l'interface 

1. Ouvrir le dossier du front end 
2. Lancer le fichier compose.yaml : `docker compose up` 


## SASS 

### Lancement en mode live-compilation 

Pour modifier les propriétés CSS via le fichier `styles.scss`, il faut lancer Sass en live-compilation : `sass.bat --watch styles.scss styles.css` 


## Consultation dans un navigateur 

Visiter l'adresse `http://localhost:80/` ou juste `http://localhost` 

