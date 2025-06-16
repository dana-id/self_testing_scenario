import Dana, { ResponseError } from 'dana-node';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { fail } from 'assert';
import { getRequest } from '../helper/util';
import { assertResponse, assertFailResponse } from '../helper/assertion';
import { QueryPaymentRequest } from 'dana-node/dist/ipg/v1';
import { executeManualApiRequest } from '../helper/apiHelpers';

dotenv.config();

const titleCase = 'QueryOrder';
const jsonPathFile = path.resolve(__dirname, '../../../resource/request/components/IPG.json');

const dana = new Dana({
    partnerId: process.env.X_PARTNER_ID || '',
    privateKey: process.env.PRIVATE_KEY || '',
    origin: process.env.ORIGIN || '',
    env: process.env.ENV || 'sandbox',
});

function generateReferenceNo(): string {
    return uuidv4();
}

describe('QueryOrder Tests', () => {
    test.skip('should successfully query order (paid)', async () => {
        const caseName = 'QueryOrderSuccessPaid';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should successfully query order (initiated)', async () => {
        const caseName = 'QueryOrderSuccessInitiated';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should successfully query order (paying)', async () => {
        const caseName = 'QueryOrderSuccessPaying';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should successfully query order (cancelled)', async () => {
        const caseName = 'QueryOrderSuccessCancelled';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test.skip('should fail with not found', async () => {
        const caseName = 'QueryOrderNotFound';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            fail('QueryOrder test is a placeholder.');
        } catch (e: any) { }
    });

    test('should fail with invalid field', async () => {
        const caseName = 'QueryOrderFailInvalidField';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.originalPartnerReferenceNo = generateReferenceNo();

        try {
            const baseUrl: string = 'https://api.sandbox.dana.id/';
            const apiPath: string = '/payment-gateway/v1.0/debit/status.htm';

            const customHeaders: Record<string, string> = {
                'X-TIMESTAMP': new Date(Date.now() + 7 * 60 * 60 * 1000)
                    .toISOString()
                    .replace('T', ' ')
                    .replace(/\.\d{3}Z$/, '+07:00')
                    .replace(/-/g, '-')
                    .replace(/:/g, ':')
            };

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
            if (Number(e.status) === 400) {
                // Expected error for not found
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else if (e instanceof ResponseError) {
                // Expected error for not found
                fail("Expected not found failed but got status code " + e.status);
            }

        }
    });

    test('should fail with invalid mandatory field', async () => {
        const caseName = 'QueryOrderFailInvalidMandatoryField';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        requestData.originalExternalId = generateReferenceNo();

        try {
            const baseUrl: string = 'https://api.sandbox.dana.id/';
            const apiPath: string = '/payment-gateway/v1.0/debit/status.htm';

            const customHeaders: Record<string, string> = {
                'X-TIMESTAMP': ''
            };

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
            if (Number(e.status) === 400) {
                // Expected error for not found
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else if (e instanceof ResponseError) {
                // Expected error for not found
                fail("Expected not found failed but got status code " + e.status);
            }

        }
    });

    test('should fail with unauthorized', async () => {
        const caseName = 'QueryOrderFailUnauthorized';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        try {
            const baseUrl: string = 'https://api.sandbox.dana.id/';
            const apiPath: string = '/payment-gateway/v1.0/debit/status.htm';

            const customHeaders: Record<string, string> = {
                'X-SIGNATURE': '85be817c55b2c135157c7e89f52499bf0c25ad6eeebe04a986e8c862561b19a5'
            };

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
            if (Number(e.status) === 401) {
                // Expected error for unauthorized
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else if (e instanceof ResponseError) {
                // Expected error for not found
                fail("Expected not found failed but got status code " + e.status);
            }

        }
    });

    test('should fail with transaction not found', async () => {
        const caseName = 'QueryOrderFailTransactionNotFound';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);

        try {
            const response = await dana.ipgApi.queryPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                // Expected error for transaction not found
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail("Expected transaction not found failed but got status code " + e.status);
            }
         }
    });

    test('should fail with general error', async () => {
        const caseName = 'QueryOrderFailGeneralError';
        const requestData: QueryPaymentRequest = getRequest(jsonPathFile, titleCase, caseName);
        console.log(`Request Data: ${JSON.stringify(requestData)}`);
        
        try {
            const response = await dana.ipgApi.queryPayment(requestData);
            await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(response));
        } catch (e: any) {
            if (e instanceof ResponseError) {
                // Expected error for general error
                await assertFailResponse(jsonPathFile, titleCase, caseName, JSON.stringify(e.rawResponse));
            } else {
                fail("Expected general error failed but got status code " + e.status);
            }
        }
    });
});
