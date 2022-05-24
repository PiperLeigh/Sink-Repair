//Import functions from other modules for use in Requests.js
import { getPlumbers, getRequests, saveCompletions } from "./dataAccess.js"


//Define and export function generating HTML for use in main.js
export const Requests = () => {
    const requests = getRequests()  //Assign getter function for requests to variable
    const plumbers = getPlumbers()  //Assign getter function for plumbers to variable
    
    //Construct interpolated HTML
    let html = `
        <ul>
            ${requests.map((request) => {
        return `
                <li>
                    ${request.description}
                    
                    <select class="plumbers" id="plumbers">
    <option value="">Choose</option>
    ${plumbers.map(
            plumber => {
                return `<option value="${request.id}--${plumber.id}">${plumber.name}</option>`
            }
        ).join("")
            }
</select>
                    <button class="request__delete" 
                            id="request--${request.id}">
                        Delete
                    </button>
                </li>
`
    }).join("")
        }
        </ul>
    `

    return html
}


//Assign main container to variable (same as on main.js) 
const mainContainer = document.querySelector("#container")


mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")

            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
            const completion = {
                requestId: parseInt(requestId),
                plumberId: parseInt(plumberId),
                date_created: Date.now()
            }

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */

            saveCompletions(completion)
        }
    }
);