// Dans la collection "piscines" de la base "paris", trouver en utilisant les opérateurs de requête

// les piscines qui sont dans le 13e arrondissement
db.piscines.find({zipCode: 75013})

// est équivalent à :

// les piscines qui ne sont pas le 13e arrondissement
db.piscines.find( { zipCode: { $ne: 75013 } } )

// En affichant uniquement le nom
db.piscines.find( { zipCode: { $ne: 75013 } }, { name: 1 } )

// les piscines qui sont dans le 13e et celles qui sont dans le 14e arrondissement
// Soit avec un $or
db.piscines.find( { $or: [ { zipCode: 75013 } , { zipCode: 75014 } ] } )

// Équivalent à

// Soit avec un $in
db.piscines.find( { zipCode: { $in: [ 75013 , 75014 ] } } )

// les piscines qui ne sont pas dans le 15, 16, 17 et 18e arrondissement
db.piscines.find( { zipCode: { $nin: [ 75015 , 75016 , 75017 , 75018 ] } } )
//ou
db.piscines.find( { $and: [ { zipCode: { $ne: 75015 } } , { zipCode: { $ne: 75016 } }, { zipCode: { $ne: 75017 } }, { zipCode: { $ne: 75018 } } ] })

// En triant par code postal descendant:
db.piscines.find( { zipCode: { $nin: [ 75015 , 75016 , 75017 , 75018 ] } }, {zipCode: 1} ).sort({zipCode: -1})
//ou
db.piscines.find( { $and: [ { zipCode: { $ne: 75015 } } , { zipCode: { $ne: 75016 } }, { zipCode: { $ne: 75017 } }, { zipCode: { $ne: 75018 } } ] },{zipCode: 1} ).sort({zipCode: 1})

// les piscines dont le code postal est supérieur ou égal à 75013 triés par code postal descendant
db.piscines.find( { zipCode: { $gte: 75013 } }, { zipCode: 1 } ).sort(-1)

// Les piscines situées à l'ouest de Notre Dame de Paris
db.piscines.find( { lon: { $lt: 2.35 } } ) 

// Et leur nombre
db.piscines.find( { lon: { $lt: 2.35 } } ).count()

// Les piscines dont zipCode=75013 ET id=2929 avec l'opérateur $and et $eq
db.piscines.find( { $and: [ { zipCode: 75013 } , { id: 2929 } ] } )

// On peut simplifier - uniquement l'opérateur $and
// Version la plus courte
db.piscines.find({zipCode: 75013,id: 2929 })







