import { Subjects, Publisher, PaymentCreatedEvent } from "@lab2ubt/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
   subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}


