import { DateTime } from '../../common/interfaces/datetime.interface'

export interface User extends DateTime{
  // TODO transform ID types to number? or specific type
  id: string;
  display_name: string;  
  email: string;
  // full_name: string;
  // is_email_verified: boolean;
  // password: string;
  // phone: string;
  // language: string;
  // status: string;
  // is_admin: boolean;
  // first_login_at: string;
  // last_login_at: string;
}