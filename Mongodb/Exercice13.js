// Importer dans une base us, dans la collection companies le fichier companies.json
mongoimport --db us --collection companies --file companies.json
// Quelle est la société la plus ancienne ?


// Ce traitement dépasse la mémoire max autorisée par Mongo.
// On doit créer un index pour pouvoir la traiter


// Quelle est la société qui emploie le plus de personnes ?

// Quelle est la société qui emploie le plus de personnes dans la publicité ?

// Quel est l'effectif cumulé des entreprises de 'network_hosting' ?

// Quelle entreprise est dirigé par Rich Langdale ?

// Supprimer les entreprises de finance

// Mettre à jour les entreprises de publicité en leur ajoutant un champ 'likes'

// Créer un index sur le champ nom de la compagnie

// Supprimer cet index

// Recréer l'index en spécifiant que la valeur doit être unique

// Cela déclenche une erreur : mongo ne peut pas créer l'index unique car il y a des doublons dans le nom des entreprises

// Insérer une société My Little Compagnie en respectant l'organisation actuelle de la base

// Trouver les sociétés qui ont un bureau situé à moins de 20 kilomètres de la statue de la Liberté

// Ajouter un champ phone dans l'adresse du premier bureau des sociétés qui sont situées dans l'état de NY

// Créer une autre collection 'awards', créer quelques récompenses en les reliant à une société en utilisant une référence

// Créer une fonction qui prend en paramètre un _id et qui calcule la moyenne des likes d'une entreprise

// Ajouter quelques likes dans un tableau et tester votre fonction

