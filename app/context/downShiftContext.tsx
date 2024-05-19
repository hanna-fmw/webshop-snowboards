'use client'
import React, { createContext, useContext } from 'react'
import { useSelect, UseSelectProps } from 'downshift'

type SortDropdownContextType = ReturnType<typeof useSelect>

const SortDropdownContext = createContext<SortDropdownContextType | null>(null)

export const useSortDropdownContext = () => useContext(SortDropdownContext)

export const SortDropdownProvider: React.FC<UseSelectProps<any>> = ({ children, ...props }: React.PropsWithChildren<UseSelectProps<any>>) => {
	const contextValue = useSelect(props)

	return <SortDropdownContext.Provider value={contextValue}>{children}</SortDropdownContext.Provider>
}
