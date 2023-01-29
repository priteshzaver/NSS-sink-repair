const applicationState = {
    requests: [],
    plumbers: [],
    completions: []
}

const API = "http://localhost:8088"

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (servicePlumbers) => {
                applicationState.plumbers = servicePlumbers
            }
        )
}
export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(response => response.json())
        .then(
            (serviceCompletions) => {
                applicationState.completions = serviceCompletions
            }
        )
}

export const getRequests = () => {
    return [...applicationState.requests]
}
export const getPlumbers = () => {
    return [...applicationState.plumbers]
}
export const getCompletions = () => {
    return [...applicationState.completions]
}
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests`, fetchOptions)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })

    /* this block of code adds the request to database.json but does not automatically display it. Must refresh.
    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {

        })
    */ 
}

export const deleteRequest = (id) => {
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

export const saveCompletions = (serviceCompletion) => {
    const saveCompletion = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(serviceCompletion)
    }
    const mainContainer = document.querySelector("#container")
    return fetch(`${API}/completions`, saveCompletion)
    .then(response => response.json())
    .then(() => {
        mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
    })
}
