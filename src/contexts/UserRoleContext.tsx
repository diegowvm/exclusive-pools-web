
import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'admin' | 'financeiro' | 'vendedor';

interface UserRoleContextType {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  hasPermission: (permission: string) => boolean;
}

const UserRoleContext = createContext<UserRoleContextType | undefined>(undefined);

const rolePermissions = {
  admin: ['all'],
  financeiro: ['financial', 'reports', 'analytics', 'customers'],
  vendedor: ['sales', 'customers', 'products', 'orders', 'leads']
};

export function UserRoleProvider({ children }: { children: ReactNode }) {
  const [userRole, setUserRole] = useState<UserRole>('admin');

  const hasPermission = (permission: string) => {
    const permissions = rolePermissions[userRole];
    return permissions.includes('all') || permissions.includes(permission);
  };

  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole, hasPermission }}>
      {children}
    </UserRoleContext.Provider>
  );
}

export function useUserRole() {
  const context = useContext(UserRoleContext);
  if (context === undefined) {
    throw new Error('useUserRole must be used within a UserRoleProvider');
  }
  return context;
}
