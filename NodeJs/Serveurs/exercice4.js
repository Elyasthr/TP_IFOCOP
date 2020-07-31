/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port][/ressource]

  Par exemple :
   - Protocole : http
   - Adresse IP : 31.42.53.64
   - Port : 5555
   - Ressource : /accueil

  Donne l'URL : http://31.42.53.64:5555/home
**/

/**
  Exercices :

  1.
  Créez deux fichiers HTML valides : home.html et about.html

  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP
  - le contenu du fichier home.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /accueil
  - le contenu du fichier about.html si l'URL utilisé pour effectuer la requête
    HTTP contient la ressource /apropos
**/
const fs = require('fs');
const http = require('http');
const httpServeur = http.createServer();

httpServeur.on('request',(requeteHTTP,reponseHTTP) => {

  if(requeteHTTP.url === '/acceuil'){

    fs.access('./home.html', fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err) {
  
        console.log("le fichier n'esxiste ou ne peut etre lu");
  
      }
      else {
  
        fs.readFile('./home.html',"utf-8",(err, data) => {
          if(err){
            reponseHTTP.end("erreuraaaaa");
          }
          else{
            const lareponse = data;
  
            reponseHTTP.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Content-Length': lareponse.length,
            })
        
            reponseHTTP.write(lareponse,() => {
              reponseHTTP.end();
            })
          }
        });
        
      }
    });

  }

  else if(requeteHTTP.url === '/apropos'){
    fs.access('./about.html', fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err) {
  
        console.log("le fichier n'esxiste ou ne peut etre lu");
  
      }
      else {
  
        fs.readFile('./about.html',"utf-8",(err, data) => {
          if(err){
            reponseHTTP.end("erreuraaaaa");
          }
          else{
            const lareponse = data;
  
            reponseHTTP.writeHead(200, {
              'Content-Type': 'text/html; charset=utf-8',
              'Content-Length': lareponse.length,
            })
        
            reponseHTTP.write(lareponse,() => {
              reponseHTTP.end();
            })
          }
        });
        
      }
    });
  }
 
/**
  Exercices :

  2. Créez un fichier HTML valide : 404.html

  Votre serveur HTTP doit retourner dans sa réponse HTTP le contenu du fichier
  404.html si l'URL utilisé pour effectuer la requête HTTP ne contient pas la
  ressource /accueil ou /apropos.

  N'oubliez pas de préciser le code 404 dans les en-têtes de la réponse HTTP.
**/

  else{
    fs.access('./404.html',fs.constants.F_OK | fs.constants.R_OK, (err) => {
      if (err) {

        console.log("le fichier n'esxiste ou ne peut etre lu");
        reponseHTTP.end("erreureeee");

      }
      else {
        fs.readFile('./404.html','utf-8',(err,data) => {

          if(err){
            reponseHTTP.end("erreur");
          }

          const lareponse = data;

          reponseHTTP.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': lareponse.length,
          })

          reponseHTTP.write(lareponse,() => {
            reponseHTTP.end();
          })
        
        })
      }
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
