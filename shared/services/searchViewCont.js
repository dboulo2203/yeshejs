// *** Shared ressources
import { getAppPath } from '../services/commonFunctions.js'
import { getSelectFromDatabaseList } from '../yesheServices/yesheListsService.js'

/**
 * Display the menu bar of the appplication 
 * @param {*} htlmPartId 
 */
export function searchViewDisplay(htlmPartId) {

    let menuString = `
    <div id="menuPart" style="margin-top:60px; margin-bottom:20px">
        <div class="flex justify-content-center " style="padding:0px">
            <div class="input-group mb-3">

                <input type="text" class="form-control" placeholder="" id="searchInputString" aria-label="" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="searchBtn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                    </svg>
                </button>
                <button class="btn btn-outline-secondary " data-bs-toggle="button" type="button" id="searchBtn" data-toggle="tooltip" title="Recherche prédictive">
                    Predic.
                </button>
               <button class="btn btn-outline-secondary " data-bs-toggle="collapse" href="#collapseExample" id="searchBtn" data-toggle="tooltip" title="Recherche multi-crières">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-checklist" viewBox="0 0 16 16">
                <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
                <path d="M7 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 1 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0M7 9.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-1.496-.854a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0l-.5-.5a.5.5 0 0 1 .708-.708l.146.147 1.146-1.147a.5.5 0 0 1 .708 0"/>
                </svg>
                </button>


             <!-- <button class="btn btn-outline-secondary" type="button" id="searchBtn">Muti-criteria</button> -->
            </div>
        </div>
        <div class="collapse" id="collapseExample">
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
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Person</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label fs-6" ><small>Keyword</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Publisher</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Owner</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="">
                                </div>
                            </div>

                             <!--<div class="form-group form-check row">
                                <button type="submit" class="btn btn-secondary">Submit</button>
                        </div> -->
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
                                     <select class="form-select form-select-sm"  aria-label="Default select example" id="bdd_genre_type">
                                    ${getSelectFromDatabaseList("bdd_theme_type", "them_id", "them_name")}
                                    </select>
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Mat type</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label for="exampleInputPassword1" class="col-sm-3 col-form-label" ><small>Language</small></label>
                                <div class="col-sm-9">
                                    <input type="text" class="form-control form-control-sm" id="exampleInputPassword1" placeholder="">
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


    getSelectFromDatabaseList("bdd_genre_type", "genrt_id", "genrt_id", "genrt_name")
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

    // *** Actions
    document.querySelector("#searchBtn").onclick = function () {
        let searchString = document.querySelector("#searchInputString").value;
        window.location.href = `${getAppPath()}/views/search/search.html?searchStr=` + searchString;
    };

    // *** Actions
    document.querySelector("#searchMultiBtn").onclick = function () {
        // let searchString = document.querySelector("#searchInputString").value;
        let multiCriteriatri = 'titl:' + document.querySelector("#inputTitles").value;

        window.location.href = `${getAppPath()}/views/search/search.html?multiCritSearchStr=` + multiCriteriatri;
    };


    // document.querySelector("#mainNav").onclick = function () {
    //     window.location.href = `${getAppPath()}/index.html`;
    // };

    // document.querySelector("#LoginBtn").onclick = function () {
    //     loginViewDisplay("mainActiveSection")
    // };

}