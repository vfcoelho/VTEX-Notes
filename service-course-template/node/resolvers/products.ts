
import { COURSE_ENTITY } from '../utils/constants'

export const productInfo = async (
    _: any,
    { slug }: { slug: string },
    { clients: { masterdata } }: Context
) =>
    masterdata.searchDocuments(
        {
            dataEntity: COURSE_ENTITY,
            fields: ['count'],
            where: `slug=${slug}`,
            schema: 'v1',
            pagination:{
                page:1,
                pageSize:1
            }
        }
    ).then((( data ) => data[0]))

export const productList = async (
    _: any,
    { topN }: { topN: number },
    { clients: { masterdata } }: Context
) =>
    masterdata.scrollDocuments(//https://help.vtex.com/tutorial/querying-the-master-data-via-scroll-path--tutorials_4631#
        {
            dataEntity: COURSE_ENTITY,
            fields: ['count', 'slug'],
            schema: 'v1',
            size: topN,
            sort: `count DESC`
        }
    ).then((({ data }) => data))
    
    
