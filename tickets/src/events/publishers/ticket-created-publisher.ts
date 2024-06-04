import { Publisher, Subjects, TicketCreatedEvent } from '@lab2ubt/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
