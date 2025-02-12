import { makeAutoObservable } from "mobx";

class EventStore {
    eventId: number | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setEventId(id: number) {
        this.eventId = id;
    }
}

export const eventStore = new EventStore();
