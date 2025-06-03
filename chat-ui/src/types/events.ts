type ActionApprovalEventDetail = {
  messageId: string;
  isApproved: boolean;
};

export class ActionApprovalEvent extends CustomEvent<ActionApprovalEventDetail> {
  constructor(messageId: string, isApproved: boolean) {
    super('action-approval', { detail: { messageId, isApproved } });
  }
}
