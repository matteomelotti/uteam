import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import BaseService from '../../services/base.service.js';
import ChatService from '../chats/chat.service.js';
import User from './user.model.js';

class UsersService extends BaseService {
  getModel() {
    return User;
  }

  async create(data) {
    let sendForgot = false;
    let sendConfirm = false;
    if (data.password && data.password !== '') {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(data.password, salt);
      data.password = hash;
    } else {
      data.passwordResetToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      data.passwordResetExpires = new Date(Date.now() + 3600000);
      sendForgot = true;
    }
    if (!data.active) {
      data.confirmationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      sendConfirm = true;
    }
    data.sso = uuidv4();
    const user = new User(data);
    await user.save();
    await ChatService.create({ user: user._id, chats: [] });
    if (sendForgot) {
      // EmailService.forgotPasswordLink(data)
    }
    if (sendConfirm) {
      // EmailService.sendActivationEmail(data)
    }
    return user;
  }

  async update(userId, data) {
    const updateData = { ...data };
    // if (data.password) {
    //   const salt = bcrypt.genSaltSync(10)
    //   const hash = bcrypt.hashSync(data.password, salt)
    //   updateData.password = hash
    // }

    const user = await User.updateOne(
      { _id: userId },
      { updateData },
      { new: true }
    );

    return user;
  }

  async activate(userId) {
    const { active } = await User.findOne({ _id: userId });
    const user = await User.updateOne(
      { _id: userId },
      { active: !active },
      { new: true }
    );

    return user;
  }

  async updatePassword(userId, password) {
    const user = await this.byId(userId, {});
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    user.password = hash;
    await user.save();
  }
}

export default new UsersService();
