const en = {
  webhookService: {
    paymentSuccessful: {
      subject: '[UTeam] Payment completed',
      message: 'Congratulations, your subscription has been renewed.',
      messageAdmin: '%{email} - %{subdomain} paid a subscription.'
    },
    newSubscription: {
      subject: '[UTeam] New subscription activated',
      message: 'Congratulations, your subscription has been activated.',
      messageAdmin: '%{email} - %{subdomain} activated a subscription.'
    },
    subscriptionUpdated: {
      subject: '[UTeam] Subscription updated',
      message: 'Congratulations, your subscription has been updated.',
      messageAdmin: '%{email} - %{subdomain} updated a subscription.'
    },
    paymentFailed: {
      subject: '[UTeam] Payment failed',
      message: 'Dear user, your payment wasn\'t successful. Please go to this <a href="%{stripeHostedInvoiceUrl}" target="_blank">url</a> to pay your subscription, otherwise your subscription will be deactivated on %{date}.',
      messageAdmin: '%{email} - %{subdomain} has a failed payment. His subscription will be deactivated on %{date}.'
    }
  },
  authService: {
    signup: {
      subject: '[UTeam] New subscriber',
      messageAdmin: '%{email} - %{subdomain} has been subscribed.'
    }
  },
  subscriptionService: {
    runNotifyExpiringTrials: {
      subject: '[UTeam] Trial version is expiring in %{daysToExpire} day/s',
      message: 'Dear user, your trial period is exipring in %{daysToExpire} day/s. Please login and subscribe to a plan.'
    },
    runNotifyPaymentFailed: {
      subject: '[UTeam] Subscription will be deactivated in %{daysToExpire} day/s',
      message: 'Dear user, due to a failed payment your subscription will be deactivated on %{date}. Please login and check your credit card.'
    }
  }
}

export default en
