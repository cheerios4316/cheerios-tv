"use client";

import { useState } from "react";

export const usePosition = () => {
    const [position, setPosition] = useState<GeolocationPosition | null>(null);
    const [error, setError] = useState<string | null>(null);

    const getPosition = () => navigator.geolocation.getCurrentPosition(
        (position) => {
            setPosition(position);
            setError(null);
        },
        (error) => {
            setError(error.message);
        },
    );

    return { position, error, getPosition };
}