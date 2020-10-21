import React from 'react'
import useProduct from 'vtex.product-context/useProduct'
// import { useQuery } from 'react-apollo'
// import productInfo from './queries/productViewCount.graphql'

// Component definition of props
interface ProductViewCounterProps {
}


// Component
const ProductViewCounter: StorefrontFunctionComponent<ProductViewCounterProps> = ({
}) => {

  const { product } = useProduct()
  console.log(product)

  return (
    <span>Há 0 pessoas visualizando esse produto. Corra!</span>
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
