// cypress/support/mocks/MockRouterProvider.jsx
import { MemoryRouter, Routes, Route } from 'react-router-dom';

export const MockRouterProvider = ({ children }) => {
    return (
        <MemoryRouter>
            <Routes>
                <Route path="*" element={children} />
            </Routes>
        </MemoryRouter>
    );
};
