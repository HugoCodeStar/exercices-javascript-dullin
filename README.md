# exercices-javascript
 Série d'exercices Javascript

# Instruction
Pour chaque problème, écrivez un programme en javascript qui sera contenu dans un fichier (avec l'extension .js).

Écrivez les programmes demandez et ajouté quelques tests d'exécution (3-4) pour démontré la fonctionnalité de votre programme.

Pour tester votre code, vous pouvez l'invoqué avec node

```
node exercice1.js
```

Cela va exécuté votre programme

Un example est donné pour la première question.

# Questions

* Écrivez un programme JavaScript qui additionne deux nombre ensemble. 
* Écrivez un programme JavaScript qui itère les entiers de 1 à 100. Mais pour les multiples de trois, imprimez "Fizz" au lieu du nombre et pour les multiples de cinq imprimez "Buzz". Pour les nombres qui sont des multiples de trois et cinq, imprimez "FizzBuzz".
* Écrivez un programme JavaScript pour construire le modèle suivant, en utilisant une boucle imbriquée for.
```
*  
* *  
* * *  
* * * *  
* * * * *
```
* Écrivez un programme JavaScript pour vérifier deux nombres donnés et renvoyez true si l'un des nombres est 50 ou si leur somme est 50.
* Écrivez une fonction JavaScript qui prendra un tableau de nombres stockés et trouvera respectivement le deuxième plus petit et le deuxième plus grand nombre.
* Écrivez une fonction JavaScript pour obtenir le premier élément d'un tableau. Le passage d'un paramètre 'n' renverra les premiers 'n' éléments du tableau.

Exemple
```js
console.log(first([7, 9, 0, -2]));
console.log(first([],3));
console.log(first([7, 9, 0, -2],3));
console.log(first([7, 9, 0, -2],6));
console.log(first([7, 9, 0, -2],-3));
```
Output
```js
7
[]
[7,9,0]
[7,9,0,-2]
[]
```
* Écrivez un programme JavaScript pour trouver l'élément le plus fréquent d'un tableau.

Sample array: const arr1=[3, 'a', 'a', 'a', 2, 3, 'a', 3, 'a', 2, 4, 9, 3];
Sample Output: a ( 5 times )
* Écrivez un programme JavaScript pour aplatir un tableau imbriqué (n'importe quelle profondeur). Si vous passez un vrai en plus, le tableau ne sera aplati que d'un seul niveau.

Sample Data:
console.log(flatten([1, [2], [3, [[4]]],[5,6]]));
[1, 2, 3, 4, 5, 6]
console.log(flatten([1, [2], [3, [[4]]],[5,6]], true));
[1, 2, 3, [[4]], 5, 6]

* Écrire une fonction JavaScript qui inverse un nombre.
Sample Data and output:
Example x = 32243;
Expected Output: 34223

* Écrivez une fonction JavaScript qui accepte une chaîne comme paramètre et compte le nombre de voyelles dans la chaîne.

Remarque: Comme la lettre «y» peut être considérée à la fois comme une voyelle et une consonne, nous ne comptons pas «y» comme voyelle ici.

Sample Data and output:
Example string: 'The quick brown fox'
Expected Output: 5

* Écrivez une fonction JavaScript pour extraire des caractères uniques d'une chaîne.

Example string : "thequickbrownfoxjumpsoverthelazydog"
Expected Output : "thequickbrownfxjmpsvlazydg"

* Écrivez un programme JavaScript pour répertorier les propriétés d'un objet JavaScript.

Sample object:
const student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };
Sample Output: name,sclass,rollno

* Écrivez un programme JavaScript pour obtenir la longueur d'un objet JavaScript.

Sample object:
var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 }; 

* Écrivez un programme JavaScript pour afficher l'état de lecture (c'est-à-dire afficher le nom du livre, le nom de l'auteur et l'état de lecture) des livres suivants.

```js
const library = [ 
    {
        title: 'Bill Gates',
        author: 'The Road Ahead',
        readingStatus: true
    },
    {
        title: 'Steve Jobs',
        author: 'Walter Isaacson',
        readingStatus: true
    },
    {
        title: 'Mockingjay: The Final Book of The Hunger Games',
        author: 'Suzanne Collins',
        readingStatus: false
    }];
```

Output
```
Already read 'Bill Gates' by The Road Ahead.
Already read 'Steve Jobs' by Walter Isaacson.
You still need to read 'Mockingjay: The Final Book of The Hunger Games' by Suzanne Collins.
```