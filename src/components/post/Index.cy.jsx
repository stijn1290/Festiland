import React from 'react'
import Index from './Index'
import '../../App.css';
import {MockAuthProvider} from '../../../cypress/support/mocks/MockAuthProvider';
import {MockRouterProvider} from '../../../cypress/support/mocks/MockRouterProvider';


describe('<Create />', () => {
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