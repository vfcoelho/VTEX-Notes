import React from 'react'

// Component definition of props
interface CountdownProps { }

// Component
const Countdown: StorefrontFunctionComponent<CountdownProps> = ({ }) => {
  return (
    <div>
      <h1>Countdown Test</h1>
    </div>
  )
}

// Content show in site editor
Countdown.schema = {
  title: 'editor.countdown.title',
  description: 'editor.countdown.description',
  type: 'object',
  properties: {},
}

export default Countdown
