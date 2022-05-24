//Import functions from other modules for use in SinkRepair.js
import { ServiceForm } from "./ServiceForm.js"
import { Requests } from "./Requests.js"


//Define and export function that inserts/combines html created in functions from other modules
export const SinkRepair = () => {
    return `
        <h1>Maude and Merle's Sink Repair</h1>
        <section class="serviceForm">
            ${ServiceForm()}
        </section>
        <section class="serviceRequests">
            <h2>Service Requests</h2>
            ${Requests()}
        </section>
    `
}