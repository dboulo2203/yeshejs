// *** Shared ressources
import { getAppPath, getLinkWithctrl, initBootstrapTooltips, addMultipleEnventListener } from '../../shared/services/commonFunctions.js'
import { getSelectFromDatabaseList, getSelectFromDatabaseListDropdown } from '../../shared/yesheServices/yesheListsService.js'
import { predictiveIcon, searchIcon, multicritIcon } from '../../shared/assets/constants.js';
import { getSearch } from '../../views/search/searchService.js'
import { getPersonsFromAliasName } from '../../shared/yesheServices/yeshePersonService.js'
import { getKeywordsFromAliasName } from '../../shared/yesheServices/yesheKeywordService.js'
import { getPublishersFromName } from '../../shared/yesheServices/yeshePublisherService.js'
/**
 * Display the menu bar of the appplication 
 * @param {*} htlmPartId 
 */
export function searchViewDisplay(htlmPartId) {
    // <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="bibliographic sub-record found by id" >
    let menuString = `
    <div id="menuPart" style="margin-top:60px; margin-bottom:20px">
        <div class="flex justify-content-center " style="padding:0px">
        <div id="messagebox"></div>
            <div class="input-group mb-3">

                <input type="text" class="form-control" placeholder="" id="searchInputString" aria-label="" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="searchBtn">
                    ${searchIcon}
                </button>
               <button class="btn btn-outline-secondary " data-bs-toggle="collapse" href="#collapsePredictive" id="searchBtn" >
                    <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Predictive search" >${predictiveIcon}</span>
                </button>
               <button class="btn btn-outline-secondary " data-bs-toggle="collapse" href="#collapseMulti" id="searchBtn">
                    <span data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Multicriteria search" > ${multicritIcon}</span>
               </button>


             <!-- <button class="btn btn-outline-secondary" type="button" id="searchBtn">Muti-criteria</button> -->
            </div>
        </div>
            <div class="collapse" id="collapsePredictive">
                <div class="card card-body">
                    <span class="fs-6" style="color:#8B2331">Predictive Search</span>
                    <input type="text" class="form-control" placeholder="" id="predictive" aria-label="" list="domninique" aria-describedby="button-addon2">
                </div>
            </div>

        <div class="collapse" id="collapseMulti">
            <div class="card card-body">
            <span class="fs-6" style="color:#8B2331">Multicriteria Search</span>
                <form>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="inputTitles" class="col-sm-3 col-form-label">Titles</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control " id="inputTitles" aria-describedby="emailHelp" placeholder="">
                                </div>
                            </div>
                            
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="inputPerson" class="col-sm-3 col-form-label" >Person</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control " id="inputPerson" list="inputPersonList" placeholder="">
                                    <span class="fs-sm" id="inputPerson_span"></span>
                                </div>
                            </div>

                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="inputKeyword" class="col-sm-3 col-form-label fs-6" >Keyword</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control " id="inputKeyword" list="inputKeywordList" placeholder="">
                                    <span class="fs-sm" id="inputKeyword_span"></span>
                                </div>

                            </div>
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="inputPublisher" class="col-sm-3 col-form-label" >Publisher</label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control " id="inputPublisher" list="inputPublisherList" placeholder="">
                                      <span class="fs-sm" id="inputPublisher_span"></span>
                                </div>
                            </div>
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >Owner</label>
                                <div class="col-sm-9 ">
                                    <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="inputOwner_span" selectedId=""> </span>
                                    <ul class="dropdown-menu" id="">
                                        ${getSelectFromDatabaseListDropdown("bdd_exemplaire_owners", "exow_id", "exow_name", true)}
                                    </ul>                             
                                </div>                            
                            </div>

 
                         </div>
                        <div class="col-md-6">
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="exampleInputEmail1" class="col-sm-3 col-form-label">Genre</label>
                                
                               <div class="col-sm-9 ">
                                    <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="inputGenre_span" selectedId=""> </span>
                                    <ul class="dropdown-menu" id="">
                                        ${getSelectFromDatabaseListDropdown("bdd_genre_type", "genrt_id", "genrt_name", true)}
                                    </ul>                             
                                </div> 
                                                        
                            </div>

                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="exampleInputEmail1" class="col-sm-3 col-form-label">Theme</label>
                                <div class="col-sm-9 ">
                                    <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="inputTheme_span" selectedId=""> </span>
                                    <ul class="dropdown-menu" id="">
                                        ${getSelectFromDatabaseListDropdown("bdd_theme_type", "them_id", "them_name", true)}
                                    </ul>                             
                                </div>                            
                            </div>
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >Mat type</label>
                                <div class="col-sm-9 ">
                                    <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="inputMateriel_span" selectedId=""> </span>
                                    <ul class="dropdown-menu" id="">
                                        ${getSelectFromDatabaseListDropdown("bdd_materiel_type", "matt_id", "matt_name", true)}
                                    </ul>                             
                                </div>                            
                            </div>
                            <div class="form-group row" style="margin-bottom:5px">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" >Language</label>
                                <div class="col-sm-9 ">
                                    <span class="dropdown-toggle" type="button" style="width:100%;border-bottom:solid 0.05rem #e9e8e8" type="button" data-bs-toggle="dropdown" id="inputLanguage_span" selectedId=""> </span>
                                    <ul class="dropdown-menu" id="">
                                        ${getSelectFromDatabaseListDropdown("bdd_language", "lang_id", "lang_name", true)}
                                    </ul>                             
                                </div>                            
                            </div>
                            <div class="form-group form-check row">                               
                                <label class="form-check-label" for="exampleCheck1">With multimedia</label>
                                <input type="checkbox" class="form-check-input form-control-sm" id="withMultimedia">
                            </div>
                            <div class="form-group form-check row">
                                <div class="d-flex flex-row-reverse">                               
                                    <button class="btn btn-outline-secondary" type="button" id="searchMultiBtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                        </svg>
                                        Multicriteria Search
                                    </button>
                                </div>
                            </div>
                       
                        </div>
                    </div>
            </form>
         </div>
        </div>
    </div>
 `;
    //                                    <ul class="dropdown-menu" id="bdd_genre_type">
    //                              < !-- < select class="form-select form-select-sm"  aria - label="Default select example" id = "bdd_genre_type" > -->
    // ${ getSelectFromDatabaseListDropDown("bdd_genre_type", "genrt_id", "genrt_name", true) }
    //                             < !-- </select > -->
    //                             </ul >


    // *** Display the search area
    document.querySelector(htlmPartId).innerHTML = menuString;

    // *** Init tooltips, must be done after elements initialisation
    initBootstrapTooltips();


    // *** Search natural and database
    document.querySelector("#searchInputString").addEventListener("keypress", function (event) {
        let searchString = document.querySelector("#searchInputString").value;
        if (event.keyCode === 13) {
            window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + searchString;
        }
    });

    // *** Actions Natural language search or datbase search
    document.querySelector("#searchBtn").onclick = function () {
        if (!document.querySelector("#searchInputString").value.length > 0) {
            document.querySelector("#messagebox").innerHTML = `<div class="alert alert-danger" style = "margin-top:30px" role = "alert" > Veuillez saisir un critère de recherche</div > `;
            return;
        }
        let searchString = document.querySelector("#searchInputString").value;
        window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + searchString;


    };

    // ******************* Multi criteria search 
    document.querySelector("#searchMultiBtn").onclick = function () {
        // let searchString = document.querySelector("#searchInputString").value;
        //  let multiCriteriatri = 'titl:' + document.querySelector("#inputTitles").value;
        // let bdd_genre_type = document.querySelector("#bdd_genre_type").value;

        let test = document.querySelector("#inputPerson_span");
        var multictri = '';
        if (document.querySelector("#inputTitles").value.length > 0)
            multictri += 'titl:' + document.querySelector("#inputTitles").value;
        if (document.querySelector("#inputPerson_span").getAttribute("idPerson") > 0)
            multictri += '|pers:' + document.querySelector("#inputPerson_span").getAttribute("idPerson");

        if (document.querySelector("#inputKeyword_span").getAttribute("idKeyword") > 0)
            multictri += '|keyw:' + document.querySelector("#inputKeyword_span").getAttribute("idKeyword");

        if (document.querySelector("#inputPublisher_span").getAttribute("idPublisher") > 0)
            multictri += '|publ:' + document.querySelector("#inputPublisher_span").getAttribute("idPublisher");

        // if ($scope.advancedSearch.publisher > 0)
        //     multictri += '|publ:' + $scope.advancedSearch.publisher;
        if (document.querySelector("#inputOwner_span").attributes['selectedId'].nodeValue > 0)
            multictri += '|owne:' + document.querySelector("#inputOwner_span").attributes['selectedId'].nodeValue;

        if (document.querySelector("#inputGenre_span").attributes['selectedId'].nodeValue > 0)
            multictri += '|genr:' + document.querySelector("#inputGenre_span").attributes['selectedId'].nodeValue;

        if (document.querySelector("#inputTheme_span").attributes['selectedId'].nodeValue > 0)
            multictri += '|them:' + document.querySelector("#inputTheme_span").attributes['selectedId'].nodeValue;

        if (document.querySelector("#inputMateriel_span").attributes['selectedId'].nodeValue > 0)
            multictri += '|matt:' + document.querySelector("#inputMateriel_span").attributes['selectedId'].nodeValue;

        if (document.querySelector("#inputLanguage_span").attributes['selectedId'].nodeValue > 0)
            multictri += '|lang:' + document.querySelector("#inputLanguage_span").attributes['selectedId'].nodeValue;

        if (document.querySelector('#withMultimedia').checked)
            multictri += '|mult:' + document.querySelector('#withMultimedia').checked;

        if (multictri.length < 4) {
            throw new Error("Please select at least one criteria");
        }

        window.location.href = `${getAppPath()}/views/search/search.html?multiCritSearchStr=` + multictri;
    };

    //************************************************************************** */
    addMultipleEnventListener(".bdd_exemplaire_owners_item", function (event) {
        document.querySelector("#inputOwner_span").innerHTML = event.target.attributes['selectedName'].nodeValue;
        document.querySelector("#inputOwner_span").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);
    })

    addMultipleEnventListener(".bdd_genre_type_item", function (event) {
        document.querySelector("#inputGenre_span").innerHTML = event.target.attributes['selectedName'].nodeValue;
        document.querySelector("#inputGenre_span").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);
    })

    addMultipleEnventListener(".bdd_theme_type_item", function (event) {
        document.querySelector("#inputTheme_span").innerHTML = event.target.attributes['selectedName'].nodeValue;
        document.querySelector("#inputTheme_span").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);
    })

    addMultipleEnventListener(".bdd_materiel_type_item", function (event) {
        document.querySelector("#inputMateriel_span").innerHTML = event.target.attributes['selectedName'].nodeValue;
        document.querySelector("#inputMateriel_span").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);
    })

    addMultipleEnventListener(".bdd_language_item", function (event) {
        document.querySelector("#inputLanguage_span").innerHTML = event.target.attributes['selectedName'].nodeValue;
        document.querySelector("#inputLanguage_span").setAttribute("selectedId", event.target.attributes['selectedId'].nodeValue);
    })
    // document.querySelector("#bdd_genre_typedd").addEventListener('hide.bs.dropdown', () => {
    //     console.log('hide instance method called');
    // })

    // document.querySelector("#bdd_genre_typedd").addEventListener('hidden.bs.dropdown', () => {
    //     console.log('dropdown completely hidden');
    // })


    //********************************************************************************* */
    // *** Person predictive search 
    document.querySelector("#inputPerson").addEventListener('input', async function (event) {
        console.log("Input event  : " + event.target.value + " - " + event.target.id)
        let inputElement = document.querySelector("#inputPerson");

        if (event.target.value.length >= 3) {

            // *** Get result from the database
            let searchLines = await getPersonsFromAliasName(event.target.value);
            if (searchLines && searchLines.length > 0) {
                // *** Fill the datalist
                const datalist = document.createElement('datalist');
                const dataListId = inputElement.getAttribute('list');
                datalist.id = dataListId;

                searchLines.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.id = option.conc_id;
                    optionElement.text = option.concat_name;
                    optionElement.conc_id = option.conc_id;

                    datalist.appendChild(optionElement);
                });
                // *** remove the previous values
                let listElement = document.getElementById(dataListId);
                if (listElement)
                    inputElement.removeChild(listElement);
                let currentdatalist = inputElement.list;
                // *** Put the nex values
                inputElement.appendChild(datalist);
            }
        } else {
            // *** Less than 3 characters, empty the datalist
            console.log("moins 3 de caractères");
            const dataListId = inputElement.getAttribute('list');
            let listElement = document.getElementById(dataListId);
            if (listElement)
                inputElement.removeChild(listElement);
        }
    });

    // *** Keyword predictive search 
    document.querySelector("#inputKeyword").addEventListener('input', async function (event) {
        console.log("Input event  : " + event.target.value + " - " + event.target.id)
        let inputElement = document.querySelector("#inputKeyword");

        if (event.target.value.length >= 3) {

            // *** Get result from the database
            let searchLines = await getKeywordsFromAliasName(event.target.value);
            if (searchLines && searchLines.length > 0) {
                // *** Fill the datalist
                const datalist = document.createElement('datalist');
                const dataListId = inputElement.getAttribute('list');
                datalist.id = dataListId;

                searchLines.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.id = option.conc_id;
                    optionElement.text = option.concat_name;
                    optionElement.conc_id = option.conc_id;

                    datalist.appendChild(optionElement);
                });
                // *** remove the previous values
                let listElement = document.getElementById(dataListId);
                if (listElement)
                    inputElement.removeChild(listElement);
                let currentdatalist = inputElement.list;
                // *** Put the nex values
                inputElement.appendChild(datalist);
            }
        } else {
            // *** Less than 3 characters, empty the datalist
            console.log("moins 3 de caractères");
            const dataListId = inputElement.getAttribute('list');
            let listElement = document.getElementById(dataListId);
            if (listElement)
                inputElement.removeChild(listElement);
        }
    });


    document.querySelector("#inputKeyword").addEventListener('change', function (event) {

        // *** Get the value selected
        let datalist = event.target.list;
        const optionsArray = Array.from(datalist.options);
        let optionFound = optionsArray.filter((option) => option.value === event.target.value);
        let resultOption = optionFound[0];

        // *** Save the selected value
        document.querySelector("#inputKeyword_span").innerHTML = resultOption.text;
        document.querySelector("#inputKeyword_span").setAttribute("idKeyword", resultOption.conc_id);

        // *** Reset search input
        event.target.value = "";

    });

    // *** Publisher predictive search 
    document.querySelector("#inputPublisher").addEventListener('input', async function (event) {
        console.log("Input event  : " + event.target.value + " - " + event.target.id)
        let inputElement = document.querySelector("#inputPublisher");

        if (event.target.value.length >= 3) {

            // *** Get result from the database
            let searchLines = await getPublishersFromName(event.target.value);
            if (searchLines && searchLines.length > 0) {
                // *** Fill the datalist
                const datalist = document.createElement('datalist');
                const dataListId = inputElement.getAttribute('list');
                datalist.id = dataListId;

                searchLines.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.id = option.publ_id;
                    optionElement.text = option.publ_name;
                    optionElement.conc_id = option.publ_id;

                    datalist.appendChild(optionElement);
                });
                // *** remove the previous values
                let listElement = document.getElementById(dataListId);
                if (listElement)
                    inputElement.removeChild(listElement);
                let currentdatalist = inputElement.list;
                // *** Put the nex values
                inputElement.appendChild(datalist);
            }
        } else {
            // *** Less than 3 characters, empty the datalist
            console.log("moins 3 de caractères");
            const dataListId = inputElement.getAttribute('list');
            let listElement = document.getElementById(dataListId);
            if (listElement)
                inputElement.removeChild(listElement);
        }
    });


    document.querySelector("#inputPublisher").addEventListener('change', function (event) {

        // *** Get the value selected
        let datalist = event.target.list;
        const optionsArray = Array.from(datalist.options);
        let optionFound = optionsArray.filter((option) => option.value === event.target.value);
        let resultOption = optionFound[0];

        // *** Save the selected value
        document.querySelector("#inputPublisher_span").innerHTML = resultOption.text;
        document.querySelector("#inputPublisher_span").setAttribute("idPublisher", resultOption.conc_id);

        // *** Reset search input
        event.target.value = "";

    });

    // ******************* Predictive search
    document.querySelector("#predictive").addEventListener('change', function (event) {
        // datalist = this.list;
        // datalist.options = datalist.options.filter((option) => option.value === this.value);
        let result = event.target.value;
        let datalist = event.target.list;
        const optionsArray = Array.from(datalist.options);
        let optionFound = optionsArray.filter((option) => option.value === result);

        // if (optionFound[0] !== null)
        //     throw new Error("Résultat incorrect")
        let resultOption = optionFound[0];
        switch (resultOption.asear_type) {

            case 1, 2, 3, 4, 5:
                getLinkWithctrl(`${getAppPath()}/views/notice/notice.html?noticeID=` + resultOption.asear_id)
                break;
            case 6:
                getLinkWithctrl(`${getAppPath()}/views/subNotice/subNotice.html?subNoticeID=` + resultOption.asear_id)
                break;
            case 10:
                getLinkWithctrl(`${getAppPath()}/views/person/person.html?personID=` + resultOption.asear_id)
                break;
            case 11:
                getLinkWithctrl(`${getAppPath()}/views/keyword/keyword.html?keywordID=` + resultOption.asear_id)
                break;
            case 12:
                getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + resultOption.asear_id + `&simpleEntitytype=12`, event.ctrlKey)
                break;
            case 13:
                getLinkWithctrl(`${getAppPath()}/views/simpleEntity/simpleEntity.html?simpleEntityID=` + resultOption.asear_id + `&simpleEntitytype=13`, event.ctrlKey)
                break;
            case 24:
            case 33:
            case 34:
            case 35:
            case 36:
            case 37:
            default:
                throw new Error("Résultat incorrect");
        }
    });

    document.querySelector("#predictive").addEventListener('input', async function (e) {
        console.log("Input event  : " + e.target.value + " - " + e.target.id)
        let inputElement = document.querySelector("#predictive");

        if (e.target.value.length >= 3) {
            // *** Get result from the database
            let searchLines = await getSearch(e.target.value, "6");
            if (searchLines && searchLines.length > 0) {
                // *** Fill the datalist
                const datalist = document.createElement('datalist');
                const dataListId = inputElement.getAttribute('list');
                datalist.id = dataListId;

                searchLines.forEach((option) => {
                    const optionElement = document.createElement('option');
                    optionElement.id = option.sear_id;
                    optionElement.text = option.sear_display + " (" + option.sear_type + ")";
                    optionElement.asear_id = option.sear_id;
                    optionElement.asear_type = option.sear_type;

                    datalist.appendChild(optionElement);
                });
                // *** remove the previous values
                let listElement = document.getElementById(dataListId);
                if (listElement)
                    inputElement.removeChild(listElement);
                let currentdatalist = inputElement.list;
                // *** Put the nex values
                inputElement.appendChild(datalist);
            }
        } else {
            // *** Less than 3 characters, empty the datalist
            console.log("moins 3 de caractères");
            const dataListId = inputElement.getAttribute('list');
            let listElement = document.getElementById(dataListId);
            if (listElement)
                inputElement.removeChild(listElement);
        }


    });
    document.querySelector("#predictive").addEventListener('keypress', function (e) {
        console.log("keypress event  : " + e.target.value + " - " + e.target.id)
    });

    // });
    //   });
}
//     // document.addEventListener('DOMContentLoaded', function () {
//     const inputs = document.querySelectorAll('input[list]');
//     let input = document.querySelector("#dominique");
//     // inputs.forEach((input) => {
//     // const dataListId = input.getAttribute('list');
//     // const dataOptions = input.dataset[dataListId];
//     // const options = dataOptions.split(',').map((option) => option.trim());

//     const datalist = document.createElement('datalist');
//     const dataListId = input.getAttribute('list');
//     datalist.id = dataListId;

//     let frBase = sessionStorage.getItem("bdd_genre_type");
//     let base = JSON.parse(frBase);


//     base.forEach((option) => {
//         const optionElement = document.createElement('option');
//         optionElement.value = option.genrt_name;
//         optionElement.id = option.genrt_id;
//         optionElement.text = option.genrt_name;;
//         datalist.appendChild(optionElement);
//     });

//     input.appendChild(datalist);
//     // });

//     //  inputs.forEach((input) => {
//     input.addEventListener('change', function () {
//         let optionFound = false,
//             datalist = this.list;

//         const optionsArray = Array.from(datalist.options);
//         optionFound = optionsArray.some((option) => option.value === this.value);

//         if (optionFound) {
//             this.setCustomValidity('');
//         } else {
//             this.setCustomValidity('Please select a valid value.');
//         }
//     });
//     // });
// };

