

export const getBookingDate = (date: Date): string => {
    const result = new Date(date);
    result.setDate(result.getDate() - 7);

    return result.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "2-digit",
    });
};


export function getBookingFromDate(
    date: Date,
    includeTime: boolean
): string {
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 7);

    const day = String(previousDate.getDate()).padStart(2, "0");
    const month = String(previousDate.getMonth() + 1).padStart(2, "0");
    const year = previousDate.getFullYear();

    const datePart = `${day}/${month}/${year}`;

    if (!includeTime) {
        return datePart;
    }

    // const hours = String(previousDate.getHours()).padStart(2, "0");
    // const minutes = String(previousDate.getMinutes()).padStart(2, "0");

    const hours = "07";
    const minutes = "34";

    return `${datePart} ${hours}:${minutes}`;
}

export function getAfter30DaysDate(date: Date): string {

    const result = new Date(date);
    result.setDate(result.getDate() + 30);

    return getBookingFromDate(result, false);
}