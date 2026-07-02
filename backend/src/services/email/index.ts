import { ConsoleEmailService } from "./mock";
import type { EmailService } from "./types";

export type { EmailService, EmailMessage, SendResult } from "./types";

/**
 * Resolve the active email service. Phase 0 always uses the console mock; a
 * real provider is selected here in Phase 6 (e.g. when RESEND_API_KEY is set).
 */
export function getEmailService(): EmailService {
  return new ConsoleEmailService();
}
