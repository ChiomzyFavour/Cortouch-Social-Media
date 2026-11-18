export class ApprovePostDto {
  feedbackNote?: string;
  authorName?: string;
  role?: 'client' | 'agency';
}

export class RequestChangesDto {
  feedbackNote!: string;
  authorName?: string;
  role?: 'client' | 'agency';
}

export class AddCommentDto {
  text!: string;
  author!: string;
  authorRole!: 'client' | 'agency';
}
