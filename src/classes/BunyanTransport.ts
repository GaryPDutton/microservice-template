import * as Stringify from 'json-stringify-safe';
import * as amqplib from 'amqplib';
import * as fs from 'fs';
import IQueueLoggingConfiguration from './../interfaces/IQueueLoggingConfiguration';

export default class BunyanTransport {
    host: string;
    port: number;
    vhost: string;
    exchange: string;
    exchangeType: string;
    credentials: string;
    queue: string;
    levels: any;
    transport: any;
    connection: any;

     // constructor for object used in below methods.
    constructor(options: IQueueLoggingConfiguration) {
        this.host = options.LOGS_RABBIT_HOST;
        this.port = options.LOGS_RABBIT_PORT;
        this.vhost = options.LOGS_V_HOST;
        this.exchange = options.LOGS_EXCHANGE_NAME;
        this.queue = options.LOGS_QUEUE_NAME;
        this.exchangeType = options.LOGS_EXCHANGE_TYPE;
        this.credentials = options.LOGS_QUEUE_CREDENTIALS;

        // Translates Bunyan integer to levels to strings to be used as AMQP topics
        this.levels = {
            10: 'trace',
            20: 'debug',
            30: 'info',
            40: 'warn',
            50: 'error',
            60: 'fatal'
        };

        this.transport =
          // Connect to AMQP and return a promise to the channel.
          amqplib.connect('amqp://' + this.credentials + this.host)
            .then((conn: any) => conn.createChannel())
            .then((ch: any) =>
              ch.assertExchange(this.exchange, this.exchangeType, {
                  durable: true
              }).then(() => ch));
    }

    // Overriden method that works in a Bunyan stream.  Writes a message to the queue
    write(message: any) {
        this.transport.then((channel: any) =>  {
            channel.publish(this.exchange, '', new Buffer(Stringify(message, undefined, 2)));
        })
          .catch((error: any) => fs.writeFileSync('failed-audit.log', error));
    }

    // Overriden method that works in a Bunyan stream.  When the log has been
    close() {
        this.connection.close();
    }
  }