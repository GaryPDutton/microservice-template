import SampleDataService from '../dal/SampleDataService';

// Process message function for the sample subscription
export let processMessage = (msg: any, log: any) => {
    if (msg.content) {
        try {
            const messageContents = JSON.parse(msg.content.toString());
            const action = messageContents.action;
            const item = messageContents.item;

            switch (action) {
                case 'ADD' :
                    return SampleDataService.add(item)
                        .then(log.info('Item added via queue', item))
                        .then(() => msg)
                        .catch(error => {
                            log.info(error);
                            return msg;
                        });
                case 'UPDATE' :
                    return SampleDataService.add(item)
                        .then(log.info('Item updated via queue', item))
                        .then(() => msg)
                        .catch(error => {
                            log.info(error);
                            return msg;
                        });
                case 'REMOVE' :
                    return SampleDataService.add(item)
                        .then(log.info('Item removed via queue', item))
                        .then(() => msg)
                        .catch(error => {
                            log.info(error);
                            return msg;
                        });
                }
        } catch (error) {
            log.info(new Error(error + '  Failed parsing' + msg.content.toString()));
            return Promise.reject(msg);
        }
    } else {
        log.info(new Error('Invalid Message'));
    }
};
