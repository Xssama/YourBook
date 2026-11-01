// imports

import { AllFormInputsAreValid } from "./validations.js";
import {ReturnFormInputs_object} from "./validations.js"

import { AllDialogInputsAreValid } from "./validations.js";
import { ReturnDialogInputs_object } from "./validations.js";
import {InitDialogInputs} from './validations.js';
//form
let livre_form = document.getElementById('livre-form')
let submit_btn_erreur = document.getElementById('ajouter-livre-erreur')
//table-filter
let trier_btn = document.getElementById('trier-button')
let trier_livres = document.getElementById('trier-livres')
let chercher_input = document.getElementById('cherche-input')
//table
let livre_tableau = document.getElementById('livres-tableau')
let tableau_corps = document.getElementById('livres-tableau-corps')
//localstorage
let livres = JSON.parse(localStorage.getItem('livres')) || []

//dialog
let modifier_dialog = document.querySelector('dialog')
let modifier_livre_erreurP = document.getElementById('modifier-livre-erreur')

let index_to_modify = -1

function AjouterLivreEventHandler(event)
{
    event.preventDefault()
    
    if (!AllFormInputsAreValid()) {
        submit_btn_erreur.textContent = "Veuillez corriger les erreurs signalées avant de soumettre le formulaire."
        
    }
    else
    {
        submit_btn_erreur.textContent = ''
        let livre = ReturnFormInputs_object()
        livres.push(livre)
        localStorage.setItem('livres', JSON.stringify(livres))
        fillTable()
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
    annee_td.textContent = (livre.annee == "" ? "-":livre.annee)
    livre_ligne.appendChild(annee_td)
    
    let genre_td = document.createElement('td')
    genre_td.textContent = (livre.genre == "" ? "-":livre.genre)
    livre_ligne.appendChild(genre_td)
    
    let statu_td = document.createElement('td')
    statu_td.textContent = (livre.statu == "" ? "-":livre.statu)
    livre_ligne.appendChild(statu_td)
    
    let description_td = document.createElement('td')
    description_td.textContent = (livre.description == "" ? "-":livre.description)  
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
function fillTable(tab=livres)
{
    tableau_corps.replaceChildren()

    for (let element of tab) {
        tableau_corps.appendChild(ObjectToDataRow(element))
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

function showdialog(row)
{
    index_to_modify = livres.findIndex(livre => livre.id == Number(row.getAttribute('id')))
    if (index_to_modify < 0) {
        return
    }
    let livre = livres[index_to_modify]
    
    if (livre != null) {
        InitDialogInputs(livre)
        modifier_dialog.showModal()
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
    else 
    {
        let row = button.closest('tr')
        
        showdialog(row)
    }
}

function trierParTitre()
{
    let livrestrier = livres.sort((livreA, livreB) => livreA.titre.localeCompare(livreB.titre) )
    fillTable(livrestrier)
}
function trierParAuteur()
{
    let livrestrier = livres.sort((livreA, livreB) => livreA.auteur.localeCompare(livreB.auteur) )
    fillTable(livrestrier)
}
function trierParAnnee() {
    let livrestrier = livres.sort((livreA, livreB) => Number(livreB.annee) - Number(livreA.annee)  )
    fillTable(livrestrier)
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
function rechercher()
{
    
    let inputValue = chercher_input.value
    let filtredtable = []
    if (inputValue.trim() != "") {
        filtredtable = livres.filter((livre) => livre.titre.toLowerCase().includes(inputValue.toLowerCase()) ||
            livre.auteur.toLowerCase().includes(inputValue.toLowerCase()))
    fillTable(filtredtable)
    }
    else
    {
        fillTable()
    }
}

function ModifierLivreEventHanler()
{
    if (index_to_modify < 0) {
        return
    }
    if (!AllDialogInputsAreValid()) {
        modifier_livre_erreurP.textContent = 'Veuillez corriger les erreurs signalées avant de soumettre le formulaire.'
    }
    else
    {
        modifier_livre_erreurP.textContent = ''
        let obj = ReturnDialogInputs_object()
        console.log(obj);
        
        livres[index_to_modify].titre = obj.titre
        livres[index_to_modify].auteur = obj.auteur
        livres[index_to_modify].annee = obj.annee
        livres[index_to_modify].statu = obj.statu
        livres[index_to_modify].genre = obj.genre
        livres[index_to_modify].description = obj.description

        localStorage.setItem('livres', JSON.stringify(livres))
        modifier_dialog.close()
        console.log('the book is modified succesfully');
        
    }
    
    
}
function HandleDialogEventListener(event)
{
    event.preventDefault()
    let button = event.target.closest('button[data-action="modifier"]' ) || event.target.closest('button[data-action="cancel"]')
    console.log(button);
    if (!button) {
        return;
    }
    if (button.getAttribute('data-action') === 'modifier') {
        ModifierLivreEventHanler()
        fillTable()
    }
    else
    {
        modifier_dialog.close()
    }
}
modifier_dialog.addEventListener('click', HandleDialogEventListener)

chercher_input.addEventListener('input', rechercher)
livre_form.addEventListener('submit', AjouterLivreEventHandler)
fillTable()
livre_tableau.addEventListener('click', TableauActionEvetListener)
trier_btn.addEventListener('click', triertableau)