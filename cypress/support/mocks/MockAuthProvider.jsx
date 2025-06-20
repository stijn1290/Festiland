// Adjust the path if needed based on your project structure
import { AuthContext } from '../../../src/components/post/AuthContext'; // Make sure the path is correct

export const MockAuthProvider = ({ children, user = { uid: '123', name: 'Test User' } }) => {
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    );
};
