import _ from 'lodash';
import UserValidator from '../users/user.validator.js';
import AuthService from './auth.service.js';

class Controller {
  async signup(req, res, next) {
    const userData = _.pick(req.body, [
      'email',
      'password',
      'firstName',
      'lastName',
    ]);
    userData.language =
      req.body.language || process.env.DEFAULT_LOCALE;
    const userErrors = await UserValidator.onSignup(userData);
    if (userErrors) {
      return res.status(422).json({
        success: false,
        errors: userErrors.details,
      });
    }
    if (process.env.SIGNUP_WITH_ACTIVATE) {
      const signupResponse = await AuthService.signupWithActivate(
        userData
      );
      return res.json(signupResponse);
    } else {
      const signupResponse = await AuthService.signup(userData);
      return res.json(signupResponse);
    }
  }

  async manualSignup(req, res, next) {
    const userData = _.pick(req.body, [
      'email',
      'password',
      'firstName',
      'lastName',
    ]);
    userData.active = true;

    return res.json({
      success: true,
      message: 'created',
    });
  }

  async activateAccount(req, res) {
    const userErrors = await UserValidator.onActivate(req.body);
    if (userErrors) {
      return res.status(422).json({
        success: false,
        errors: userErrors.details,
      });
    }
    const user = await AuthService.activate(
      req.body.token,
      req.body.email
    );
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Failed to activate account - No account found',
      });
    }
    return res.json({
      success: true,
    });
  }

  async resendActivation(req, res) {
    const errors = await UserValidator.onResendActivation(req.body);
    if (errors) {
      return res.status(422).json({
        success: false,
        errors: errors.details,
      });
    }
    const user = await AuthService.resendActivation(req.body.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Account not found or already activated',
      });
    }
    return res.json({
      success: true,
    });
  }

  async login(req, res) {
    const error = await UserValidator.onLogin(req.body);
    if (error) {
      return res.status(422).json(error.details);
    }
    const token = await AuthService.login(
      req.body.email,
      req.body.password
    );
    if (token) {
      return res.json({
        success: true,
        message: 'Enjoy your tokens!',
        token: token,
      });
    } else {
      return res
        .status(401)
        .json({ message: 'Email or password invalid' });
    }
  }

  async forgotPassword(req, res, next) {
    const errors = await UserValidator.forgotPassword(req.body);
    if (errors) {
      return res.status(422).json({
        success: false,
        message: 'Please use a valid e-mail address!',
        errrors: errors.details,
      });
    }
    const user = await AuthService.forgotPassword(req.body.email);
    if (!user) {
      return res.status(404).json({ message: 'Email not found' });
    }
    return res.json({
      success: true,
      message:
        'We sent You an email with link to change Your password.',
    });
  }

  async resetPassword(req, res, next) {
    const errors = await UserValidator.onResetPassword(req.body);
    if (errors) {
      return res.status(422).json({
        success: false,
        message: 'Failed to update password',
        errors: errors.details,
      });
    }
    const done = await AuthService.resetPassword(
      req.body.passwordResetToken,
      req.body.password,
      req.body.email
    );
    if (done) {
      return res.json({
        success: true,
        message: 'Successfully changed password!',
      });
    } else {
      return res.status(422).json({
        success: false,
        message:
          'Failed to find user with the provided reset password token.',
      });
    }
  }

  async refreshToken(req, res) {
    const token = await AuthService.login(req.user.email, null, true);
    if (token) {
      return res.json({
        success: true,
        message: 'Enjoy your tokens!',
        token: token,
      });
    }
  }

  async deleteRefreshToken(req, res) {
    if (
      await AuthService.checkRefreshToken(
        req.body.email,
        req.body.refreshToken
      )
    ) {
      await AuthService.deleteToken(req.body.email);
      return res.json({
        success: true,
        message: 'Refresh token deleted.',
      });
    }
    return res
      .status(401)
      .json({ message: 'Email or refresh token invalid' });
  }

  async ssoLogin(req, res) {
    const error = await UserValidator.onSso(req.body);
    if (error) {
      return res.status(422).json(error.details);
    }
    const tokens = await AuthService.ssoLogin(req.body.sso);
    if (tokens) {
      return res.json({
        success: true,
        message: 'Enjoy your tokens!',
        token: tokens.token,
        refreshToken: tokens.refreshToken,
      });
    } else {
      return res
        .status(401)
        .json({ message: 'Email or sso invalid' });
    }
  }
}
export default new Controller();
