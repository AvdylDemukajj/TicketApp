import { Publisher, Subjects, TicketUpdatedEvent } from '@lab2ubt/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
