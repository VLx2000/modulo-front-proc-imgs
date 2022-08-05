import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeadersDefaults } from 'axios';
import { User } from "types/user";
import axiosInstance from "utils/axios";

interface CommonHeaderProperties extends HeadersDefaults {
    Authorization: string;
}

interface AuthContextInterface {
    user?: User | null
    authenticated?: boolean
    loading?: boolean
    login?: (email: string, password: string) => void
    logout?: () => void
    error?: string
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

const AuthProvider = ({ children }: any) => {

    const navigate = useNavigate();
    const [user, setUser] = useState<User|null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        const recoveredToken = localStorage.getItem('token');

        if (recoveredUser && recoveredToken) {
            setUser(JSON.parse(recoveredUser));
            axiosInstance.defaults.headers = {
                Authorization: `Bearer ${recoveredToken}`
            } as CommonHeaderProperties
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        //console.log('login', { email, password });
        
        await axiosInstance
            .post('/users/auth',
                JSON.stringify({ email, password }),
                { headers: { "Content-Type": 'application/json', } }
            )
            .then((res) => {
                const loggedUser = res.data.user;
                const token = res.data.token;
                localStorage.setItem('user', JSON.stringify(loggedUser));
                localStorage.setItem('token', token);

                axiosInstance.defaults.headers = {
                    Authorization: `Bearer ${token}`
                } as CommonHeaderProperties

                setUser({ id: loggedUser.id, name: loggedUser.name });
                setError('');
                navigate('/');
            })
            .catch((err) => setError(err))
    };

    const logout = () => {
        //console.log('logout')
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        axiosInstance.defaults.headers = {
            Authorization: ''
        } as CommonHeaderProperties

        navigate('/login');
    };

    return (
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, login, logout, error }}>
            {children}
        </AuthContext.Provider>
    );

}

export default AuthProvider;