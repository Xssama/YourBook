//form-inputs
let titre = document.getElementById('titre')
let titre_erreur = document.getElementById('titre-erreur')

let auteur = document.getElementById('auteur')
let auteur_erreur = document.getElementById('auteur-erreur')


let annee = document.getElementById('annee')
let annee_erreur = document.getElementById('annee-erreur')


let genre = document.getElementById('genre')


let status = document.getElementById('status')

let description = document.getElementById('description')
//dialog-inputs
let modifier_titre = document.getElementById('modifier-titre')
let modifier_titre_erreur = document.getElementById('modifier-titre-erreur')

let modifier_auteur = document.getElementById('modifier-auteur')
let modifier_auteur_erreur = document.getElementById('modifier-auteur-erreur')


let modifier_annee = document.getElementById('modifier-annee')
let modifier_annee_erreur = document.getElementById('modifier-annee-erreur')


let modifier_genre = document.getElementById('modifier-genre')


let modifier_status = document.getElementById('modifier-status')


let modifier_description = document.getElementById('modifier-description')

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
function siAnneValid(annee, minAnnee=0)
{
    let presentannee= new Date().getFullYear()
    console.log(presentannee);
    if (annee > minAnnee && annee <= presentannee) {
        return true
    }
    else
    {
        return false
    }
    
}

function ValidateTitle_form()
{
    
    if (!isNameValid(titre.value, 1, 999)) {
        titre.classList.remove('border-gray-500')
        titre.classList.add('border-red-500')
        titre_erreur.textContent= 'le nom entree n\'est pas valide!'
        titre_erreur.classList.add('todo-erreur')
        return false
    }
    else
    {
        titre.classList.add('border-gray-500')
        titre.classList.remove('border-red-500')
        titre_erreur.textContent= ''
        titre_erreur.classList.remove('todo-erreur')
        return true
    }
}
function ValidateAuteur_form()
{
    if (!isNameValid(auteur.value, 1, 999)) {
        auteur.classList.remove('border-gray-500')
        auteur.classList.add('border-red-500')
        auteur_erreur.textContent= 'le nom d\'auteur n\'est pas valide!'
        auteur_erreur.classList.add('todo-erreur')
        return false
    }
    else
    {
        auteur.classList.add('border-gray-500')
        auteur.classList.remove('border-red-500')
        auteur_erreur.textContent= ''
        auteur_erreur.classList.remove('todo-erreur')
        return true
    }
}
function ValidateYear_form()
{
    if (annee.value == "") {
        return true
    }
    if (!siAnneValid(Number(annee.value))) {
        annee.classList.remove('border-gray-500')
        annee.classList.add('border-red-500')
        annee_erreur.textContent= 'l\'annee n\'est pas valide!'
        annee_erreur.classList.add('todo-erreur')
        return false
    }
    else
    {
        annee.classList.add('border-gray-500')
        annee.classList.remove('border-red-500')
        annee_erreur.textContent= ''
        annee_erreur.classList.remove('todo-erreur')
        return true
    }
}


function AllFormInputsAreValid()
{
    if (ValidateTitle_form() && ValidateAuteur_form() && ValidateYear_form()) {
        return true;
    }
    else
    {
        return false;
    }
}

function ReturnFormInputs_object()
{
    const livre = {
        id: new Date().getTime(),
        titre: '',
        auteur: '',
        annee: 0,
        genre: '',
        statu: 'a-lire',
        description: '',

    }

    livre.titre = titre.value
    livre.auteur = auteur.value
    livre.annee = annee.value
    livre.genre = genre.value
    livre.statu = status.value
    livre.description = description.value
    return livre
}

function ValidateTitle_dialog()
{
    
    if (!isNameValid(modifier_titre.value, 1, 999)) {
        modifier_titre.classList.remove('border-gray-500')
        modifier_titre.classList.add('border-red-500')
        modifier_titre_erreur.textContent= 'le nom entree n\'est pas valide!'
        modifier_titre_erreur.classList.add('todo-erreur')
        return false
        
    }
    else
    {
        modifier_titre.classList.add('border-gray-500')
        modifier_titre.classList.remove('border-red-500')
        modifier_titre_erreur.textContent= ''
        modifier_titre_erreur.classList.remove('todo-erreur')
        return true
    }
}
function ValidateAuteur_dialog()
{
    if (!isNameValid(modifier_auteur.value, 1, 999)) {
        modifier_auteur.classList.remove('border-gray-500')
        modifier_auteur.classList.add('border-red-500')
        modifier_auteur_erreur.textContent= 'le nom d\'auteur n\'est pas valide!'
        modifier_auteur_erreur.classList.add('todo-erreur')
        return false
    }
    else
    {
        modifier_auteur.classList.add('border-gray-500')
        modifier_auteur.classList.remove('border-red-500')
        modifier_auteur_erreur.textContent= ''
        modifier_auteur_erreur.classList.remove('todo-erreur')
        return true
    }
}
function ValidateYear_dialog()
{
    if (modifier_annee.value == "") {
        return true
    }
    if (!siAnneValid(Number(modifier_annee.value))) {
        modifier_annee.classList.remove('border-gray-500')
        modifier_annee.classList.add('border-red-500')
        modifier_annee_erreur.textContent= 'l\'annee n\'est pas valide!'
        modifier_annee_erreur.classList.add('todo-erreur')
        return false
    }
    else
    {
        modifier_annee.classList.add('border-gray-500')
        modifier_annee.classList.remove('border-red-500')
        modifier_annee_erreur.textContent= ''
        modifier_annee_erreur.classList.remove('todo-erreur')
        return true
    }
}
function AllDialogInputsAreValid()
{
    if (ValidateAuteur_dialog() && ValidateTitle_dialog() && ValidateYear_dialog()) {
        return true;
    }
    else
    {
        return false;
    }
}
function InitDialogInputs(obj)
{
    modifier_titre.value = obj.titre
    modifier_auteur.value = obj.auteur
    modifier_annee.value = obj.annee
    modifier_genre.value = obj.genre
    modifier_status.value = obj.statu
    modifier_description.value = obj.description

}
function ReturnDialogInputs_object()
{
    return {
        titre: modifier_titre.value,
        auteur: modifier_auteur.value,
        annee: modifier_annee.value,
        genre: modifier_genre.value,
        statu: modifier_status.value,
        description: modifier_description.value,
    }
}
modifier_titre.addEventListener('focusout', ValidateTitle_dialog)
modifier_auteur.addEventListener('focusout', ValidateAuteur_dialog)
modifier_annee.addEventListener('focusout', ValidateYear_dialog)

titre.addEventListener('focusout', ValidateTitle_form)
auteur.addEventListener('focusout', ValidateAuteur_form)
annee.addEventListener('focusout', ValidateYear_form)



export {AllFormInputsAreValid}
export {ReturnFormInputs_object}

export{AllDialogInputsAreValid}
export {ReturnDialogInputs_object}
export {InitDialogInputs}
