//form
let livre_form = document.getElementById('livre-form')
let titre = document.getElementById('titre')
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
let submit_btn_erreur = document.getElementById('ajouter-livre-erreur')

let livres = JSON.parse(localStorage.getItem('livres')) || []
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

function ValidateTitle()
{
    
    if (!isNameValid(titre.value, 1, 999)) {
        titre.classList.remove('border-gray-500')
        titre.classList.add('border-red-500')
        titre_erreur.textContent= 'le nom entree n\'est pas valide!'
        titre_erreur.classList.add('todo-erreur')
    }
    else
    {
        titre.classList.add('border-gray-500')
        titre.classList.remove('border-red-500')
        titre_erreur.textContent= ''
        titre_erreur.classList.remove('todo-erreur')

    }
}
function ValidateAuteur()
{
    if (!isNameValid(auteur.value, 1, 999)) {
        auteur.classList.remove('border-gray-500')
        auteur.classList.add('border-red-500')
        auteur_erreur.textContent= 'le nom d\'auteur n\'est pas valide!'
        auteur_erreur.classList.add('todo-erreur')
    }
    else
    {
        auteur.classList.add('border-gray-500')
        auteur.classList.remove('border-red-500')
        auteur_erreur.textContent= ''
        auteur_erreur.classList.remove('todo-erreur')

    }
}
function ValidateYear()
{
    if (annee.value == "") {
        return
    }
    let currentyear = new Date().getFullYear()
    if (Number(annee.value) > currentyear) {
        annee.classList.remove('border-gray-500')
        annee.classList.add('border-red-500')
        annee_erreur.textContent= 'l\'annee n\'est pas valide!'
        annee_erreur.classList.add('todo-erreur')
    }
    else
    {
        annee.classList.add('border-gray-500')
        annee.classList.remove('border-red-500')
        annee_erreur.textContent= ''
        annee_erreur.classList.remove('todo-erreur')

    }
}

function AjouterLivreEventHandler(event)
{
    event.preventDefault()
    const livre = {
        id: new Date().getTime(),
        livre: '',
        auteur: '',
        annee: 0,
        genre: '',
        statu: 'a-lire',
        description: '',

    }
    let ErreursP = document.getElementsByClassName('todo-erreur')
    if (ErreursP.length > 0) {
        submit_btn_erreur.textContent = "Veuillez corriger les erreurs signalées avant de soumettre le formulaire."
        
    }
    else
    {
        submit_btn_erreur.textContent = ''
        livre.titre = titre.value
        livre.auteur = auteur.value
        livre.annee = annee.value
        livre.genre = genre.value
        livre.statu = status.value
        livre.description = description.value
        console.log(livre);
        livres.push(livre)
        localStorage.setItem('livres', JSON.stringify(livre))
    }
    
}
titre.addEventListener('focusout', ValidateTitle)
auteur.addEventListener('focusout', ValidateAuteur)
annee.addEventListener('focusout', ValidateYear)
livre_form.addEventListener('submit', AjouterLivreEventHandler)
