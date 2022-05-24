
//Application state object to hold temporary state/transient 
//Initial value must be empty array
const applicationState = {
    requests: [],
    plumbers: []
}

//Assign main container to variable (same as main.js)
const mainContainer = document.querySelector("#container")

//Assign API to variable
const API = "http://localhost:8088"

//Fetch existing requests from API
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

//Getter function to return transient state copy of requests from applicationState
export const getRequests = () => {
    return applicationState.requests.map(request => ({ ...request }))
}

//Send new requests to API
export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST", //Tells the API to create something new
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }

    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

//Delete existing request in API (must take primary key as argument)
export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}

//Fetch the plumbers folder from the API
export const fetchPlumbers = () => {
    return fetch(`${API}/plumbers`)
        .then(response => response.json())
        .then(
            (data) => {
                applicationState.plumbers = data
            }
        )
}


export const getPlumbers = () => {
    return applicationState.plumbers.map(plumber => ({ ...plumber }))
}

export const saveCompletions = (completionObj) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(completionObj)
    }

    return fetch(`${API}/completions`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const fetchCompletions = () => {
    return fetch(`${API}/completions`)
        .then(resource => resource.json())
        .then(
            (completions) => {
                applicationState.completions = completions
            }
        )
}
