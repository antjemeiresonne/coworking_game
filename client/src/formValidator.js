export class FormValidator {
    validators = []
    errors = []
    constructor(form) {
        this.form = form
        this.form.addEventListener('submit', (event) => this.onSubmit(event))
        document.querySelector(".errorSummary").setAttribute("aria-hidden", "true")

    }
    addValidator(validator) {
        this.validators.push({
            ...validator,
            field: this.form.elements[validator.name]

        })
    }
    validate() {
        this.errors = []
        this.validators.forEach(validator => {
            if (this.errors.find(error => error.name === validator.name)) {
                return
            }
            if (!validator.method(validator.field)) {
                this.errors.push(validator);
            }
        });
        return this.errors.length === 0;
    }
    onSubmit(event) {
        this.resetSummary()
        this.removeInlineErrors()
        if (!this.validate()) {
            event.preventDefault()
            event.stopImmediatePropagation();
            this.showInlineErrors()
            this.showSummary()
        }

    }
    createInlineError(error) {
        const span = document.createElement("span");
        span.classList.add("field-error");
        span.innerText = `${error.message}`;
        span.setAttribute("id", `${error.name}-error`);
        return span;
    }
    showInlineErrors() {
        this.errors.forEach(error => {
            const errorElement = this.createInlineError(error)
            if (error.field instanceof Node) {
                error.field.classList.add("invalid"),
                    error.field.setAttribute("aria-invalid", "true"),
                    error.field.labels[0].appendChild(errorElement)
            } else if (error.field instanceof NodeList) {
                error.field.forEach(node => {
                    node.classList.add("invalid")
                    node.setAttribute("aria-describedby", "errorElement.id")
                    node.setAttribute("aria-invalid", "true")
                })
                const fieldSet = error.field[0].closest("fieldset")
                const legend = fieldSet?.querySelector("legend")
                if (legend) {
                    legend.appendChild(errorElement)
                }
                document.querySelector(".errorSummary").setAttribute("aria-hidden", "false")

            }
        });
    }
    removeInlineErrors() {
        this.form.querySelectorAll(".field-error").forEach(element => element.remove())
        this.form.querySelectorAll(".invalid").forEach(element => {
            element.removeAttribute("aria-invalid")
            element.removeAttribute("aria-describedby")
            element.classList.remove("invalid")
        })
    }
    showSummary() {
        this.errors.forEach(error => {
            const errorItem = document.createElement('li');
            errorItem.textContent = error.message;
            errorItem.innerHTML = `<a href="#${error.field.id}"> ${error.message} </a>`;
            document.querySelector(".errorSummary ul").appendChild(errorItem);
        });
        document.querySelector(".errorSummary").focus()
        document.querySelector(".errorSummary").setAttribute("aria-hidden", "false")
    }
    resetSummary() {
        const errorList = document.querySelector(".errorSummary ul");
        while (errorList.firstChild) {
            errorList.removeChild(errorList.firstChild);
        }
        document.querySelector(".errorSummary").setAttribute("aria-hidden", "true");
    }

}