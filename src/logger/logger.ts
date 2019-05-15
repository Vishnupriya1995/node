import { createLogger, format, transports } from "winston";
import LogConfig from "./loggerConfig";

export const log = createLogger({
    exitOnError: false,
    format: format.combine(
        format.timestamp({
            format: "YYYY-MM-DDTHH:mm:ss"
        }),
        format.simple()
    ),
    transports: [
        new transports.File(LogConfig.getFileConfig()),
        new transports.Console(LogConfig.getConsoleConfig())
    ]
});
