export const catalogPart = `  
    TEst Web component
    <time-formatted id="elem" day="numeric" hour="numeric" minute="numeric" second="numeric" testatt="Atribut de test"></time-formatted>
    <div class="row">
        <div class="col-md-4 menu" style="padding:10px" id="categoryDisplay">
        </div>
        <div class="col-md-8 main" style="padding:10px" id="mainDisplay">
        </div>
    </div>
`;

import { displayCategoriesRender } from './categoriesViewCont.js'

/**
 * Main catalog function 
 * @param {*} htlmPartId Display catalog in dom element with id = htlmPartId
 */
export function testCompController(htlmPartId) {

    class TimeFormatted extends HTMLElement { // (1)

        render() {
            let date = new Date(this.getAttribute('datetime') || Date.now());

            this.innerHTML =
                // *** Get attribute given in the component declaration
                this.getAttribute('testatt') + "</br>" +
                new Intl.DateTimeFormat("default", {
                    year: this.getAttribute('year') || undefined,
                    month: this.getAttribute('month') || undefined,
                    day: this.getAttribute('day') || undefined,
                    hour: this.getAttribute('hour') || undefined,
                    minute: this.getAttribute('minute') || undefined,
                    second: this.getAttribute('second') || undefined,
                    timeZoneName: this.getAttribute('time-zone-name') || undefined,
                }).format(date);
        }

        connectedCallback() { // (2)
            if (!this.rendered) {
                this.render();
                this.rendered = true;
            }
        }


        static get observedAttributes() { // (3)
            return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
        }

        attributeChangedCallback(name, oldValue, newValue) { // (4)
            this.render();
        }

        testComponentFunction() {
            return 'testComponentFunction';
        }

    }

    // Define the element
    customElements.define("time-formatted", TimeFormatted); // 

    // *** Display main part of the catalog screen
    document.getElementById(htlmPartId).innerHTML = catalogPart;

    // *** GEnerate an event each 1000   
    setInterval(() => elem.setAttribute('datetime', new Date()), 1000);
    // displayCategoriesRender("categoryDisplay");

    // *** Call a function in a component
    console.log(document.getElementById('elem').testComponentFunction());

    // *** Set and get attribute
    document.getElementById('elem').setAttribute('myattribute', 'Valeur de test');

    console.log(document.getElementById('elem').getAttribute('myattribute'));

}



