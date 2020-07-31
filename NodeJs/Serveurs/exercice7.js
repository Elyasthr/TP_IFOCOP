/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 212.121.212.45
   - Port : 8080
   - Ressource : /index.html

   Donne l'URL : http://212.121.212.45:8080/index.html
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez une chaîne de caractères
  facilement reconnaissable. Par exemple :
  - ##dateDuJour##

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier la
  chaîne de caractères par la date du jour.
**/

/**
  2. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de
  caractères facilement reconnaissable. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier les
  deux chaînes de caractères par respectivement votre nom et votre prénom.
**/
var mimeTypes = {

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
              //si beaucoup de remplacement faire une boucle ou on appel replace pour chaque element du tableau..
              reponse = reponse.toString().replace('{{ prenom }}','Elyas');
              reponse = reponse.replace('{{ nom }}','Touahria');
              reponse = Buffer.from(reponse);

              reponseHTTP.writeHead(200,{
                'Content-Type': val,
                'Content-Length': reponse.length,
              });

              reponseHTTP.write(reponse,()=>{

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
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
