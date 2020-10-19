import { AppClient, InstanceOptions, IOContext  } from '@vtex/api'

interface LiveUsersProduct {
    slug: string
    liveUsers: number
}

//AppClient is a base class containing features and configurations for secure communication within the app
export default class Analytics extends AppClient {
    
    //clients need to define a constructor
    constructor(context: IOContext, options?: InstanceOptions) {
        super('vtex.mocked-analytics@0.x', context, options)
    }

    //clients need to define one method
    public getLiveUsers(): Promise<LiveUsersProduct[]> {
        return this.http.get('_v/live-products')
     }
}
