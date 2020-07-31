/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
  - [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 10.30.20.30
   - Port : 8899
   - Ressource : /index

  Donne l'URL : http://10.30.20.30:8899/index
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps
  de réponse en format HTML valide si et seulement si l'URL contenue dans la
  requête HTTP contient
    /index.

  Votre objet de type http.IncomingMessage contient une propriété .url vous
  permettant d'obtenir des informations relatives à l'URL employé pour effectuer
  la requête HTTP.
**/
//OK
/**
  2.
  Améliorez votre serveur HTTP pour que, si l'URL employé pour effectuer la
  requête HTTP ne contient pas /index, votre serveur HTTP produise une réponse
  HTTP avec dans :
   - l'en-tête, un code 404;
   - le corps, un message en format HTML valide du type :
     L'URL demandé n'existe pas.
**/
const http = require('http');
const url = require('url');
const httpServeur = http.createServer();

httpServeur.on('request',(requete,reponse) => {

  if(requete.url === '/index'){

    const lareponse = "<h1>reponse afficher si et seulement si l'url contient index</h1>";

    reponse.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': lareponse.length,
    })

    reponse.write(lareponse,() => {
      reponse.end();
    })

  }
  else{

    const lareponse = "<h1>L'URL demandé n'existe pas</h1>";

    reponse.writeHead(404, {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Length': lareponse.length,
    })

    reponse.write(lareponse,() => {
      reponse.end();
    })

  }

})

httpServeur.listen(54545,function(e){
  if(!e){
  console.log('serveur ok');
  }
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
