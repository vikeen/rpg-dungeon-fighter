import React from "react";
import {v4 as uuidv4} from "uuid";

class ActivityLog {
    static DEBUG = "debug"

    constructor() {
        this.logs = []
    }

    debug(...args) {
        this.logs.push({
            uuid: uuidv4(),
            type: ActivityLog.DEBUG,
            message: args.join(" ")
        })
    }

    printToConsole() {
        this.logs.forEach(l => console.log(l.message))
    }

    render() {
        return (
            <code>
                {this.logs.map(l => {
                    return (
                        <div key={l.uuid}>
                            <span>{l.message}</span><br/>
                        </div>
                    )
                })}
            </code>
        )
    }
}

export default ActivityLog
