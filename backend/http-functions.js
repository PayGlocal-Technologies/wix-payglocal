import wixPaymentProviderBackend from 'wix-payment-provider-backend';
import { ok, badRequest } from 'wix-http-functions';

// This endpoint is used to update the status of a checkout session transaction.
export async function post_updateTransaction(request) {
    const response = {
        'headers': {
            'Content-Type': 'application/json'
        }
    };
    let status = request.query['status'];
    let txn_no = request.query['gid'];

    if (status === 'SENT_FOR_CAPTURE') {
        try {
            let wixTransactionId = request.query['wixTransactionId'];
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
    if (request.query.status === 'SENT_FOR_REFUND') {
        try {
            const amount = request.query['amount'];
            const wixRefundId = request.query['refundId'];
            const wixTransactionId = request.query['wixTransactionId'];
            const pluginRefundId = request.query['pluginTransactionId'];

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
