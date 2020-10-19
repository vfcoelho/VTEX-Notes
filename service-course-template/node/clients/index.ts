import { IOClients } from '@vtex/api'
import Analytics from '../clients/analytics'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
    //registers the analytics client to be used from the Context object by the app handlers
    public get analytics() {
        return this.getOrSet('analytics', Analytics)
    }
}
