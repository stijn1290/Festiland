import React from 'react'
import Show from './Show'

describe('<Show />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Show festival={"Ikarus Festival"}/>)
  })
})