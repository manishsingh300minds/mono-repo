import bcrypt from 'bcrypt';

export function hash(password: string) {
  const saltRounds = 10;
  return bcrypt.hashSync(password, saltRounds);
}

export function hashCompare(password: string, secondPassword: string) {
  return bcrypt.compareSync(password, secondPassword);
}
