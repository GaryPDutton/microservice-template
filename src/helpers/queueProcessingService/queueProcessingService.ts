const config = {
    rabbitLocation: '',
    reconnectTimeout: 4000
};

import subscriptionHandler from './messaging/subscriptionHandler';
let subscriptionHandlerInstance: any;

/**
 * Start subscribing to the queue
 *
 * @module
 * @param {Array} subscriptions list of queue subscriptions
 * @param {Object} log everything to a stream
 * @returns {Promise} returns a promise
 */
export let startSubscriptions = (subscriptions: Array<any>, log: any, inputConfig: any) => {
    const overriddenConfig = inputConfig || config;
    subscriptionHandlerInstance = subscriptionHandler(overriddenConfig, log);
    const allPromises = subscriptions.map((sub: any) => subscribeToQueue(sub));
    return Promise.all(allPromises);

    /**
     * Send this subscription to the queue.
     * @param {Object} sub Subscription
     * @returns {Promise} returns a promise
     */
    function subscribeToQueue(sub: any) {
        return subscriptionHandlerInstance.subscribe(sub)
        .then(() => log.info('Subscription started'))
        .catch((error: any) => log.info(error, error.message));
    }
};
