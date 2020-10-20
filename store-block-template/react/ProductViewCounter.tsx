import React from 'react'

// Component definition of props
interface ProductViewCounterProps {
}


// Component
const ProductViewCounter: StorefrontFunctionComponent<ProductViewCounterProps> = ({
}) => {

  return (<span>Alive</span>)
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
