export interface User {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDay: Date | string;
  created: Date | string;
  enabled: boolean;
  authorities: Array<string>
}