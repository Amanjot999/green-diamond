/**
 * Service layer barrel (SPEC §5). UI and route handlers import provider
 * accessors from here — never a vendor SDK or mock implementation directly.
 */
export { getPaymentProvider, type PaymentProvider } from "./payment";
export {
  getShippingProvider,
  type ShippingProvider,
  type CourierOption,
  type TrackingEvent,
} from "./shipping";
export { getEmailService, type EmailService } from "./email";
