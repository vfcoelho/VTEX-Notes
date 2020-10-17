import React from 'react'

// Component definition of props
interface CountdownProps {
  targetDate: string
}

// Component
const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ targetDate }) => {
  return (
    <div>
      <h1>{targetDate}</h1>
    </div>
  )
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
