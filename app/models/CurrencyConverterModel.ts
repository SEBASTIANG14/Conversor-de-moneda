export class CurrencyConverterModel {
  private exchangeRates: Record<string, number>;

  constructor(rates: Record<string, number>) {
    this.exchangeRates = rates;
  }

  convert(amount: number, from: string, to: string): number {
    if (!this.exchangeRates[from] || !this.exchangeRates[to]) {
      throw new Error("Moneda no soportada");
    }
    return (amount / this.exchangeRates[from]) * this.exchangeRates[to];
  }
}
