Hello,

j'ai une question concernant l'exercice, non pas d'un point de vue technique mais d'un point de vue fonctionnel (ce qui demandé)

pour résumer l'exercice permet de créer un outil avec plusieurs UI (en l'occurence 2 : web/CLI) qui prend en entrée des infos sur le millenium-falcon (et l'univers)  d'une part et des infos sur l'empire d'autre part et qui donne en sortie un pourcentage de chance de réussite

ce que je ne comprend pas c'est les connections attendues entre ces interfaces

je précise ma question avec un exemple : 
pour l'interface web il est demandé de prévoir un input pour uploader les infos sur l'empire et d'afficher le pourcentage de chance de réussite.
le tout sans importer les infos sur le millenium falcon  

alors que dans la CLI on précise bien les 2 à chaque fois (millenium-falcon ET empire)

Est ce normal ?

pour avancer je propose de partir sur les hypothèse suivantes

1/ le backend a une version "figée" de la configuration du millenium-falcon et l'UI web dépend de cette config et sert à jouer avec la config de l'empire
2/ la CLI permet de faire des tests en étant plus souples sur les config (en appliquant les config qu'on veut)
 