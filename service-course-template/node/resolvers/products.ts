
import { COURSE_ENTITY } from '../utils/constants'

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
