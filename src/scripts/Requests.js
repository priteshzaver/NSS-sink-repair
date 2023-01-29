import { getPlumbers, getRequests, saveCompletions, getCompletions } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
            const timestamp = Date.now()
            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = { 
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: timestamp
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
            saveCompletions(completion)
        }
    }
)

/*
export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()
    let html = `
        <ul>
            ${requests.map(request => {
                return `
                    <select class="plumbers" id="plumbers">
                    <option value="">Choose</option>
                    ${plumbers.map(plumber => {
                        return `
                        <option value="${request.id}--${plumber.id}">${plumber.name}</option>
                        `}
                        ).join("")
                    }
                    </select>
                    <li>
                    ${request.description}
                    <button class="request__delete"
                        id="request--${request.id}">
                        Delete
                    </button>
                    </li>`
                }).join("")
            }
        </ul>
    `
    
    return html
}
*/

/*
const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()
    let htmlString = ""
    completions.map(completion => {
        if(completion.requestId === request.id) {
            htmlString = `
                        <li class="done">
                            ${request.description}
                            <button class="request__delete" id="request--${request.id}">
                            Delete
                            </button>
                        </li>
                        `
        }
        else {
            htmlString = `
                        <li>
                            ${request.description}
                            <select class="plumbers" id="plumbers">
                            <option value="">Choose</option>
                            ${plumbers.map(plumber => {
                                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
                            }
                            ).join("")
                            }
                            </select>
                            <button class="request__delete" id="request--${request.id}">
                                Delete
                            </button>
                        </li>
                        `
        }
    })
    return htmlString

}
*/

const convertRequestToListElement = (request) => {
    const plumbers = getPlumbers()
    const completions = getCompletions()
    let htmlString = ""

    htmlString = `
        <li>
            ${request.description}
            <select class="plumbers" id="plumbers">
            <option value="">Choose</option>
            ${plumbers.map(plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
            ).join("")
            }
            </select>
            <button class="request__delete" id="request--${request.id}">
                Delete
            </button>
        </li>
        `
    completions.map(completion => {
            if(completion.requestId === request.id) {
                htmlString = `
                            <li class="done">
                                ${request.description}
                                <button class="request__delete" id="request--${request.id}">
                                Delete
                                </button>
                            </li>
                            `
            }
        }
    )
    return htmlString
}
export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(convertRequestToListElement).join("")
            }
        </ul>
    `

    return html
}