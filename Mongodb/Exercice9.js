// Mise à jour -> update

// Dans la liste des restaurants
//use newyork
// Modifier les restaurants dont la cuisine est Hamburgers pour leur ajouter un champ healthy_food égal à 2
db.restaurants.updateMany(
    { cuisine: "Hamburgers" },
    { $set: { healthy_food: 2 } },
)
// Pour les végétariens, leur mettre le champ healthy food à 9.
db.restaurants.updateMany(
    { cuisine: "Vegetarian" },
    { $set: { healthy_food: 9 } },
)
// Vérifier ques tous les restaurants ont un tableau grades
db.restaurants.count()
db.restaurants.find({ grades: {$exists: true } }).count()
db.restaurants.count({ grades : { $type : "array" } })
// les deux renvoient 25359, donc oui !

// Supprimer le champ building des restaurants situés dans le Bronx et ajouter un booléen
db.restaurants.updateMany(
    { borough: "Bronx" },                                                
    {  $unset : { "address.building": "" }, $set: { bool: true } },     
)

// équivalent avec Update
db.restaurants.update(
    { borough : "Bronx" },
    { $unset : { "address.building" : "" }, $set : { bool : true}},
    { multi: true }
)

//Vérifier

// Ajouter un champ rating à 5 à tous les restaurants
db.restaurants.updateMany(
    {},
    {$set: {rating: 5}}
)
// Multiplier le champ rating par 2 pour les restaurants situés dans le Queens
db.restaurants.updateMany(
    {borough: "Queens"},
    {$mul: {rating: 2}}
)
// Trouver les restaurants de Brooklyn
db.restaurants.find({borough: "Brooklyn"},{_id: 0, borough:1, name: 1})

// Limiter les résultats à 100
db.restaurants.find({borough: "Brooklyn"},{_id: 0, borough:1, name: 1}).limit(100)

// Appliquer d'abord un count()
db.restaurants.find({borough: "Brooklyn"}).limit(100).count()

// Puis à la place appliquer un size()
db.restaurants.find({borough: "Brooklyn"}).limit(100).size()

// Quelle est la différence ?
//size compte jusqu'au nombre limite

// Ajouter une entrée au tableau grades pour le restaurant "Tu-Lu'S Gluten-Free Bakery"
//pas trop compris cette question
//pretty() sert a mieux structuré l'objet json afin d'y voir plus clair
db.restaurants.find({ name : "Tu-Lu'S Gluten-Free Bakery"}).pretty()

db.restaurants.updateOne(
    { name : "Tu-Lu'S Gluten-Free Bakery" },
    { $push: { grades : { date : new Date(), grade : "A", score : 16 } } }
)
// Pour vérifier

    
// Modifier le champ rating pour tous les documents pour qu'il soit égal à la moyenne réelle des grades
// Créer un curseur et le manipuler avec un forEach
pour chaque restaurent, parcourir pour chaqun le tableau grades et recuperer le score dans une variable puis l'addtionner au suivant, puis divisé par la taille du tableau, puis mettre dans le rating cette valeur ci

var restaurants = db.restaurants.find().limit(50)

//version du prof
restaurants.forEach(restaurant => {
    print(restaurant.name);

    var moyenne = 0;

    restaurant.grades.forEach(grade =>{
        // print(grade.score);
        moyenne += grade.score;
    })
    //print(restaurant.grades.length);
    moyenne = moyenne / restaurant.grades.length ;
    print(moyenne);
    // Enregistrement de la moyenne
    db.restaurants.updateOne(
        { _id : restaurant._id },
        { $set : { rating : moyenne } }
    )

});

//ma version
var restaurants = db.restaurants.find()

restaurants.forEach( restaurant => {
    var moyenne = 0;

    print(restaurant.grades.length);
    for(var i = 0; i < restaurant.grades.length; i++){
        moyenne += restaurant.grades[i].score;
    }
    moyenne = moyenne/restaurant.grades.length;
    
    db.restaurants.updateOne(
        {},
        {$set: {rating: 1}}
    )
});

// On peut faire la même chose avec la méthode save(). C'est plus élégant.
var restaurants = db.restaurants.find()
restaurants.forEach(restaurant => {
    var moyenne = 0;
    restaurant.grades.forEach(grade =>{
        moyenne += grade.score;
    })
    moyenne = moyenne / restaurant.grades.length ;
    // Enregistrement de la moyenne
    restaurant.rating = moyenne;
    db.restaurants.save(restaurant);
});

// Quel est le restaurant qui a la meilleure moyenne
db.restaurants.find(
    {},
    { name : 1, rating : 1 , _id : 0 }
).sort({ rating : -1 }).limit(3)

