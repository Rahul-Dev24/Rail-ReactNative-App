import { router } from "expo-router";
import { useEffect } from 'react';

export default function trains() {
    useEffect(() => {
        router.replace("/(booking)/upcoming");
    }, []);

    return null;
}
