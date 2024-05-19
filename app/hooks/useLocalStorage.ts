import { useState, useEffect } from 'react'

export const useLocalStorage = <T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [storedValue, setStoredValue] = useState<T>(initialValue)

	useEffect(() => {
		try {
			const item = window.localStorage.getItem(key)
			setStoredValue(item ? JSON.parse(item) : initialValue)
		} catch (error) {
			console.warn(error)
		}
	}, [key, initialValue])

	const setValue: React.Dispatch<React.SetStateAction<T>> = (value) => {
		try {
			const valueToStore = value instanceof Function ? value(storedValue) : value
			setStoredValue(valueToStore)
			if (typeof window !== 'undefined') {
				window.localStorage.setItem(key, JSON.stringify(valueToStore))
			}
		} catch (error) {
			console.warn(error)
		}
	}

	return [storedValue, setValue]
}

// import { useEffect, useState } from 'react'

// export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
// 	const [value, setValue] = useState<T>(() => {
// 		if (typeof window !== 'undefined') {
// 			const jsonValue = localStorage.getItem(key)
// 			if (jsonValue !== null) return JSON.parse(jsonValue)
// 			if (typeof initialValue === 'function') {
// 				return (initialValue as () => T)()
// 			} else {
// 				return initialValue
// 			}
// 		}
// 	})

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(value))
// 	}, [key, value])

// 	return [value, setValue] as [typeof value, typeof setValue]
// }
