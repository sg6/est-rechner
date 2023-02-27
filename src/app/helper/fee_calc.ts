import { Injectable } from "@angular/core";
@Injectable()
export class FeeCalc {

    /// calculcations to be done
    svaCalc(income) {
        const SVA_BASE_MAX: number = 75180
        const SVA_SUM_MIN: number = 1856.64

        // 27,68% = 18,5% Pensions- + 7,65% Krankenversicherung +  1,53% Vorsorge
        // 9,79 ist der monatliche Unfallversicherungsbeitrag
        const base = Math.min(income, SVA_BASE_MAX)
        const sva_sum: number = (base * 0.2768) + (9.79 * 12)

        return Math.max(sva_sum, SVA_SUM_MIN)
    }

    estCalc(income) {
        let tax: number = 0;

        const BASE_TAX: { min: number, rate: number }[] = [
            { min: 0, rate: 0 },
            { min:  11_000, rate: 0.20 },
            { min:  18_000, rate: 0.30 },
            { min:  31_000, rate: 0.41 },
            { min:  60_000, rate: 0.48 },
            { min:  90_000, rate: 0.50 },
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
