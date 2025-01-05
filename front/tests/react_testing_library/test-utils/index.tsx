import React from 'react'
import { render } from '@testing-library/react'

/**
 * Будущие провайдеры (к примеру Redux, Router и т.д)
 * */
const AllTheProviders = ({children}) => {
  return (
    <>
      <>
        {children}
      </>
    </>
  )
}

//@ts-ignore
const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }