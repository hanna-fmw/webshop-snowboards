import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
	const [value, setValue] = useState<T>(() => {
		if (typeof window !== 'undefined') {
			const jsonValue = localStorage.getItem(key);
			if (jsonValue !== null) return JSON.parse(jsonValue);
			if (typeof initialValue === 'function') {
				return (initialValue as () => T)();
			} else {
				return initialValue;
			}
		}
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue] as [typeof value, typeof setValue];
}

//TEST 1
// import { useEffect, useState } from 'react';

// export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
// 	const [value, setValue] = useState<T>(() => {
// 		const jsonValue = localStorage.getItem(key);
// 		if (jsonValue !== null) return JSON.parse(jsonValue);
// 		if (typeof initialValue === 'function') {
// 			return (initialValue as () => T)();
// 		} else {
// 			return initialValue;
// 		}
// 	});

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(value));
// 	}, [key, value]);

// 	return [value, setValue] as [typeof value, typeof setValue];
// }

//TEST 2
// import { useEffect, useState } from 'react';

// export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
// 	const [value, setValue] = useState<T>();

// 		useEffect(() => {const jsonValue = localStorage.getItem(key);
// 			if (jsonValue !== null) return JSON.parse(jsonValue);
// 			if (typeof initialValue === 'function') {
// 				return (initialValue as () => T)();
// 			} else {
// 				return initialValue;
// 			}}, [])

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(value));
// 	}, [key, value]);

// 	return [value, setValue] as [typeof value, typeof setValue];
// }

//TEST 3

// import { useEffect, useState } from 'react';

// export default function useLocalStorage(key, initialValue) {
// 	const [value, setValue] = useState();

// 	useEffect(() => {
// 		const data = localStorage.getItem(key);
// 		if (data === null) {
// 			if (typeof initialValue === 'function') {
// 				setValue(initialValue());
// 			} else {
// 				setValue(initialValue);
// 			}
// 		} else {
// 			setValue(JSON.parse(data));
// 		}
// 	}, []);

// 	useEffect(() => {
// 		localStorage.setItem(key, JSON.stringify(value));
// 	}, [value]);

// 	return [value, setValue];
// }
