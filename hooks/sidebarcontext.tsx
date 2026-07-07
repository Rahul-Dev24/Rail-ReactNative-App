import React, { createContext, ReactNode, useContext, useState } from 'react';

type SidebarContextType = {
    visible: boolean;
    openSidebar: () => void;
    closeSidebar: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(
    undefined,
);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [visible, setVisible] = useState(false);

    return (
        <SidebarContext.Provider
            value={{
                visible,
                openSidebar: () => setVisible(true),
                closeSidebar: () => setVisible(false),
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const ctx = useContext(SidebarContext);
    if (!ctx) {
        throw new Error('useSidebar must be used within a <SidebarProvider>');
    }
    return ctx;
}