import { Request, Response } from 'express';
import db from '../../prisma';
import { hash } from "@server/utils/hash";
import { generateToken } from "@server/utils/jwt";

import bcrypt from 'bcrypt';


export const createAdmin = async (req: Request, res: Response) => {
  const admin = await db.admin.create({
    data: {
      ...req.body,
      password: hash(req.body.password)
    }
  });
  res.status(201).json(admin);
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const admin = await db.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = generateToken({email, password})

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
