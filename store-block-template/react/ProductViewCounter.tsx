import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
import { useQuery } from 'react-apollo'
import productViewCount from './queries/productViewCount.graphql'

// Component definition of props
interface ProductViewCounterProps {
}


// Component
const ProductViewCounter: StorefrontFunctionComponent<ProductViewCounterProps> = ({
}) => {

  const { product } = useProduct()
  const productId = parseInt(product?.productId)+1000 //the fictional slug produced by https://github.com/vtex-apps/mocked-analytics doesn't have a direct relation with the registered products

  const { data } = useQuery(productViewCount, {
    variables: {
      slug: `${productId}`
    },
    ssr: false
  })

  if (!data){
    return (<span></span>)
  }

  return (
    <div className='dark-red'>Há {data?.productInfo?.count} pessoas visualizando esse produto. Corra!</div>
  )
}

// Content shown in site editor
ProductViewCounter.schema = {
  title: 'editor.product-view.title',
  description: 'editor.product-view.description',
  type: 'object',
  properties: {
  }
}

export default ProductViewCounter
