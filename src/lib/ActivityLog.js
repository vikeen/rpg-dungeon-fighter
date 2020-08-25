import React from "react";
import _ from 'lodash'
import {v4 as uuidv4} from "uuid";

class ActivityLog {
    static DEBUG = "debug"

    constructor() {
        this.logs = []
    }

    debug(...args) {
        const message = args.map((arg) => {
            if (_.isArray(arg)) {
                return arg.join(", ")
            } else if (_.isObject(arg)) {
                return JSON.stringify(arg)
            } else {
                return arg
            }
        }).join(" ")

        this.logs.push({
            uuid: uuidv4(),
            type: ActivityLog.DEBUG,
            message
        })
    }

    printToConsole() {
        this.logs.forEach(l => console.log(l.message))
    }

    render() {
        return (
            <code>
                <ol>
                    {this.logs.map(l => <li key={l.uuid}>{l.message}</li>)}
                </ol>
            </code>
        )
    }
}

export default ActivityLog
