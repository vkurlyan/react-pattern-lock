export const getByAttr = (arr, name, value) => {
	let l = arr.length;
	
	while (l--) {
		if (arr[l][name] === value) {
			return arr[l];
		}
	}
}