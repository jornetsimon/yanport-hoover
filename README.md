# iHoover
Configuration basique d'un aspirateur automatique.

Test technique Yanport - **Simon JORNET**

## Build

```bash
npm install
npm run build
```

## Usage

Une fois le code compilé, le point d'entrée *main.js* attend trois arguments comme suit :

- **a**,**b** : représentant respectivement les dimensions horizontale et verticale de la pièce
- **x**,**y**,**o** : représentant respectivement les coordonnées abscisse, ordonnée et l'orientation de l'aspirateur selon la notation cardinale anglaise (N,E,W,S)
- **ZZZZZ**... : une séquence de commandes (décrites ci-dessous) pour piloter l'aspirateur 

Commandes reconnues :

- **D** : faire pivoter l'aspirateur de 90° à droite
- **G** : faire pivoter l'aspirateur de 90° à gauche
- **A** : faire avancer l'aspirateur d'une case dans la direction actuelle

Exemple :

```bash
node dist/main.js 10,10 5,5,N DADADADAA
```

