import { Publisher, ExpirationCompleteEvent, Subjects } from "@lab2ubt/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}

