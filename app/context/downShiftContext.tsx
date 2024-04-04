'use client';
import React, { createContext, useContext } from 'react';
import { useSelect, UseSelectProps } from 'downshift';

// Define the type for the context value
type SortDropdownContextType = ReturnType<typeof useSelect>;

// Create the context
const SortDropdownContext = createContext<SortDropdownContextType | null>(null);

// Custom hook to consume the context
export const useSortDropdownContext = () => useContext(SortDropdownContext);

// Provider component to wrap the components that need access to Downshift functions
export const SortDropdownProvider: React.FC<UseSelectProps<any>> = ({ children, ...props }: React.PropsWithChildren<UseSelectProps<any>>) => {
	const contextValue = useSelect(props);

	return <SortDropdownContext.Provider value={contextValue}>{children}</SortDropdownContext.Provider>;
};
