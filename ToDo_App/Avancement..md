##— Prérequis O1 ✅ 
Récupérer et reconstruire l’application « Onsen _Todo » sur votre environnement de développement.

##— Prérequis O2 ✅ 
Faire impérativement ressortir le nom du ou des participants sur les écrans de l’application.
#Présent dans la sideBar.

##— Prérequis O3 ✅ 
Modification de l’icône associée à l’application.
#Icone modifié par l'icon présent à la racine (todo_app_icon.png).

##— Prérequis O4 ✅ 
Suppression des liens (et de la section correspondante) dans le menu rétractable (switch menu).

##— Question P1 ✅ 
Assurer la persistance des données (quelle que soit la plate-forme visée). Ainsi, si l’application est stoppée, l’utilisation suivante doit permettre de retrouver toutes les données présentes avant l’arrêt. Cette persistance doit être gérée au moyen de l’API LocalStorage : https://cordova.apache.org/docs/en/
latest/cordova/storage/storage.html#localstorage. On conseille, à cette fin, de s’intéresser aux fonctions
JSON.stringify() et JSON.parse() pour (dé)sérialiser les données. On rappelle par ailleurs que les principaux
navigateurs permettent d’accéder facilement aux données stockées via cette technologie à travers leurs outils
de développement.

##— Question P2 ✅ 
Ajout d’un nouvel état des tâches gérées : en plus de l’état « en attente » et de l’état « terminé »,
il faut gérer l’état « en cours ». Les tâches correspondantes devront apparaître dans un onglet supplémentaire. Naturellement, toutes les opérations impliquées dans les changements d’état de tâches sont impactées et
doivent être mises à jour.
#Etat ajouté (Important).

##— Question P3 ✅ 
Suppression de toutes les tâches. Le lien ou le bouton permettant de réaliser cette opération est
à implanter à l’endroit que vous jugez pertinent (cela peut d’ailleurs être l’occasion de refactorer les autres
liens / boutons du même type).
#Boutons disponnible dans la sideBar.

##— Question P4 ✅ 
Lors de la création d’une tâche, ajouter une liste déroulante permettant de choisir l’une des
catégories existantes, tout en laissant la possibilité d’en définir une librement.

##— Question S1 ✅ , difficulté : facile 
Ajouter un champ permettant de définir une date de rendu (une deadline) sur
les tâches.

##— Question S2, difficulté : moyenne 
Implanter un tri (croissant et décroissant, choix interactif) des tâches affichées sur l’onglet courant. Cette fonctionnalité doit être proposée sur tous les onglets de l’application. Ce tri
doit a priori rester une action ponctuelle : il réorganise la liste au moment où il est invoqué, mais n’empêche
pas par exemple de réorganiser les tâches par d’autres fonctionnalités par la suite (notamment la fonctionnalité
S6 si elle est implantée).

##— Question S3, difficulté : difficile 
Refaire la persistance (ou plutôt la redonder) grâce à SQLite.

##— Question S4 ✅ , difficulté : moyenne 
Permettre de supprimer toutes les tâches d’une catégorie (et donc la catégorie elle-même puisque les catégories se calculent dynamiquement).
#Disponible dans la sideBar.

##— Question S5, difficulté : facile 
Refonte CSS de l’application : attention toutefois, il ne faut que ces modifications empiètent sur les styles (Onsen) permettant d’implanter les principes d’interfaces des plates-formes
Android / iOS (demander à votre enseignant dans le doute).

##— Question S6, difficulté : difficile 
Permettre du drag’n’drop sur les tâches en cours de visualisation, afin de
changer leur ordre d’apparition. Ce nouvel ordre doit alors persister (passage d’un onglet à un autre, sauvegarde / restauration) tant qu’une nouvelle action de réorganisation n’est pas réalisée.

##— Question S7  , difficulté : moyenne 
Si la fonctionnalité S1 est implantée, proposer une action permettant
de supprimer automatiquement toutes les tâches dont la date de rendu est passée (i.e. elle est au maximum
positionnée à la veille du jour où cette action est réalisée).