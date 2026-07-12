import * as Location from "expo-location";

export interface CurrentLocation {
    latitude: number;
    longitude: number;
}

/**
 * Request location permission
 */
export const requestLocationPermission = async (): Promise<boolean> => {
    try {
        const { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== "granted") {
            console.warn("Location permission denied.");
            return false;
        }

        return true;
    } catch (error) {
        console.error("Permission Error:", error);
        return false;
    }
};

/**
 * Get current device location
 */
export const getCurrentLocation = async (): Promise<CurrentLocation | null> => {
    try {
        const granted = await requestLocationPermission();

        if (!granted) {
            return null;
        }

        // Check whether location service is enabled
        const enabled = await Location.hasServicesEnabledAsync();



        if (!enabled) {
            console.warn("Location service is disabled.");
            return null;
        }

        // Try cached location first
        let location = await Location.getLastKnownPositionAsync();

        // If no cached location exists, fetch a new one
        if (!location) {
            location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });
        }

        return {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
        };
    } catch (error) {
        console.error("Location Error:", error);
        return null;
    }
};

/**
 * Convert coordinates to address
 */
export const getAddress = async (
    latitude: number,
    longitude: number
): Promise<Location.LocationGeocodedAddress[] | null> => {
    try {
        const address = await Location.reverseGeocodeAsync({
            latitude,
            longitude,
        });

        return address;
    } catch (error) {
        console.error("Reverse Geocode Error:", error);
        return null;
    }
};
