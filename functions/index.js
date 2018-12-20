const functions = require('firebase-functions');

exports.orderBook = functions.https.onRequest((request, response) => {
    const exchanges = request && request.query && request.query.exchanges ? request.query.exchanges : null;
    const method = request.method;
    if (method === "GET") {
        if (exchanges) {
            const ccxt = require('ccxt');
            let kraken = new ccxt.kraken();
            let params = { exchanges: exchanges, group: 1 };
            kraken.fetchOrderBook('BTC/USD', undefined, params).then(val => {
                return response.send({
                    message: 'Successfully fetch data.',
                    data: val,
                });
            }).catch(err => {
                if (err) {
                    return response.send({
                        message: 'Please try again with valid input.'
                    });
                }
            });
        } else {
            response.send({
                message: 'Please enter exchange name.'
            });
        }
    } else {
        response.send({
            message: 'GET METHOD ALLOW ONLY.'
        });
    }
});
