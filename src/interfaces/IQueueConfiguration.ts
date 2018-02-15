interface IQueueConfiguration {
    APP_NAME: string;
    RABBITHOST: string;
    RABBITPORT: number;
    VHOST: string;
    EXCHANGENAME: string;
    QUEUENAME: string;
    EXCHANGETYPE: string;
    QUEUECREDENTIALS: string;
}

export default IQueueConfiguration;