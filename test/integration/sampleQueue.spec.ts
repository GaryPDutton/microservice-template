// Setup testing tools
import { expect } from 'chai';
import * as Stringify from 'json-stringify-safe';

const request = require('supertest');
const url = 'https://localhost:3000';
const amqp = require('amqplib');


// Very dirty test function to add a sample item to the list via a queue
describe('Integration: Queue processing', function () {
    const exchange = 'test-exchange';
    const q = 'test-queue';


    it('It create a sample queue item', (done) => {
        amqp.connect('amqp://localhost').then(function(conn) {
        return conn.createChannel().then(function(ch) {
            const msg = {
                action: 'ADD',
                item: {
                    name: 'John Smith'
                }
            };

            const oke = ch.assertExchange(exchange, 'direct', {durable: true});

            return oke.then(function(_qok) {
                ch.publish(exchange, '', new Buffer(Stringify(msg)));
                expect(true);
                return ch.close();
            });
        }).finally(function() {
            conn.close();
            done();
        });
        }).catch(console.warn);
    });

});