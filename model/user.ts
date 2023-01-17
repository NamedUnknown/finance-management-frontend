export interface User {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  birthDay: Date;
  created: Date;
  enabled: boolean;
  authorities: Array<string>
}