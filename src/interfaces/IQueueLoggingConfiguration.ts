interface IQueueLoggingConfiguration {
    APP_NAME: string;
    LOGS_V_HOST: string;
    LOGS_RABBIT_PORT: number;
    LOGS_RABBIT_HOST: string;
    LOGS_EXCHANGE_NAME: string;
    LOGS_QUEUE_NAME: string;
    LOGS_EXCHANGE_TYPE: string;
    LOGS_QUEUE_CREDENTIALS: string;
}

export default IQueueLoggingConfiguration;