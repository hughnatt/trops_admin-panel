# TROPS Panneau d'administration

Cette application a été générée grâce à [JHipster 6.7.1](https://www.jhipster.tech/documentation-archive/v6.7.1).
Il s'agit d'une application web écrite en React.

## Développement

_Node.js_ et son gestionnaire de paquets _npm_ doivent être installés.

Pour vérifier si les programmes sont installés, utilisez ces commandes:

    node --version
    npm --version

Après l'installation de Node, il est nécessaire d'installer les dépendances et les outils de développement grâce à la commande suivante:
    
    npm install


Cette commande va lire les dépendances indiquées dans [package.json](package.json).
En cas de changement dans ce fichier, il faudra réexécuter la commande.


Ce projet utilise des scripts npm présents dans [package.json](package.json) et [Webpack][] comme système de compilation.

Les commandes suivantes sont équivalents et exécuteront le script 'start'

    npm start
    npm run start

Cela démarrera l'environnement de développement et ouvrira une fenêtre web. Le système se recompile automatiquement lors d'un changement de fichier source.


## Production
src/main/webapp/app/config/
Pour compiler le projet en mode production, il faut exécuter la commande suivante:

    npm run webpack:prod
    
La commande est assez longue à exécuter.

Un [Dockerfile](Dockerfile) est présent dans le projet.  
Il permet d'effectuer la compilation de l'application web pour un environnement de production et de servir la page web via un serveur [nginx](https://nginx.org).

La commande suivante permet de créer une image Docker nommée trops_admin-panel à partir du dossier courant:

    docker build -t trops-admin-panel .

Le déploiement peut s'effectuer grâce à la commande suivante:
    
    docker create --name trops-admin-panel-1 -p 8080:80 trops_admin-panel

Cette commande aura pour effet de créer un conteneur Docker nommé _trops-admin-panel-1_ qui publie son port interne 80 vers le port 8080 de la machine.    
Pour démarrer le contener, on utilise la commande suivane

    docker start trops-admin-panel-1

Le site est alors accessible sur [localhost:8080]()

Pour stopper le conteneur

    docker stop trops-admin-panel-1



Plus d'infos sur dans notre documentation Docker (lien à venir).



## Nom de domaine

Le nom de domaine utilisé par défaut pour accéeder à l'API est api.trops.space  
Il est possible de le modifier dans le fichier [src/main/webapp/app/config/constants.ts]()