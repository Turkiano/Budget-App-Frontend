import { UserTypes } from './User';

export type UserResponse = UserTypes & {
  User_id?: string;
  user_id?: string;
};

export type TransactionRecord = {
  transcation_Id?: string;
  Transcation_Id?: string;
  transcationId?: string;
  userId?: string | number;
  UserId?: string | number;
  user_id?: string | number;
  User_id?: string | number;
  transcation_type?: string;
  Transcation_type?: string;
  transcationType?: string;
  TranscationType?: string;
  description?: string;
  Description?: string;
  categoryId?: string | number;
  CategoryId?: string | number;
  category_id?: string | number;
  Category_id?: string | number;
  amount?: number | string;
  Amount?: number | string;
  date?: string;
  Date?: string;
};

// export type CategoryRecord = {
//   Category_id?: string | number;
//   category_id?: string | number;
//   CategoryId?: string | number;
//   categoryId?: string | number;
//   Name?: string;
//   name?: string;
// };

export type CategoryRecord = {
  category_id: string;
  name: string;
  category_type: string;
};
