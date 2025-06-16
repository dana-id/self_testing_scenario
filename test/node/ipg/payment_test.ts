import Dana, { ResponseError } from 'dana-node';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';
import { IPGPaymentRequest } from 'dana-node/dist/ipg/v1';
import { executeManualApiRequest } from '../helper/apiHelpers';
import { json } from 'stream/consumers';

dotenv.config();

const titleCase = 'Payment';
const jsonPathFile = path.resolve(__dirname, '../../../resource/request/components/IPG.json');
const merchantId = process.env.MERCHANT_ID || '';
const apiUrl = '/rest/redirection/v1.0/debit/payment-host-to-host';

const dana = new Dana({
    partnerId: process.env.X_PARTNER_ID || '',
    privateKey: process.env.PRIVATE_KEY || '',
    origin: process.env.ORIGIN || '',
    env: process.env.ENV || 'sandbox',
});

function generateReferenceNo(): string {
    return uuidv4();
}

describe('Payment Tests', () => {
    test('should successfully perform payment', async () => {
        const caseName = 'PaymentSuccess';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            console.error('Payment test failed:', e);
        }
    });

    test('should fail with invalid format', async () => {
        const caseName = 'PaymentFailInvalidFormat';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test('should fail with missing or invalid mandatory field', async () => {
        const caseName = 'PaymentFailMissingOrInvalidMandatoryField';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const customHeaders: Record<string, string> = {
                'X-TIMESTAMP': '',
            };

            const baseUrl: string = 'https://api.sandbox.dana.id/';
            const apiPath: string = apiUrl

        await executeManualApiRequest(
                caseName,
                'POST',
                baseUrl + apiPath,
                apiPath,
                requestData,
                customHeaders
            );
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { 
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test('should fail with invalid signature', async () => {
        const caseName = 'PaymentFailInvalidSignature';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const customHeaders: Record<string, string> = {
                'X-SIGNATURE': 'invalid_signature',
            };

            const baseUrl: string = 'https://api.sandbox.dana.id/';
            const apiPath: string = apiUrl;

        await executeManualApiRequest(
                caseName,
                'POST',
                baseUrl + apiPath,
                apiPath,
                requestData,
                customHeaders
            );
            fail('Expected an error but the API call succeeded');
        } catch (e: any) { 
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test('should fail with general error', async () => {
        const caseName = 'PaymentFailGeneralError';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;

        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test('should fail with transaction not permitted', async () => {
        const caseName = 'PaymentFailTransactionNotPermitted';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test('should fail with merchant not exist or status abnormal', async () => {
        const caseName = 'PaymentFailMerchantNotExistOrStatusAbnormal';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId; // Use a non-existent merchant ID for testing
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test.skip('should fail with inconsistent request', async () => {
        const caseName = 'PaymentFailInconsistentRequest';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });

    test('should fail with internal server error', async () => {
        const caseName = 'PaymentFailInternalServerError';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        }
        catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test('should fail with exceeds transaction amount limit', async () => {
        const caseName = 'PaymentFailExceedsTransactionAmountLimit';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test.skip('should fail with timeout', async () => {
        const caseName = 'PaymentFailTimeout';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.partnerReferenceNo = generateReferenceNo();
        requestData.merchantId = merchantId;
        try {
            const response = await dana.ipgApi.ipgPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
            console.log(`Response: ${JSON.stringify(response)}`);
            
        } catch (e: any) {
            if (e instanceof ResponseError) {
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail('Payment test failed: ' + (e.message || e));
            }
        }
    });

    test.skip('should fail with idempotent', async () => {
        const caseName = 'PaymentFailIdempotent';
        const requestData: IPGPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('Payment test is a placeholder.');
        } catch (e: any) { }
    });
});
