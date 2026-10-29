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
//table-filter
let trier_btn = document.getElementById('trier-button')
let trier_livres = document.getElementById('trier-livres')
//table
let livre_tableau = document.getElementById('livres-tableau')
let tableau_corps = document.getElementById('livres-tableau-corps')
//localstorage
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
        titre: '',
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
        livres.push(livre)
        localStorage.setItem('livres', JSON.stringify(livres))
        fillTale()
    }
    
}
function ObjectToDataRow(livre)
{
    let livre_ligne = document.createElement('tr')
    livre_ligne.setAttribute('id', livre.id)
    let titre_td = document.createElement('td')
    titre_td.textContent = livre.titre
    livre_ligne.appendChild(titre_td)
    
    let auteur_td = document.createElement('td')
    auteur_td.textContent = livre.auteur
    livre_ligne.appendChild(auteur_td)
    
    let annee_td = document.createElement('td')
    annee_td.textContent = livre.annee
    livre_ligne.appendChild(annee_td)
    
    let genre_td = document.createElement('td')
    genre_td.textContent = livre.genre
    livre_ligne.appendChild(genre_td)
    
    let statu_td = document.createElement('td')
    statu_td.textContent = livre.statu
    livre_ligne.appendChild(statu_td)
    
    let description_td = document.createElement('td')
    description_td.textContent = livre.description  
    livre_ligne.appendChild(description_td)
    
    let action =  document.createElement('td')
    let Editbtn =  document.createElement('button')
    Editbtn.setAttribute('data-action', 'edit-livre')
    Editbtn.textContent = 'Modifier'
    Editbtn.classList.add('mr-2')
    Editbtn.classList.add('bg-blue-500')
    action.appendChild(Editbtn)
    
    let Removebtn =  document.createElement('button')
    Removebtn.setAttribute('data-action', 'remove-livre')
    Removebtn.textContent = 'Supprimer'
    Removebtn.classList.add('bg-red-500')
    action.appendChild(Removebtn)
    
    livre_ligne.appendChild(action)

    return livre_ligne
}
function fillTale(tab=livres)
{
    tableau_corps.replaceChildren()
    for (let livre of livres) {
        tableau_corps.appendChild(ObjectToDataRow(livre))
    }
}
function SupprimerLivre(row)
{
    
    let Sup_confirm = confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')
    if (Sup_confirm) {
        livres = livres.filter((livre) => 
        row.getAttribute('id') != livre.id)
        localStorage.setItem('livres', JSON.stringify(livres))
        row.remove()
    }
}
function TableauActionEvetListener(event)
{
    
    let button = event.target.closest("[data-action='remove-livre']")  || event.target.closest("[data-action='edit-livre']")
    
    if (!button) {
        return
    }
    
    
    if (button.getAttribute('data-action') == 'remove-livre') {
        SupprimerLivre(button.closest('tr'))

    }
    fillTale()
}
function fillchamps()
{
    titre.value = "antigone"
    auteur.value = "xussama"
    annee.value = "1999"
    genre.value = "science"
    description.value = "une courte description"

}
fillchamps()
function trierParTitre()
{
    let livrestrier = livres.sort((livreA, livreB) => livreA.titre.localeCompare(livreB.titre) )
    localStorage.setItem('livres', JSON.stringify(livrestrier))
    fillTale(livrestrier)
}
function trierParAuteur()
{
    let livrestrier = livres.sort((livreA, livreB) => livreA.auteur.localeCompare(livreB.auteur) )
    localStorage.setItem('livres', JSON.stringify(livrestrier))
    fillTale(livrestrier)
}
function trierParAnnee() {
    let livrestrier = livres.sort((livreA, livreB) => Number(livreB.annee) - Number(livreA.annee)  )
    localStorage.setItem('livres', JSON.stringify(livrestrier))
    fillTale(livrestrier)
}
function triertableau()
{
    if (trier_livres.value === "titre") {
        trierParTitre()
    }
    else if (trier_livres.value === "auteur") {
        trierParAuteur()
    }
    else{
        trierParAnnee()
    }
}
titre.addEventListener('focusout', ValidateTitle)
auteur.addEventListener('focusout', ValidateAuteur)
annee.addEventListener('focusout', ValidateYear)
livre_form.addEventListener('submit', AjouterLivreEventHandler)
fillTale()
livre_tableau.addEventListener('click', TableauActionEvetListener)
trier_btn.addEventListener('click', triertableau)