
export function displayField(fieldName, fieldValue) {
    return `<div class="col-md-12 main"  > <span class="fw-light" >${fieldName}</span> : ${fieldValue}</div>`;
}

export class StandardFieldDisplay extends HTMLElement {


    constructor() {
        super();
        this.name = "name init value";
        this.id = "123456aa";
        this.icon = "icon init value";

        // this.div = document.createElement('div');
        // this.div.id = "divid";
        // this.appendChild(this.div);
    }

    // components attributes
    static get observedAttributes() {
        return ['name', 'testi'];
    }

    // set name(val) {
    //     this.name = val
    // }
    /**
     * Attribute has changed (by javascript or in HTML )
     * @param {*} property 
     * @param {*} oldValue 
     * @param {*} newValue 
     * @returns 
     */
    attributeChangedCallback(property, oldValue, newValue) {

        console.log(`changing the value of ${name} from ${oldValue} to ${newValue}`);
        if (oldValue === newValue) return;
        this[property] = newValue;

        //    this.updateDisplay();

    }
    // connect component
    /**
     * Cette fonction est appelée lorsque le composant
     *  web est ajouté à un DOM (Document Object Model). Elle doit exécuter tout rendu nécessaire.
     */
    connectedCallback() {

        // let texte = this.getAttribute("name");
        let name = this.getAttribute("name");
        // this.id = "123456aa";
        // this.icony = this.getAttribute("icon")


        // this.innerHTML = `Hello ${this.name}!`;
        // this.button = document.createElement('button');
        this.innerHTML = `<div style=""><span class="fs-5" style="color:#8B2331">` + ` ` + name + `</span></div>`;
        // this.button.id = "ertyu";
        // this.button.addEventListener('click', () => {
        //    const event = new CustomEvent('onClick');
        //    this.dispatchEvent(event);`

        // });
        // this.innerText = "test";
        // this.appendChild(this.button);
    }

    // updateDisplay() {
    //     document.querySelector('hello-world').
    //         this.button.innerText = "Click me updated" + this.name;

    // }


}