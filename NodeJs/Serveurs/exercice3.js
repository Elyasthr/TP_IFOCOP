/**
  Utilisation du module http de Node JS pour créer un serveur http de plus en
  plus élaboré.

  Votre serveur devra être joignable à l'URL :
    [protocole]://[adresse IP ou nom de domaine][:port]

  Par exemple :
   - Protocole : http
   - Adresse IP : 1.2.3.4
   - Port : 7777

  Donne l'URL : http://1.2.3.4:7777
**/

/**
  Exercices :

  1.
  Vous devez créer un serveur HTTP qui retourne dans sa réponse HTTP un corps de
  réponse en format HTML obtenu à partir du contenu d'un fichier.

  Vous devez donc créer un fichier HTML valide à coté de votre programme.

  A chaque requête HTTP reçue, vous utiliserez les méthodes asynchrones de
  l'objet FileSystem de Node JS pour lire et obtenir le contenu de votre fichier
  HTML. Puis, vous produirez une réponse HTTP contenant le contenu du fichier
  HTML.
**/
const fs = require('fs');
const http = require('http');
const httpServeur = http.createServer();

httpServeur.on('request',(requeteHTTP,reponseHTTP)=>{

  // Check if the file exists in the current directory, and if it is readable.
  fs.access('./test.html', fs.constants.F_OK | fs.constants.R_OK, (err) => {
    if (err) {

      console.log("le fichier n'esxiste ou ne peut etre lu");

    }
    else {

      fs.readFile('./test.html',"utf-8",(err, data) => {
        if(err){
          const lareponse = "<h1>L'URL demandé n'existe pas</h1>";

          reponseHTTP.writeHead(404, {
            'Content-Type': 'text/html; charset=utf-8',
            'Content-Length': lareponse.length,
          })

          reponseHTTP.write(lareponse,() => {
            reponseHTTP.end();
          })
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
})

httpServeur.listen(54545,function(e){
  if(!e){
  console.log('serveur ok');
  }
});

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
