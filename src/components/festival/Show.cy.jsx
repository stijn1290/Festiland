import React from 'react'
import '../../App.css';
import Show from './Show'
import {MockRouterProvider} from "../../../cypress/support/mocks/MockRouterProvider.jsx";
import {MockAuthProvider} from "../../../cypress/support/mocks/MockAuthProvider.jsx";
import Index from "../post/Index.jsx";

describe('<Show />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(
        <MockRouterProvider>
          <MockAuthProvider>
            <Show festival="dominator"/>
          </MockAuthProvider>
        </MockRouterProvider>
    )
  })
})