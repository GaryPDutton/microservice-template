import amqplib = require('amqplib');

/**
 * Connect to Rabbit MQ
 * @param {Object} config configuration for the rabbit connection
 * @param {Function} reconnectLogic Function that sets up the subscription.
 * @param {Object} subscription data that defines how connection is set up.
 *
 * @returns {object}        Connection Channel to RabbitMQ
 */
export let getOpenChannel = (config: any, reconnectLogic: Function, subscription: any, log: any) =>
    amqplib.connect('amqp://' + config.RABBIT_HOST + ':' + config.RABBIT_PORT).then((conn: any) => {
        // If any errors occur don't stop the entire app, just display in the logs
        conn.on('error', function (err: any) {
            if (err.message !== 'Connection closing') {
                log.info(err, err.message);
            }
        });
        // On close attempt to reconnect
        conn.on('close', function () {
            log.info(new Error(), '[AMQP] reconnecting, reconnecting...');
            reconnectLogic(config, subscription);
        });
        return conn.createChannel();
        // With any errors attempt a reconnect.
    });
