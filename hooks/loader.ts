import { GlobalLoaderRef } from '@/components/GlobalLoader';
import { createRef } from 'react';

// A single ref shared across the whole app. GlobalLoader (mounted once at
// the root) attaches itself here; every other file just imports the
// functions below and calls them — no context, no props, no hooks needed.
export const loaderRef = createRef<GlobalLoaderRef>();

export function showLoader(message?: string) {
    loaderRef.current?.show(message);
}

export function hideLoader() {
    loaderRef.current?.hide();
}