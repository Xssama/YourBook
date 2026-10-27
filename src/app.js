//form
let livre_form = document.getElementById('livre-form')
let titre = document.getElementById('livre')
let titre_erreur = document.getElementById('titre-erreur')

let auteur = document.getElementById('auteur')
let auteur_erreur = document.getElementById('auteur-erreur')


let annee = document.getElementById('annee')
let annee_erreur = document.getElementById('annee-erreur')


let genre = document.getElementById('genre')
let genre_erreur = document.getElementById('genre-erreur')


let status = document.getElementById('status')
let status_erreur = document.getElementById('status-erreur')


let description = document.getElementById('description')
let description_erreur = document.getElementById('description-erreur')

let submit_btn = document.getElementById('ajouter-livre')

function isNameValid(nom, minlength = 3, maxlength = 40)
{
    const regex = /[^\p{L}0-9 -]/u
    nom = nom.trim()
    nom = nom.replace(/ +/, " ")
    if(nom.length >= minlength && nom.length <= maxlength)
    {
        if (regex.test(nom)) {
            return false
        }
        else
        {
            return true
        }
        
    }
    
    return false
}