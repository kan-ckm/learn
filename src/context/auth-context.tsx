'use client';
import { createContext, useContext, useEffect, useState } from 'react';

type User = {
    id: string;
    email: string;
    name?: string;
};

type AuthContextType = {
    user: User | null;
    setUser: (user: User | null) => void;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    setUser: () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await fetch('/api/user/me', { credentials: 'include' });
                if (!res.ok) throw new Error('Lỗi lấy user');

                const data = await res.json();
                setUser(data.user ?? null);
            } catch (error) {
                setUser(null); // fallback nếu có lỗi
                console.error('Lỗi khi fetch user:', error);
            }
        };

        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
