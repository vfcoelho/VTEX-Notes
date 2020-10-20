import { Clients } from '../clients/index'
import { EventContext } from '@vtex/api'
import { COURSE_ENTITY } from '../utils/constants'

export async function updateLiveUsers(ctx: EventContext<Clients>) {
    const liveUsersProducts = await ctx.clients.analytics.getLiveUsers()
    console.log('LIVE USERS: ', liveUsersProducts)

    // this queries a custom master data entity that holds views to a product
    // if the product exists, it increments the view counter
    // if not, it creates the product record
    // You can check the updates by calling a GET to this url: https://api.vtex.com/api/dataentities/course_backend_product_list/search?_fields=slug,count&_schema=v1&an=appliancetheme
    await Promise.all(
        liveUsersProducts.map(async ({ slug, liveUsers }) => {
            try {
                // queries the products
                const [savedProduct] = await ctx.clients.masterdata.searchDocuments<{
                    id: string
                    count: number
                    slug: string
                }>({
                    dataEntity: COURSE_ENTITY,
                    fields: ['count', 'id', 'slug'],
                    pagination: {
                        page: 1,
                        pageSize: 1,
                    },
                    schema: 'v1',
                    where: `slug=${slug}`,
                })
                console.log('SAVED PRODUCT', savedProduct)
                // put the products and its counts
                await ctx.clients.masterdata.createOrUpdateEntireDocument({
                    dataEntity: COURSE_ENTITY,
                    fields: {
                        count: liveUsers,
                        slug,
                    },
                    id: savedProduct?.id,
                    schema: 'v1'
                })
            } catch (e) {
                console.log(`failed to update product ${slug}`)
                console.log(e)
            }
        })
    )

    return true
}