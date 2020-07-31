/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 18.17.19.20
   - Port : 6767
   - Ressource : /bonjour.html
   - Query String : nom=Bruce&prenom=Wayne

  Donne l'URL : http://212.121.212.45:6767/bonjour.html?nom=Bruce&prenom=Wayne
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel vous positionnerez deux autres chaînes de
  caractères facilement reconnaissable. Par exemple :
  - {{ nom }}
  - {{ prenom }}

  Après avoir lu et obtenu le contenu d'un fichier et avant de retourner sa
  réponse HTTP, votre serveur HTTP doit remplacer dans le contenu du fichier les
  deux chaînes de caractères par respectivement le nom et le prénom provenant du
  Query String.

  Pour extraire des données provenant d'un Query String contenu dans un URL,
  vous pouvez utiliser le module URL de Node JS. Ce module est documenté ici :
    https://nodejs.org/api/url.html
  Vous vous intéresserez particulièrement à la méthode .parse() qui vous permet
  d'obtenir les différentes partie d'une URL sous la forme d'un objet facilement
  exploitable en JavaScript.
**/

/**
  2. Votre programme ne doit pas planter si le Query String n'est pas fourni ou
  que les informations demandées n'y figurent pas.
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

const url = require('url');
const path = require('path');
const fs = require('fs');
const http = require('http');
const httpServeur = http.createServer();
var val = '';
httpServeur.on('request',(requeteHTTP,reponseHTTP)=>{

      const monurl = './html' + requeteHTTP.url;
      const urlchemin = url.parse(monurl,true).pathname;
      const urlsurname = url.parse(monurl,true).query.surname;
      const urlname = url.parse(monurl,true).query.name;

      //je parcours les propriete de l'objet si elles corresponde au "path.extname(monurl)" alors on 
      //pas besoin d'utiliser d'acces faire direct la consition d'erreur dans le readfile
      Object.keys(mimeTypes).forEach(prop => {
        if(path.extname(monurl) === '.' + prop){
          val = mimeTypes[prop];
        };
      })

      fs.readFile(urlchemin,(e,data)=>{
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
              if(urlname === undefined || urlname === undefined){
                reponse = reponse.toString().replace('{{ prenom }}',"'prenom inconnu'");
                reponse = reponse.replace('{{ nom }}',"'nom inconnu'");
              }
              else{
                reponse = reponse.toString().replace('{{ prenom }}',urlname);
                reponse = reponse.replace('{{ nom }}',urlsurname);
              }
  
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
