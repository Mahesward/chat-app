/* eslint-disable consistent-return */
import bcrypt from 'bcrypt';
import { USER } from '../models/index.js';

/* *-------------------controllers------------------------* */

//* Signup Controller

export const signup = async (req, res) => {
  try {
    let { password } = req.body;
    const { name, email } = req.body;
    const userExists = await USER.findOne({ email });
    console.log(userExists);
    if (userExists) return res.status(400).send({ success: false, message: 'User Already Exists' });

    password = await bcrypt.hash(password, 10);

    const userData = { name, password, email };
    const newUser = new USER(userData);
    newUser
      .save()
      .then((response) => res.status(200).send({ success: true, message: 'User signup successful', id: response._id }));
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};

//* Login Controller

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await USER.findOne({ email });
    if (!user) return res.status(400).send({ success: false, message: 'Invalid Email Address' });

    const validPassword = bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send({ success: false, message: 'Password does not match' });

    res.status(200).send({
      success: true,
      message: 'login successful',
      id: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: 'Internal Server Error' });
  }
};
