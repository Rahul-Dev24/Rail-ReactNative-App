import React, {
    createContext,
    useContext,
    useState,
} from "react";

import AlertDialog from "@/components/AlertDialog";

interface AlertData {
    title: string;
    message: string;
    primaryText?: string;
    secondaryText?: string;
    onPrimaryPress?: () => void;
    onSecondaryPress?: () => void;
}

interface ContextType {
    showAlert: (alert: AlertData) => void;
}

const AlertContext = createContext<ContextType>(null!);

export const useAppAlert = () => useContext(AlertContext);

export function AlertProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState<AlertData>({
        title: "",
        message: "",
    });

    const showAlert = (data: AlertData) => {
        setAlert(data);
        setVisible(true);
    };

    const close = () => {
        setVisible(false);
    };

    return (
        <AlertContext.Provider value={{ showAlert }}>
            {children}

            <AlertDialog
                visible={visible}
                title={alert.title}
                message={alert.message}
                primaryText={alert.primaryText}
                secondaryText={alert.secondaryText}
                onPrimaryPress={() => {
                    close();
                    alert.onPrimaryPress?.();
                }}
                onSecondaryPress={() => {
                    close();
                    alert.onSecondaryPress?.();
                }}
            />
        </AlertContext.Provider>
    );
}