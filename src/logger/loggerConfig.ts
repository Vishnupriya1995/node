export default  class  LogConfig{
    private static logFile:any={
        level: "debug",
        filename: "/tmp/blobb-app.log",
        handleExceptions: true,
        json: false,
        maxsize: 10485760,
        maxfiles: 5000
    };
    private static logConsole:any={
        level: "debug",
        handleExceptions: true,
        json: false,
        colorize: true
    };
    static getFileConfig():any{
        return this.logFile;
    }
    static getConsoleConfig(){
        return this.logConsole;
    }

}