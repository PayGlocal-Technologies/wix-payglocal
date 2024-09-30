import { payGlocalRequest } from 'backend/payglocal-wrapper.js';
import { ACCOUNT_NAME, WEBSITE_NAME } from 'backend/payglocal-constants.js';

const errorObject = {
    'reasonCode': 6000,
    'errorCode': 'GENERAL_ERROR',
    'errorMessage': 'Something went wrong with the transaction request'
}

export const connectAccount = async (options, context) => {
    const { credentials } = options
    const returnStructure = {
        credentials: {
            client_id: credentials.merchantId,
            client_secret: credentials.apiKey
        }
    };
    return returnStructure;
};

export const createTransaction = async (options, context) => {
    try {
        let checkoutSession = await createCheckoutSession(options);
        return checkoutSession;
    } catch (error) {
        return error;
    }
};

/**
 * This payment plugin endpoint is triggered when a merchant refunds a payment made on a Wix site.
 **/

export const refundTransaction = async (options, context) => {
    try {
        let refundSession = await createRefund(options);
        return refundSession;
    } catch (error) {
        return error;
    }
};

//helpers

export async function createCheckoutSession(transactionRequest) {
    if (!transactionRequest) return errorObject;
    try {
        let invoiceAmount = parseInt(transactionRequest.order.description.totalAmount) / 100;
        let orderUpdateUrl = `${ACCOUNT_NAME.endsWith('/') ? ACCOUNT_NAME : ACCOUNT_NAME + '/'}${WEBSITE_NAME ? WEBSITE_NAME + '/' : ''}_functions/updateTransaction`;

        let body = JSON.stringify({
            totalAmount: invoiceAmount,
            orderUpdateUrl: orderUpdateUrl,
            _id: transactionRequest.order._id,
            returnUrls: transactionRequest.order.returnUrls,
            wixTransactionId: transactionRequest.wixTransactionId,
            currency: transactionRequest.order.description.currency,
            billingAddress: transactionRequest.order.description.billingAddress,
            shippingAddress: transactionRequest.order.description.shippingAddress,
        });

        const paymentProviderResponse = await payGlocalRequest('POST', '/gl/v1/payments/initiate/paycollect/integration/wix', body,
            transactionRequest.merchantCredentials.client_secret);

        if (paymentProviderResponse.code === 'OK') {
            return {
                'redirectUrl': paymentProviderResponse.redirectUrl,
                'pluginTransactionId': paymentProviderResponse.pluginTransactionId
            }
        } else {
            return errorObject;
        }
    } catch (error) {
        console.error('Error completing checkout request: ', error);
        return error;
    }
}

export async function createRefund(refundRequest) {
    if (!refundRequest) return errorObject;
    try {
        let invoiceAmount = parseInt(refundRequest.refundAmount) / 100;
        let callbackUrl = `${ACCOUNT_NAME}/${WEBSITE_NAME}/_functions/updateRefund`

        const body = JSON.stringify({
            refundAmount: invoiceAmount,
            orderUpdateUrl: callbackUrl,
            wixRefundId: refundRequest.wixRefundId,
            wixTransactionId: refundRequest.wixTransactionId,
            pluginTransactionId: refundRequest.pluginTransactionId,
        });

        const response = await payGlocalRequest('POST', `/gl/v1/payments/refund/integration/wix`, body, refundRequest.merchantCredentials.client_secret);
        if (response.code === 'OK' && !response.errors) {
            return {
                'pluginRefundId': response.gid
            };
        }
    } catch (error) {
        console.log('Error creating refund: ', error);
        return errorObject;
    }
}
