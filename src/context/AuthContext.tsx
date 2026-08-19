import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  currentRole: UserRole;
  login: (role: UserRole) => void;
  logout: () => void;
  switchRole: (role: UserRole) => void;
  isAuthenticated: boolean;
}

const MOCK_USERS: Record<UserRole, User> = {
  SUPER_ADMIN: {
    id: 'u-super-1',
    email: 'superadmin@metropolis.edu',
    username: 'superadmin',
    role: 'SUPER_ADMIN',
    status: 'ACTIVE',
    firstName: 'Eleanor',
    lastName: 'Vance',
    phone: '+1 555-0192',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  },
  ADMIN: {
    id: 'u-admin-1',
    email: 'principal@metropolis.edu',
    username: 'principal',
    role: 'ADMIN',
    status: 'ACTIVE',
    firstName: 'Dr. Arthur',
    lastName: 'Pendelton',
    phone: '+1 555-0100',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
  },
  TEACHER: {
    id: 'u-teacher-1',
    email: 'john.doe@metropolis.edu',
    username: 'jdoe',
    role: 'TEACHER',
    status: 'ACTIVE',
    firstName: 'John',
    lastName: 'Doe',
    phone: '+1 555-0144',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
  },
  ACCOUNTANT: {
    id: 'u-acc-1',
    email: 'finance@metropolis.edu',
    username: 'finance',
    role: 'ACCOUNTANT',
    status: 'ACTIVE',
    firstName: 'Marcus',
    lastName: 'Sterling',
    phone: '+1 555-0188',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
  },
  STUDENT: {
    id: 'u-student-1',
    email: 'alex.johnson@metropolis.edu',
    username: 'alexj',
    role: 'STUDENT',
    status: 'ACTIVE',
    firstName: 'Alex',
    lastName: 'Johnson',
    phone: '+1 555-0177',
    avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
  },
  PARENT: {
    id: 'u-parent-1',
    email: 'parent.johnson@metropolis.edu',
    username: 'pjohnson',
    role: 'PARENT',
    status: 'ACTIVE',
    firstName: 'Robert',
    lastName: 'Johnson',
    phone: '+1 555-0166',
    avatarUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
  },
  LIBRARIAN: {
    id: 'u-lib-1',
    email: 'librarian@metropolis.edu',
    username: 'lib',
    role: 'LIBRARIAN',
    status: 'ACTIVE',
    firstName: 'Clara',
    lastName: 'Oswald',
    phone: '+1 555-0133',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
  },
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [user, setUser] = useState<User | null>(MOCK_USERS['SUPER_ADMIN']);

  const login = (role: UserRole) => {
    setCurrentRole(role);
    setUser(MOCK_USERS[role]);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
    setUser(MOCK_USERS[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        login,
        logout,
        switchRole,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
