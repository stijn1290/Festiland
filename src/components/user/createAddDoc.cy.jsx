import React from 'react'
import AddDoc from './create'

describe('<AddDoc />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddDoc />)
  })
})