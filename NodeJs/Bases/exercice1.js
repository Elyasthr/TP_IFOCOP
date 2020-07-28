/**
  Quand on utilise Node JS, l'objet Global est l'objet principal dans lequel le
  code s'exécute. Par comparaison, sur un navigateur l'objet principal est
  l'objet Window. L'objet Window n'EXISTE PAS sur Node JS. En revanche les
  fonctions/objets fondamentaux de JavaScript (undefined, parseFloat(), isNaN(),
  Math, Date, Object, ...) sont toujours disponibles.

  L'objet Global documenté ici : https://nodejs.org/docs/latest/api/globals.html.

  Cet objet est accessible à tout moment à partir de la variable global. Il
  contient des propriétés comme :

  - global.console pour accéder à l'objet Console documenté ici :
      https://nodejs.org/docs/latest/api/console.html
  - global.process pour accéder à l'objet Process documenté ici :
      https://nodejs.org/docs/latest/api/process.html

  Généralement, on n'écrit pas global. Les objets cités précédemment sont
  utilisés directement à partir des propriétés :
  - console.
  - process.


  L'objet Console vous permet d'afficher des messages sur la sortie standard
  (au niveau du terminal). Il s'utilise comme l'objet Console qu'on trouve dans
  l'objet Window d'un navigateur Internet.

  Par exemple:
    - Si on exécute global.console.log(`Ceci est un message`); alors on
    affichera Ceci est un message au niveau du terminal.

  L'objet Process vous permet de travailler sur le programme  démarré par Node
  JS (un programmme démarré s'appelle un processus).

  La propriété ".argv", par exemple, de l'objet Process contient un tableau avec
  la liste des arguments utilisés lors de l'exécution du programme.

  Par exemple :
    - Si on démarre notre programme en écrivant "node exercice1.js a 3 b" alors
    global.process.argv contiendra le tableau :

      ['..\node','..\exercice1.js', 'a', '3', 'b']

  ATTENTION, l'Array contient toujours des chaînes de caractère même si les
  arguments fournis à l'exécution sont des nombres.
**/

/**
  Exercices :
    1.
    Écrivez un programme que vous exécuterez à l'aide de Node JS. Ce
    programme affiche dans la console :
      - Le nom du fichier source du programme (voir Global)
      - Le nom du dossier dans lequel le programme se trouve (voir Global)
      - Le nom du dossier dans lequel le programme s'exécute (voir Process)
**/


//nom ou plutot chemin du fichier source
console.log(__filename);
//nom ou plutot chemin du dossier dans lequel se trouve le foichier source
console.log(__dirname);
//nom ou plutot chemin du dossier ou est executé le programme
console.log(process.cwd());



/**
    2.
    Écrivez un programme que vous exécuterez à l'aide de Node JS. Ce
    programme prend en argument un nombre.

    Ce nombre est le nombre de fois que le programme affichera
    "Bonjour n fois !" dans le  terminal. Par exemple :

    - Si je démarre le programme en écrivant "node exercice1.js 1" alors le
      programme écrira "Bonjour 1 fois !" dans la console.
    - Si je démarre le programme en écrivant "node exercice1.js 2" alors le
      programme écrira "Bonjour 1 fois ! Bonjour 2 fois !" dans la console.

    Si le programme n'a pas de nombre en argument ou autre chose qu'un nombre,
    le programme doit afficher Au Revoir ! dans la console.
**/


var long = process.argv.length - 1;
var arg = process.argv[long];

var sayHi = function(n){
  if(isNaN(n) || n == null){
    console.log('Au Revoir !');
  }
  else{
    for(var i = 1; i <= n; i++){
      console.log('Bonjour ' + i + ' fois !');
    }
  }
}

sayHi(arg);


/**
    3.
    Améliorez votre programme. Créez une fonction qui prend en argument un
    nombre et qui affiche autant de fois Bonjour que le nombre fourni en
    argument.

    Écrivez un programme qui produit un résultat identique au précédent mais en
    utilisant la fonction que vous avez créé.
**/

//C'est ce que j'ai directement fait pour le petit deux

/**
 * Sami Radi - VirtuoWorks® - tous droits réservés©
**/
