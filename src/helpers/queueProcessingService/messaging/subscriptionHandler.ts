import BunyanTransport from '../../../classes/BunyanTransport';
import * as connectionHandler from './connectionHandler';

/**
 * Exposes the publish function as an external API
 * @param  {Object} config configuration of rabbit MQ message and location.
 * @param  {Object} log logs to a stream
 * @return {Object}      contains the subscribe function
 */
export default function (config: any, log: any) {
  return {
    subscribe: subscribe
  };

  /**
   * This will open the connection to RabbiMQ connect to an exchange/channel.
   * If the Exchange or Queue doesn't exist it will be created
   * @param {Object} subscription audit log subscription
   * @returns {Promise} either a message or an error
   */
  function subscribe(subscription: any) {
    // Get the one and only channel.
    return connectionHandler.getOpenChannel(config, reconnect, subscription, log)
      // Set up / check exchange
      .then((ch: any) => ch.assertExchange(subscription.exchange).then(() => ch))
      // Set up / check queue
      .then((ch: any) => ch.assertQueue(subscription.queueName).then(() => ch))
      // bind to queue we know exists then listen for messages on that queue.
      .then((ch: any) => ch.bindQueue(subscription.queueName, subscription.exchange, '')
        .then(() => listen(ch, subscription)))
      // If there is an error at any stage reconnect.
      .catch((error: any) => {
        reconnect(config, subscription, log);
        return Promise.reject(error);
      });
  }

  /**
 * Try to reconnect to the queue
 * @param  {Object} config configuration parameters for the connect
 * @returns {void} no return
 */
  function reconnect(config: any, subscription: any, log: any) {
    setTimeout(function () {
      subscribe(subscription)
        .catch((error: any) => log.info(error, error.message));
    }, config.reconnectTimeout || 4000);
  }

  /**
     * Sets listener on the require subscription
     * @param  {Object} ch, ampq channel
     * @param  {Object} subscription, subscription object with queue and exchange
     * @returns {Promise} returns control when consume is setup
  */
  function listen(ch: any, subscription: any) {
    return ch.consume(subscription.queueName, function (msg: any) {
      // Handle message
      if (msg !== null) {
        return subscription.service.processMessage(msg)
          .then((msg: any) => {
            // Message successful, acknowledge it
            ch.ack(msg);
            // Resolve the promise
            return msg;
          });
      } else {
        return Promise.reject('message is null');
      }
    });
  }
}
