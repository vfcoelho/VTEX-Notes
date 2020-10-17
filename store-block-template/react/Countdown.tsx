import React, { useState } from 'react'
import { TimeSplit } from './typings/global'
import { tick, getTwoDaysFromNow } from './utils/time'
import { useCssHandles } from 'vtex.css-handles'
import { FormattedMessage } from 'react-intl'

// Component definition of props
interface CountdownProps {
  title: string,
  targetDate: string
}

const DEFAULT_TARGET_DATE = getTwoDaysFromNow()
const CSS_HANDLES = ['container', 'countdown', 'title'] //defines css handles for style customization

// Component
const Countdown: StorefrontFunctionComponent<CountdownProps> = ({
  title,
  targetDate = DEFAULT_TARGET_DATE
}) => {

  //defines and exposes component state
  const [timeRemaining, setTime] = useState<TimeSplit>({
    hours: '00',
    minutes: '00',
    seconds: '00'
  })

  const titleText = title || <FormattedMessage id="countdown.title" />
  const handles = useCssHandles(CSS_HANDLES)//registers css handles for style customization

  tick(targetDate, setTime)

  return (
    <div className={`${handles.container} t-heading-2 fw3 w-100 c-muted-1`}>
      <div className={`${handles.title} db tc`}>{titleText}</div>
      <div className={`${handles.countdown} db tc`}>
        {`${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`}
      </div>
    </div>
  )
}

// Content shown in site editor
Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {
    title: {
      title: 'Sou um título',
      type: 'string',
      default: null,
    },
    targetDate: {
      title: 'Data final',
      description: 'Data final utilizada no contador',
      type: 'string',
      default: null,
    },
  },
}

export default Countdown
