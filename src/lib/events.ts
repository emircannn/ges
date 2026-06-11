import { EventEmitter } from "events";

const globalForEvents = global as unknown as { eventEmitter: EventEmitter };

export const eventEmitter = globalForEvents.eventEmitter || new EventEmitter();

globalForEvents.eventEmitter = eventEmitter;
