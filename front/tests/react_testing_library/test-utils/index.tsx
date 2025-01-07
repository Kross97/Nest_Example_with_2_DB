//@ts-nocheck
import React from 'react'
import { render } from '@testing-library/react'
import { AllProvider } from '../../../src/provider/AllProvider';

/**
 * Будущие провайдеры (к примеру Redux, Router и т.д)
 * */
const AllTheProviders = ({children}) => {
  return (
    <AllProvider>
      <>
        {children}
      </>
    </AllProvider>
  )
}

//@ts-ignore
const customRender = (ui, options) =>
  render(ui, {wrapper: AllTheProviders, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }