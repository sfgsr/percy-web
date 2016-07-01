export default {
  formatNumber(value, options) {
    options = options || {precision: 0};
    return window.accounting.formatNumber(value, options.precision);
  },
  formatCurrency(value, options) {
    options = options || {precision: 2};
    return window.accounting.formatMoney(value, null, options.precision);
  }
};