import {LogDTO} from './logDTO';

export class UserDTO {
  id!: number;
  username!: string;
  email!: string;
  createdAt!: string;
  role!: string;
  subscription!: string;

  algos!: string[];
  logs!: LogDTO[];
  expiration!: string;
}
