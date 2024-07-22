export class CreateUserDto {
  readonly email: string;
  readonly username: string;
  readonly password: string;
  readonly name: string;
  readonly type: 'seller' | 'buyer';
}
