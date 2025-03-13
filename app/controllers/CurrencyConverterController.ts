import { CurrencyConverterModel } from "../models/CurrencyConverterModel";

export class CurrencyConverterController {
  private model: CurrencyConverterModel;

  constructor(model: CurrencyConverterModel) {
    this.model = model;
  }

  convertCurrency(amount: number, from: string, to: string): string {
    try {
      const result = this.model.convert(amount, from, to);
      return `${amount} ${from} = ${result.toFixed(2)} ${to}`;
    } catch (error) {
      return "Error en la conversión";
    }
  }
}
