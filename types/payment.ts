export type PaymentMethodType = {
  method: "card" | "upi" | "cod";
  cardNumber?: string;
  expiry?: string;
  cvv?: string;
  upiId?: string;
};
