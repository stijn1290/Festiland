import React from 'react'
import Index from './Index'
import {MockAuthProvider} from '../../../cypress/support/mocks/MockAuthProvider';
import {MockRouterProvider} from '../../../cypress/support/mocks/MockRouterProvider';


describe('<Index />', () => {
    it('renders', () => {
        // see: https://on.cypress.io/mounting-react
        cy.mount(
            <MockRouterProvider>
                <MockAuthProvider>
                    <Index/>
                </MockAuthProvider>
            </MockRouterProvider>
        )
    })
})