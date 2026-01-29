import { languageIcon, noteIcon, abstractIcon, toDKLLibraryIcon, subnoticeIcon, bookIcon, personIcon, keyIcon, copiesIcon, multimediaIcon, descriptionIcon, publicationIcon, titleIcon } from '../../shared/assets/constants.js'

import { getList } from '../../shared/yesheServices/yesheListsService.js'
import { addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
export function displayField(fieldName, fieldValue) {
    return `<div class="col-md-12 main"  > <span class="fw-light" >${fieldName}</span> : ${fieldValue}</div>`;
}
export function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
}

/**
 * 
 */
export class BlocTitleDisplay extends HTMLElement {
    connectedCallback() {
        let iconString;
        let userName = this.getAttribute("userName");
        let userIcon = this.getAttribute("userIcon");
        if (userIcon.length == 0)
            iconString = ''
        else
            iconString = eval(userIcon);
        this.innerHTML = `<div style="margin-top:10px"><span class="fs-5" style="color:#8B2331">` + iconString + ' ' + userName + `</span></div>
        <hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:0px" />`;
    }
}

export class StandardFieldDisplay extends HTMLElement {
    connectedCallback() {

        let fieldName = this.getAttribute("fieldName");
        let fieldValue = this.getAttribute("fieldValue");
        this.innerHTML = `<div class="col-md-12 main"  > <span class="fw-light" >${fieldName}</span> : ${fieldValue}</div>`;
    }
}

export class StandardFieldNotNullDisplay extends HTMLElement {
    connectedCallback() {

        let fieldName = this.getAttribute("fieldName");
        let fieldValue = this.getAttribute("fieldValue");
        if (fieldValue !== null && fieldValue !== "")
            this.innerHTML = `<div class="col-md-12 main"  > <span class="fw-light" >${fieldName}</span> : ${fieldValue}</div>`;
    }
}


// export class blocTitleDisplay extends HTMLElement {
//     connectedCallback() {
//         let titleText = this.getAttribute("titleText");
//         let titleIcon = this.getAttribute("fieldValue");

//         connectedCallback() {
//             this.innerHTML = `
// <div class="d-flex" style="padding-top:0px">
//                 <div class="flex-grow-1"><span class="fs-5" style="color:#8B2331">${titleIcon} ${title}</span></div>
//                 <div class="" style="cursor: pointer">
//                      <!-- <div class="dropdown">
//                       <a class="btn" href="#" data-bs-toggle="dropdown" aria-expanded="false" role="button">${threedotsvertical}  </a>
//                         <ul class="dropdown-menu bg-light-subtle" style="padding:10px;width:250px">
//                             <li id=""><span>${addOrderIcon} Outil prestation stage</span></li>
//                             <li id=""><span>${addOrderIcon} Outil prestation retraite</span></li>
//                             <li><hr class="dropdown-divider"></li>
//                             <li id=""><span>${bedIcon} Ajouter un hébergement</span></li>
//                             <li id=""><span>${mealIcon} Ajouter un repas</span></li>
//                             <li id=""><span>${addOrderIcon} Ajouter une adhésion</span></li>
//                             <li><hr class="dropdown-divider"></li>
//                             <li id=""><span>${plussquareIcon} Ajouter un produit</span></li>
//                         </ul>
//                     </div> -->
//                 </div>
//             </div>
//             <hr style = "margin-block-start:0.3rem;margin-block-end:0.3rem;margin-top:0px" />';

//     }
// }



/* <div class="form-group row" style="margin-bottom:5px">
    <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >
        <span id="deleteMaterielSelection" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove Materiel selection">`<i class="bi bi-x"></i>`;</span>
        Material type
    </label>
    <div class="col-sm-9 ">
        <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="inputMateriel_span" selectedId=""> </span>
        <ul class="dropdown-menu" id="">
            ${getSelectFromDatabaseListDropdown("bdd_materiel_type", "matt_id", "matt_name", true)}
        </ul>
    </div>
</div> */

export class DropdownChoice extends HTMLElement {
    constructor() {

        super();
        this.bdd_genre_type = `[{"genrt_id":5,"genrt_name":"biography/hagiography","genrt_note":null},{"genrt_id":1,"genrt_name":"canonical text","genrt_note":null},{"genrt_id":9,"genrt_name":"collected works /gsung bum /mdzod","genrt_note":null},{"genrt_id":15,"genrt_name":"conference proceedings / recordings","genrt_note":null},{"genrt_id":10,"genrt_name":"dictionary/encyclopaedia","genrt_note":null},{"genrt_id":14,"genrt_name":"essay /thesis/study","genrt_note":null},{"genrt_id":20,"genrt_name":"fiction","genrt_note":null},{"genrt_id":12,"genrt_name":"grammar","genrt_note":null},{"genrt_id":17,"genrt_name":"image-book","genrt_note":null},{"genrt_id":25,"genrt_name":"interview","genrt_note":null},{"genrt_id":23,"genrt_name":"letter","genrt_note":null},{"genrt_id":11,"genrt_name":"lexicon/index/bibliography/catalogue","genrt_note":null},{"genrt_id":13,"genrt_name":"manual","genrt_note":null},{"genrt_id":22,"genrt_name":"musical","genrt_note":null},{"genrt_id":0,"genrt_name":"nd","genrt_note":null},{"genrt_id":21,"genrt_name":"non-fiction documentary","genrt_note":null},{"genrt_id":7,"genrt_name":"novel/tales/comics","genrt_note":null},{"genrt_id":24,"genrt_name":"oral teaching / transcript","genrt_note":null},{"genrt_id":18,"genrt_name":"periodical publication","genrt_note":null},{"genrt_id":6,"genrt_name":"poetry/songs","genrt_note":null},{"genrt_id":19,"genrt_name":"program ","genrt_note":null},{"genrt_id":3,"genrt_name":"religious/philosophical literature","genrt_note":null},{"genrt_id":4,"genrt_name":"ritual/prayer","genrt_note":null},{"genrt_id":2,"genrt_name":"sastra /commentary /treatise","genrt_note":null},{"genrt_id":8,"genrt_name":"travel literature/guide books","genrt_note":null}]`;

        this.div = document.createElement('div');
        this.div.id = "divid";
        this.appendChild(this.div);
    }

    // connect component
    /**
     * Cette fonction est appelée lorsque le composant
     *  web est ajouté à un DOM (Document Object Model). Elle doit exécuter tout rendu nécessaire.
     */
    connectedCallback() {

        this.id = this.getAttribute("id");
        this.listname = this.getAttribute("listname");
        this.listitemid = this.getAttribute("listitemid");
        this.listitemname = this.getAttribute("listitemname");
        this.listselecteditemidInit = this.getAttribute("listselecteditemid");
        this.selecteditemid = this.getAttribute("listselecteditemid");
        this.listlabel = this.getAttribute("listlabel");
        this.getfunction = this.getAttribute("getfunction");


        this.selectedItemName = ''

        // this.innerHTML = `Hello ${this.name}!`;
        // this.button = document.createElement('button');
        // this.button.innerText = "Click me" + this.id;
        // this.button.id = "ertyu";
        // this.button.addEventListener('click', () => {
        //     const event = new CustomEvent('onClick');
        //     this.dispatchEvent(event);

        // });
        this.updateDisplay();

    }
    /**
     * handle the choice of the user 
     */
    handleClickChangeChoice(id, name) {
        // alert(`Button clicked! Value: ${this.myValue}`);
        this.selecteditemid = id
        this.selectedItemLabel = name
        this.updateDisplay();
    }
    /**
     * handle the choice of the user 
     */
    handleClickRemove() {
        // alert(`Button clicked! Value: ${this.myValue}`);
        this.selecteditemid = ''
        this.selectedItemLabel = ''
        this.updateDisplay();
    }

    /**
     * Main update 
     * @param {} listName 
     * @param {*} entityID 
     * @param {*} entityName 
     * @param {*} addZeroOption 
     * @param {*} selectedId 
     * @returns 
     */
    updateDisplay() {
        let listlabel = this.listlabel
        let listName = this.listname
        let entityID = this.listitemid
        let entityName = this.listitemname
        let addZeroOption = false
        let selectedId = this.selecteditemid
        let getfunction = this.getfunction;

        let outpuStr = ``;
        // if (addZeroOption)
        //     outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

        outpuStr = `
           <div class="form-group row" style="margin-bottom:5px">
               <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >
                   <span id="delete_${listName}" style="cursor: pointer" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Remove">
                   <i class="bi bi-x"></i></span>
                   ${listlabel}
               </label>
               <div class="col-sm-9 ">                 
                       ${this.getDropdownContent(listName, entityID, entityName, addZeroOption, selectedId, getfunction)}
                   
               </div >
           </div >`;

        this.innerHTML = outpuStr;
        // ** Event Handler click on the list
        // Use arrow function to preserve `this`
        addMultipleEnventListener(".bdd_genre_type_item", (event) => {
            //  document.querySelector("#bdd_genre_type_inputspan").innerHTML = event.target.attributes['selectedName'].nodeValue;
            //  document.querySelector("#bdd_genre_type_inputspan").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);

            //  ❌ If you use a normal function, `this` will be undefined or point to the button
            this.handleClickChangeChoice(event.target.attributes['selectedId'].nodeValue, event.target.attributes['selectedName'].nodeValue);
        })

        document.querySelector(`#delete_${listName}`).addEventListener('click', (event) => {
            //  ❌ If you use a normal function, `this` will be undefined or point to the button
            this.handleClickRemove();
        });
        //    document.querySelector("#toDKLLibraryButton").onclick = function () {
        //     };
    }

    getDropdownContent(listName, entityID, entityName, addZeroOption, selectedId, getfunction) {
        let outpuStr = `<ul class="dropdown-menu" id="">`;
        let selectedItem = null
        if (addZeroOption)
            outpuStr += `<li><a class="dropdown-item ${listName}_item" selectedId="0" selectedName=""> --- </a> </li>`;

        // TODO : Check if eval(function ) is ok
        let list = eval(getfunction);
        list.map((listentity, index) => {
            if (listentity[entityID] == selectedId) {
                selectedItem = listentity;
                this.selecteditemid = listentity[entityID];
                this.selectedItemLabel = listentity[entityName];

            }
            outpuStr += `<li><a class="dropdown-item ${listName}_item " selectedId="${listentity[entityID]}" selectedName="${listentity[entityName]}">${listentity[entityName]}</a></li>`;

        });
        outpuStr += '</ul >'
        if (selectedId) {
            if (selectedItem !== null)
                outpuStr += `<span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" 
    data-bs-toggle="dropdown" id="${listName}_inputspan" selectedId="${selectedItem[entityID]}">${selectedItem[entityName]} </span>`
            else
                outpuStr += `<span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" 
    data-bs-toggle="dropdown" id="${listName}_inputspan" selectedId=""> </span>`
        } else {
            outpuStr += `<span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" 
    data-bs-toggle="dropdown" id="${listName}_inputspan" selectedId=""> </span>`

        }
        return outpuStr;
    }
    // *** Getters }
    get selectedID() {
        return this.selecteditemid;
    }
    get selectedLabel() {
        return this.selectedItemLabel;
    }

    // Observe the "selecteditemid" attribute
    static get observedAttributes() {
        return ['selecteditemid'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'selecteditemid' && oldValue !== newValue) {
            this.selecteditemid = newValue;
            this.updateDisplay();
        }
    }
}

