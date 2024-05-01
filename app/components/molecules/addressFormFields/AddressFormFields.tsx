import React from 'react';
import styles from './adressFormFields.module.css';

const AddressFormFields = () => {
	return (
		<>
			<h2>First name *</h2>
			<input className={styles.inputField} />
			<h2>Last name *</h2>
			<input className={styles.inputField} />
			<h2>Company name (optional)</h2>
			<input className={styles.inputField} />
			<h2>Country /Region *</h2>

			<input className={styles.inputField} />
			<h2>Street address *</h2>
			<input className={styles.inputField} placeholder='House number and street name' />
			<input className={styles.inputField} placeholder='Apartment, suite, unit, etc. (optional)' />
			<h2>Postcode / ZIP *</h2>
			<input className={styles.inputField} />
			<h2>Town / City *</h2>
			<input className={styles.inputField} />
			<h2>Phone *</h2>
			<input className={styles.inputField} />
			<h2>Email address *</h2>
			<input className={styles.inputField} />
		</>
	);
};

export default AddressFormFields;
