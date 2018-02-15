import * as morgan from 'morgan';

/**
 * Dev only logging statements with more info than bunyan
 */
export default (config: any) => {
    return config.NODE_ENV === 'development' ?
        morgan('dev') : morgan('common');
};