/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]?[query string]

  Par exemple :
   - Protocole : http
   - Adresse IP : 192.168.104.15
   - Port : 80
   - Ressource : /formulaire.html
   - Query String : date=2015-09-01

  Donne l'URL : http://192.168.104.15:80/formulaire.html?date=2015-09-01
**/

/**
  Exercices :

  1. Pour cet exercice vous reprendrez le serveur HTTP de l'exercice précédent.

  Créez un fichier HTML dans lequel se trouvera un formulaire de saisie.

  Ce formulaire à pour attributs :
  - method="GET"
  - action="http://[adresse IP ou nom de domaine de votre serveur][:port de votre serveur]/traitement.html"

  Ce formulaire contient 4 champs :
  - titre avec pour attribut name="titre";
  - descriptif avec pour attribut name="descriptif";
  - date avec pour attribut name="date";
  - un bouton de soumission.

  Vérifiez que lorsque vous soumettez votre formulaire, votre navigateur
  Internet produit bien une requête HTTP dont l'URL est de la forme :
    http://[adresse IP ou nom de domaine de votre serveur][:port de votre serveur]/traitement.html?titre=&descriptif=&date=
**/
//OK C'EST FAIT
/**
  2.

  Créez un fichier HTML traitement.html dans lequel vous positionnerez trois
  chaînes de caractères facilement reconnaissables. Par exemple :
  - {{ titre }}
  - {{ description }}
  - {{ date }}

  Après avoir lu et obtenu le contenu du fichier traitement.html et avant de
  retourner la réponse HTTP, votre serveur HTTP doit remplacer dans le contenu
  du fichier les 3 chaînes de caractères par, respectivement, le titre, la
  description et la date provenant du Query String contenu dans la requête HTTP.
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
      const urltitre = url.parse(monurl,true).query.titre;
      const urldesc = url.parse(monurl,true).query.descriptif;
      const urldate = url.parse(monurl,true).query.date;

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
              //console.log(url.parse(monurl,true).query);
              var reponse = data;
              //si beaucoup de remplacement faire une boucle ou on appel replace pour chaque element du tableau..
                if(urltitre === '' || urldesc === '' || urldate === ''){
                  reponse = 'erreur veuillez remplir le formulaire correctement';
                }
                else{
                  reponse = reponse.toString().replace('{{ titre }}',urltitre);
                  reponse = reponse.replace('{{ description }}',urldesc);
                  reponse = reponse.replace('{{ date }}',urldate);
                }
              reponse = Buffer.from(reponse);

              reponseHTTP.writeHead(200,{
                'Content-Type': val,
                'Content-Length': reponse.length,
              })

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
