export interface MassiveConnectOptions {
    /**
     * server name or IP address
     */
    host: string;
    /**
     * server port number
     */
    port: number;
    /**
     * database name
     */
    database: string;
    /**
     * user name
     */
    user: string;
    /**
     * user password, or a function that returns one
     */
    password: string;
    /**
     * use SSL (it also can be a TSSLConfig-like object)
     */
}