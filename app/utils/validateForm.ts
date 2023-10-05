const validateForm = (
	errors: object,
	touched: { [key: string]: boolean },
	values: object
) => {
	const touchedKeys = Object.entries(touched).map(([key, value]) => {
		if (value) return key;
	});

	const formErrors: string[] = [];

	Object.entries(errors).map(([key, value]) => {
		if (touchedKeys.includes(key) && values) {
			formErrors.push(value);
		}
	});

	return formErrors;
};

export { validateForm };
