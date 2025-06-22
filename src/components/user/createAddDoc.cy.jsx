import React from 'react'
import AddDoc from './create'
import '../../App.css';

describe('<AddDoc />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<AddDoc />)
  })
})