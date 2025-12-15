// *** Shared ressources
import { getAppPath, getLinkWithctrl } from '../services/commonFunctions.js'
import { getSelectFromDatabaseList } from '../yesheServices/yesheListsService.js'
import { predictiveIcon, searchIcon, multicritIcon } from '../assets/constants.js';
import { getSearch } from '../../views/search/searchService.js'

/**
 * Display the menu bar of the appplication 
 * @param {*} htlmPartId 
 */
export function searchViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart" style="margin-top:60px; margin-bottom:20px">
        <div class="flex justify-content-center " style="padding:0px">
        <div id="messagebox"></div>
            <div class="input-group mb-3">

                <input type="text" class="form-control" placeholder="" id="searchInputString" aria-label="" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="searchBtn">
                    ${searchIcon}
                </button>
               <button class="btn btn-outline-secondary " data-bs-toggle="collapse" href="#collapsePredictive" id="searchBtn" data-toggle="tooltip" title="Recherche multi-crières">
                    ${predictiveIcon}
                </button>
               <button class="btn btn-outline-secondary " data-bs-toggle="collapse" href="#collapseMulti" id="searchBtn" data-toggle="tooltip" title="Recherche multi-crières">
                    ${multicritIcon}
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
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="inputTitles" class="col-sm-3 col-form-label"><small>Titles</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="inputTitles" aria-describedby="emailHelp" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPerson" class="col-sm-3 col-form-label" ><small>Person</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="inputPerson" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputKeyword" class="col-sm-3 col-form-label fs-6" ><small>Keyword</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="inputKeyword" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="inputPublisher" class="col-sm-3 col-form-label" ><small>Publisher</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="inputPublisher" placeholder="">
                                </div>
                            </div>
 
                         </div>
                        <div class="col-6">
                            <div class="form-group row">
                                <label for="exampleInputEmail1" class="col-sm-3 col-form-label"><small>Genre</small></label>
                                <div class="col-sm-9">
                                     <select class="form-select form-select-sm"  aria-label="Default select example" id="bdd_genre_type">
                                    ${getSelectFromDatabaseList("bdd_genre_type", "genrt_id", "genrt_name")}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                            <label for="exampleInputEmail1" class="col-sm-3 col-form-label"><small>Theme</small></label>
                                 <div class="col-sm-9">
                                     <select class="form-select form-select-sm"  aria-label="Default select example" id="bdd_theme_type">
                                    ${getSelectFromDatabaseList("bdd_theme_type", "them_id", "them_name")}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Mat type</small></label>
                                <div class="col-sm-9">
                                     <select class="form-select form-select-sm"  aria-label="Default select example" id="bdd_matt_type">
                                     </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Language</small></label>
                                <div class="col-sm-9">
                                     <select class="form-select form-select-sm"  aria-label="Default select example" id="bdd_language">
                                    ${getSelectFromDatabaseList("bdd_language", "lang_id", "lang_name")}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group form-check row">                               
                                <label class="form-check-label" for="exampleCheck1"><small>With multimedia</small></label>
                                <input type="checkbox" class="form-check-input form-control-sm" id="exampleCheck1">
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

    //****
    //               <!--  <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"></button>
    // <ul class="dropdown-menu">
    //     <li><a class="dropdown-item" href="#">Standard</a></li>
    //     <!-- <li><a class="dropdown-item" href="#">Database</a></li> -->
    //     <li><a class="dropdown-item" href="#">Predictive</a></li>
    //     <li><hr class="dropdown-divider"></li>
    //     <li><a class="dropdown-item" href="#">Multi-criteria</a></li>
    // </ul>


    // getSelectFromDatabaseList("bdd_genre_type", "genrt_id", "genrt_id", "genrt_name")
    // *** Display the navbar
    document.querySelector(htlmPartId).innerHTML = menuString;

    // *** Add the off canvas menu
    //  leftMenuViewDisplay("leftMenu");

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

    // *** Actions Multi criteria search
    document.querySelector("#searchMultiBtn").onclick = function () {
        // let searchString = document.querySelector("#searchInputString").value;
        let multiCriteriatri = 'titl:' + document.querySelector("#inputTitles").value;

        window.location.href = `${getAppPath()}/views/search/search.html?multiCritSearchStr=` + multiCriteriatri;
    };



    // document.addEventListener('load', function () {
    //     let input = document.querySelector("#predictive");

    //     // *** Load datalist
    //     const datalist = document.createElement('datalist');
    //     const dataListId = input.getAttribute('list');
    //     datalist.id = dataListId;

    //     //  inputs.forEach((input) => {
    //     input.addEventListener('change', function () {
    //         let optionFound = false,
    // datalist = this.list;
    //  datalist.options = datalist.options.filter((option) => option.value === this.value);



    // const optionElement = document.createElement('option');
    // optionElement.id = "9990";
    // optionElement.text = "Ajoute élément";;

    // datalist.appendChild(optionElement);

    // const optionsArray = Array.from(datalist.options);
    // optionFound = optionsArray.filter((option) => option.value === this.value);

    // if (optionFound) {
    //     this.setCustomValidity('');
    // } else {
    //     this.setCustomValidity('Please select a valid value.');
    // }
    //       });

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

//     let frBase = localStorage.getItem("bdd_genre_type");
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

