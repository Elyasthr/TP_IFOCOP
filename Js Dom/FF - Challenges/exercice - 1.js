/*
	L'objectif est d'écrire un algorithme génétique.
	Il s'agit de reproduire le comportement d'un banc
	de poissons qui nagent dans des directions aléatoires
	dans un aquarium.
	
	L'animation devra être produite dans une balise canvas.
	Les poissons devront faire l'objet d'une représentation
	visuelle (par forcément réaliste !).
	
	Le programme doit respecter les régles suivantes :
	- Un aquarium contient un nombre aléatoire de poissons (un aquarium
	  est un tableau d'objet de type poisson);
	- Chaque poisson se déplace dans une direction aléatoire (les 
	  poisson on un "vecteur de déplacement" aléatoire);
	- Si un poisson est à une certaine distance d'un autre poisson
	  il doit se mettre à se déplacer dans la même direction (un poisson
	  a un "champ de vision");
	- Si un poisson atteint les limites de l'aquarium, il doit changer
	  de direction pour une nouvelle direction aléatoire (un poisson
	  ne peut pas sortir de l'aquarium);
	- Le pointeur de la souris de l'utilisateur peut survoler l'aquarium.
	  Si le pointeur de la souris se situe à un certaine distance d'un
	  poisson, celui-ci doit changer de direction pour une direction aléatoire
	  opposée à la position du pointeur de la souris (un poisson "à peur" de
	  la souris).
*/