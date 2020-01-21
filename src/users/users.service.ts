import { Injectable } from "@nestjs/common";

export type User = any;

@Injectable()
/**
 * User Service for auth
 * WARNING: for the technical test I use a hard-coded in-memory list of users.
 * THis is juste for the purpose of the test and that i don't have the time for create a persistance layer for store our users
 * See it like a mock of a user table in a database
 */
export class UsersService {
  private readonly users: User[];

  constructor() {
    this.users = [
      {
        userId: 1,
        username: "BCM",
        password: "bcmenergy"
      },
      {
        userId: 2,
        username: "planete-oui",
        password: "planetoui"
      }
    ];
  }

  /**
   * Find an user by it's username
   * @param username
   */
  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}
