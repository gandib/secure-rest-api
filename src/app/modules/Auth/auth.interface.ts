export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  transactionId?: string;
  paymentStatus?: string;
  isDeleted: boolean;
}
