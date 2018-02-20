import * as morgan from 'morgan';

export let getMorgan = (environment: string) => morgan(environment);

/**
 * Dev only logging statements with more info than bunyan
 */
export default (config: any) => {
    return config.NODE_ENV === 'development' ?
        getMorgan('dev') : getMorgan('common');
};