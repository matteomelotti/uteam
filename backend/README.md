# uteam Boilerplate

This project contains everything you need to setup a fully featured SaaS API in 5 minutes.

# Installation

Make sure you have MongoDB (4+) installed and running.

Then make sure you have Node installed. Version `14` or higher is required.

Install all dependencies by running

```bash
npm install
```

Copy `.env.example` into `.env`.

Store email templates on database by typing:

```bash
npm run store:emails
```

Finally, run the APIs by typing:

```bash
npm run dev
```

# Configuring .env

Below the meaning of every environment variable you can setup.

`PORT=":3000"` the API server port number

`LOG_LEVEL="debug"` set info on the production environment

`DEBUG=true` set false in production

`JWT_SECRET="aaabbbccc"` set this value secrect, very long and random

`JWT_EXPIRE="1d"` # how long the JWT token last

`DEFAULT_LOCALE="en"` the default locale for registered users

`AVAILABLE_LOCALES=en it` an array of available locales for translations

`LOCAL_MONGO_CONNECTION='mongodb://uteam-mongo:27017/uteam-db'` the MongoDB connection string

`REDIS_HOST=""` Redis server host
`REDIS_PORT=""` Redis server port

`DEFAULT_EMAIL_FROM="noreply@test.com"` send every notification email from this address

`MAILER_HOST='localhost'` the SMTP server host
`MAILER_PORT=1025` the SMTP server port
`MAILER_USERNAME='foo'` the SMTP server username
`MAILER_PASSWORD='bar'` the SMTP server password

`STRIPE_SECRET_KEY="sk_test_xyz"` the Stripe secret key

`NOTIFIED_ADMIN_EMAIL="info@test.com"` we notify admins when some events occur, like a new subscription, a failed payment and so on

`FATTURA24_KEY="XYZ"` the Fattura 24 secret key (Italian market only)

`FRONTEND_LOGIN_URL="http://localhost:3000/auth/login"` raplace http://localhost:3000 with the real production host of the React frontend

`TRIAL_DAYS=15` how many days a new user can work without subscribing

`PAYMENT_FAILED_RETRY_DAYS=7` how many days a user can work after the first failed payment (and before Stripe cancel the subscription)

# Features

### API and Frontend

- user registration of account with subdomain, email and password
- user email activation with 6 characters code and account creation
- resend activation code if not received
- user password reset through code sent by email
- user login
- user logout
- user change password once logged in

### API only

- account's users list (by admins only)
- account's user create (by admins only)
- account's user update (by admins only)
- stripe webhooks handling
- events notifications by email:
  - new user subscribed
  - succesful payments
  - failed payments
- daily notifications by email:
  - expiring trials
  - failed payments
  - account suspension due to failed payments

### CREDITS

Author: Matteo Melotti <matteo.melotti11@gmail.com>
