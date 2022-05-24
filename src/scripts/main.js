//Import functions from other modules for use in main.js
import { deleteRequest, fetchCompletions, fetchPlumbers, fetchRequests } from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"




//Assign main element to a variable
const mainContainer = document.querySelector("#container")

//Renders all HTML to the DOM
const render = () => {
    fetchRequests()
        .then(() => fetchPlumbers())
        .then(() => fetchCompletions())
        .then(       // call this function, then...
            () => {
                mainContainer.innerHTML = SinkRepair()      // ...render HTML from this function
            }
        )
}

//Invoke render function / function call
render()

//Main element event listener (render HTML again)
mainContainer.addEventListener(
    "stateChanged",     // custom event (look in dataAccess.js)
    customEvent => {
        render()        //re-calls function
    }
)

//Click event listener (deletes request from database on click) 
mainContainer.addEventListener(
    'click',
    (clickEvent) => {
        const clickedItem = clickEvent.target
        if (clickedItem.id.startsWith('request--')) {
            const [, requestId] = clickedItem.id.split("--")

            deleteRequest(parseInt(requestId))
        }
    }
)