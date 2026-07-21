export interface NegotiationNote {
  id: string;

  leadId: string;

  userId: string;

  note: string;

  createdAt: string;

  user: {
    id: string;
    email: string;
    role: string;
  };
}

export interface CreateNegotiationNoteRequest {
  leadId: string;
  note: string;
}