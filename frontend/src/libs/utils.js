const formatMoney = (locale, currency = 'EUR', number) => {
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: currency }).format(number)
}

export { formatMoney }
