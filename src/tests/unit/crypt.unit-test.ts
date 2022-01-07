import { encryptData, verifyData } from '../../utils';

describe('Crypt utils tests', () => {
	it('encryptData function returns hash for provided data as string', () => {
		const dataToEncrypt = 'test';
		const encyptedData = encryptData(dataToEncrypt);

		expect(typeof encyptedData).toBe('string');
		expect(encyptedData).not.toBe(dataToEncrypt);
	});

	it('verifyData function verifies that the data provided is what was encypted', () => {
		const dataToEncrypt = 'test';
		const encyptedData = encryptData(dataToEncrypt);
		const verifiedData = verifyData(dataToEncrypt, encyptedData);

		expect(typeof verifiedData).toBe('boolean');
		expect(verifiedData).toBe(true);
	});

	it('verifyData function verifies that the data provided is different from what was encypted', () => {
		const dataToEncrypt = 'test';
		const encyptedData = encryptData(dataToEncrypt);
		const verifiedData = verifyData('otherData', encyptedData);

		expect(typeof verifiedData).toBe('boolean');
		expect(verifiedData).toBe(false);
	});
});
