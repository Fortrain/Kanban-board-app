import { useRef, useEffect } from "react";

export const useClickOutside = (handler) => {
	const elementRef = useRef();
	useEffect(() => {
		const mouseHandler = (e) => {
			if (!elementRef.current || elementRef.current.contains(e.target)) {
				return;
			}
			handler();
		};
		document.addEventListener("click", mouseHandler);

		return () => {
			document.removeEventListener("click", mouseHandler);
		};
	}, [elementRef]);
	return elementRef;
};
