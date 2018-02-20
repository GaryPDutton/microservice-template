import BunyanTransport from './classes/BunyanTransport';
import SampleDataService from './dal/SampleDataService';
import * as sampleQueueSubscriptionController from './controllers/sampleQueueSubscriptionController';

const queueProcessingService = require('./helpers/queueProcessingService/queueProcessingService');

/**
 * Database middleware that maintains a single client
 * If the client isn't available a new connection is made.
 * @param {Object} config key/value mapping for config items
 * @param {any} log Bunyan logger, use info to log
 * @returns {Promise} resolving the msg
 */
export default (config: any, log: any) => {
    if (config.QUEUE_ON) {
        const sampleSubscription = {
            queueName: config.QUEUE_NAME,
            exchange: config.EXCHANGE_NAME,
            service: {
                processMessage: (msg: any) => sampleQueueSubscriptionController.processMessage(msg, log)
            }
        };

        queueProcessingService.startSubscriptions([ sampleSubscription ], log, config);
    }
};
