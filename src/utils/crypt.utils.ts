import * as bcrypt from 'bcryptjs';

export const encryptData = (data: string): string => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(data, salt);

  return hash;
};

export const verifyData = (data: string, hash: string): Boolean => bcrypt.compareSync(data, hash);
