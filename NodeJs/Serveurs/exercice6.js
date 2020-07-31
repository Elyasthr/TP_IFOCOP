/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.2.1.0
   - Port : 4321
   - Ressource : /ville/paris.html

   Donne l'URL : http://10.2.1.0:4321/ville/paris.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Votre serveur HTTP doit gérer différents Mime Types. Vous devez faire en sorte
  que le Mime Type soit conforme à l'extension obtenue à partir de la ressource
  dans l'URL.

  Par exemple :
  - Si l'URL est http://10.2.1.0:4321/photo.jpeg (et que le fichier photo.jpeg
    existe)
  - Alors l'en-tête de la réponse HTTP doit contenir Content-Type : image/jpeg

  Vous devez gérer les Mime Types des formats de fichier suivant :
    css, js, jpeg, png, pdf, gif.

  La liste des Mime Types autorisés est disponible ici :
    http://www.iana.org/assignments/media-types/media-types.xhtml
**/

var mimeTypes = {
  //jaurai pu pour chaque proriete mettre entre quotes ex: '.html' ce qui m'autrait eviter une concatenation plus tard
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  pdf: 'application/pdf',
  gif: 'image/gif',
  svg: 'image/svg+xml',
  mp3: 'audio/mp3',

}

const path = require('path');
const fs = require('fs');
const http = require('http');
const httpServeur = http.createServer();
var val = '';
httpServeur.on('request',(requeteHTTP,reponseHTTP)=>{

      const monurl = './html/' + requeteHTTP.url;

      //je parcours les propriete de l'objet si elles corresponde au "path.extname(monurl)" alors on 
      //pas besoin d'utiliser d'acces faire direct la consition d'erreur dans le readfile
      Object.keys(mimeTypes).forEach(prop => {
        if(path.extname(monurl) === '.' + prop){
          val = mimeTypes[prop];
        };
      })


      fs.readFile(monurl,(e,data)=>{
            //si le fichier existe pas ou n'est pas lisible
            //on envoie la page 404 not founc
            if(e){
              fs.readFile('./html/404.html',(e,data)=>{

                var reponse = data;

                reponseHTTP.writeHead(404,{
                  'Content-Type': 'text/html',
                  'Content-Length': reponse.length,
                });

                reponseHTTP.write(data,()=>{

                  reponseHTTP.end();

                })
              })
            }
            //sinon il a donc trouver la page et on l'envoie 
            else{
              var reponse = data;

              reponseHTTP.writeHead(200,{
                'Content-Type': val,
                'Content-Length': reponse.length,
              });

              reponseHTTP.write(data,()=>{

                reponseHTTP.end();

              })
            }

      })
})

httpServeur.listen(54545,function(e){
  if(!e){
  console.log('serveur ok');
  }
  });

/**
  2. Utiliser votre serveur HTTP pour "servir" votre projet Front End (sur le
    réseau local).

  Pensez à utiliser l'onglet réseau des outils de développement de votre
  navigateur Internet pour vérifier que vous arrivez bien à télécharger toutes
  les ressources exigées par votre projet.

  Ajoutez la gestion des Mime Types manquants si nécessaire...
**/

//JAI ESSAYER SA FONCTIONNE PARFAITEMENT

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
