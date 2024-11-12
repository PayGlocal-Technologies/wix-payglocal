import wixPaymentProviderBackend from 'wix-payment-provider-backend';
import { ok, badRequest } from 'wix-http-functions';
import { compactVerify, importSPKI } from 'jose';
import { enc } from 'crypto-js';
import { PUBLIC_KEY } from 'backend/payglocal-constants.js';

// This endpoint is used to update the status of a checkout session transaction.
export async function get_updateTransaction(request) {
    const response = {
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    let token = request.query['xglToken'];
    const res = await validateJweSignature(token, PUBLIC_KEY);
    
    let txn_no = res.data.gid;
    let status = res.data.status;
    let wixTransactionId = res.data.wixTransactionId;

    if (status === 'SENT_FOR_CAPTURE') {
        try {
            await submitTransactionUpdate(wixTransactionId, txn_no);
            response.body = {};
            return ok(response);
        } catch (err) {
            response.body = {
                'error': err
            };
            return badRequest(response);
        }
    } else {
        return badRequest(response);
    }
}

// This endpoint is used to update the status of a refund request.
export async function post_updateRefund(request) {
    const response = {
        'headers': {
            'Content-Type': 'application/json'
        }
    };

    let token = request.query['xglToken'];
    console.log("token is ", token)
    const res = await validateJweSignature(token, PUBLIC_KEY);

    const status = res.data.status;
    const amount = res.data.amount;
    const wixRefundId = res.data.refundId;
    const wixTransactionId = res.data.wixTransactionId;
    const pluginRefundId = res.data.pluginTransactionId;
    
    if (request.query.status === 'SENT_FOR_REFUND') {
        try {
            await submitRefundUpdate(wixTransactionId, pluginRefundId, wixRefundId, amount)
            response.body = {};
            return ok(response);
        } catch (err) {
            response.body = {
                'error': err
            };
            return badRequest(response);
        }
    } else {
        return badRequest(response);
    }
}

export async function submitTransactionUpdate(wixTransactionId, pluginTransactionId) {
    try {
        let response = await wixPaymentProviderBackend.submitEvent({
            'event': {
                'transaction': {
                    'wixTransactionId': wixTransactionId,
                    'pluginTransactionId': pluginTransactionId
                }
            }
        });
        return response;
    } catch (error) {
        console.log('Error updating the transaction status: ', error)
        return error;
    }
}

async function submitRefundUpdate(wixTransactionId, pluginRefundId, wixRefundId, amount) {
    try {
        let response = await wixPaymentProviderBackend.submitEvent({
            'event': {
                'refund': {
                    'amount': amount,
                    'wixRefundId': wixRefundId,
                    'pluginRefundId': pluginRefundId,
                    'wixTransactionId': wixTransactionId,
                }
            }
        });
        return response;
    } catch (error) {
        console.log('Error updating refund status: ', error)
        return error
    }
}

function parseJwt(token) {
    if (token) {
        let base64Url = token?.split('.')[1];
        if (!base64Url) return null;
        base64Url = base64Url?.replace(/-/g, '+')?.replace(/_/g, '/');

        const base64 = enc.Base64.parse(base64Url);
        const jsonPayload = enc.Utf8.stringify(base64);
        console
        return JSON.parse(jsonPayload);

    }
}

const validateJweSignature = async (token, publicKey, skipVerify) => {
    const res = {};
    try {
        if (skipVerify) {
            return { data: parseJwt(token) };
        }
        const cKey = await importSPKI(publicKey, 'RS256');
        await compactVerify(token, cKey);
        return { data: parseJwt(token) };
    } catch (e) {
        res.error = e;
        console.log("Error is", e)
        return res;
    }
};
