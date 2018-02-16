import * as Stringify from 'json-stringify-safe';
import * as amqplib from 'amqplib';
import * as fs from 'fs';
import IQueueConfiguration from './../interfaces/IQueueConfiguration';

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
    constructor(options: IQueueConfiguration) {
        this.host = options.RABBITHOST;
        this.port = options.RABBITPORT;
        this.vhost = options.VHOST;
        this.exchange = options.EXCHANGENAME;
        this.queue = options.QUEUENAME;
        this.exchangeType = options.EXCHANGETYPE;
        this.credentials = options.QUEUECREDENTIALS;

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