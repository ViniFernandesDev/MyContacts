import { createContext, useCallback, useState } from "react";

interface DashboardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    isNewTransactionModalOpen: boolean;
    newTransactionType: 'INCOME' | 'EXPENSE' | null;
    toogleValueVisibility(): void;
    openNewAccountModal(): void;
    closeNewAccountModal(): void;
    openNewTransactionModal(type: 'INCOME' | 'EXPENSE'): void;
    closeNewTransactionModal(): void;
}

export const DashboardContext = createContext({} as DashboardContextValue);

export function DashboardProvider({children}: {children: React.ReactNode}) {
    const [areValuesVisible, setAreValuesVisible] = useState<boolean>(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState<boolean>(false);
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState<boolean>(false);
    const [newTransactionType, setNewTransactionType] = useState<'INCOME' | 'EXPENSE' | null>(null);

    const toogleValueVisibility = useCallback(() => {
        setAreValuesVisible(prevState => !prevState)
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true)
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false)
    }, []);

    const openNewTransactionModal = useCallback((type: 'INCOME' | 'EXPENSE') => {
        setNewTransactionType(type)
        setIsNewTransactionModalOpen(true)
    }, []);

    const closeNewTransactionModal = useCallback(() => {
        setNewTransactionType(null)
        setIsNewTransactionModalOpen(false)
    }, []);

    return (
        <DashboardContext.Provider 
            value={{ 
                areValuesVisible, 
                toogleValueVisibility,
                openNewAccountModal,
                closeNewAccountModal,
                isNewAccountModalOpen,
                openNewTransactionModal,
                closeNewTransactionModal,
                isNewTransactionModalOpen,
                newTransactionType,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}