interface EventMetadata {
  timestamp: Date;
  eventName: string;
}

export abstract class SystemEvent<PAYLOAD_TYPE> {
  payload: PAYLOAD_TYPE;
  metadata: EventMetadata;

  constructor(eventName: string, payload: PAYLOAD_TYPE) {
    this.metadata = { timestamp: new Date(), eventName };
    this.payload = payload;
  }
}
