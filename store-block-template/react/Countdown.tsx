import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick } from './utils/time'
import { useCssHandles } from 'vtex.css-handles'
import { useQuery } from 'react-apollo'
import useProduct from 'vtex.product-context/useProduct'
import productReleaseDate from './queries/productReleaseDate.graphql'

// Component definition of props
interface CountdownProps {
  targetDate: string
}

//const DEFAULT_TARGET_DATE = getTwoDaysFromNow()
const CSS_HANDLES = ['countdown'] //defines css handles for style customization

// Component
const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  targetDate
}) => {

  //defines and exposes component state
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const handles = useCssHandles(CSS_HANDLES)//registers css handles for style customization
  const { product } = useProduct()
  const { data, loading, error } = useQuery(productReleaseDate, {
    variables: {
      slug: product?.linkText
    },
    ssr: false
  })

  tick(data?.product?.releaseDate || targetDate, setTime)

  if (targetDate || !product) {
    return (
      <div className={`${handles.countdown} t-heading-2 fw3 w-100 c-muted-1 db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
    )
  }
  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    )
  }
  if (error) {
    return (
      <div>
        <span>Erro!</span>
      </div>
    )
  }
  if (data?.product?.releaseDate && new Date(data?.product?.releaseDate) > new Date()) {
    return (
      <div className={`${handles.countdown} t-heading-2 fw3 w-100 c-muted-1 db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
    )
  }
  return (<span></span>)
}

// Content shown in site editor
Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    targetDate: {
      title: 'Data final',
      description: 'Data final utilizada no contador',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
