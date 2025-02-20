import { Injectable } from "@angular/core";
@Injectable()
export class FeeCalc {

    /// calculcations to be done
    svaCalc(income) {
        const SVA_BASE_MAX: number = 90_300
        const SVA_SUM_MIN: number = 1_817.88

        // 26,83% = 18,5% Pensions- + 6,8% Krankenversicherung +  1,53% Vorsorge
        // 12,07 ist der monatliche Unfallversicherungsbeitrag
        const base = Math.min(income, SVA_BASE_MAX)
        const sva_sum: number = (base * 0.2683) + (12.07 * 12)

        return Math.max(sva_sum, SVA_SUM_MIN)
    }

    estCalc(income) {
        let tax: number = 0;

        const BASE_TAX: { min: number, rate: number }[] = [
            { min: 0, rate: 0 },
            { min:  13_308, rate: 0.20 },
            { min:  21_617, rate: 0.30 },
            { min:  35_836, rate: 0.40 },
            { min:  69_166, rate: 0.48 },
            { min:  103_072, rate: 0.50 },
            { min: 1_000_000, rate: 0.55 },
        ]


        BASE_TAX.forEach((base, index) => {
            let range = 0;

            const isLastBase = index === BASE_TAX.length - 1;
            const max = isLastBase ? Infinity : BASE_TAX[index + 1].min;
            if (max !== Infinity) {
                range = max - base.min
            } else {
                range = income
            }
            if (range === 0 || income <= 0) {
                return
            }

            const base_sum = Math.min(income, range)

            income -= base_sum
            tax += base_sum * base.rate
        });

        return tax
    }
}
