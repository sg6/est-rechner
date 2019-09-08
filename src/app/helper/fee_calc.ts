export class FeeCalc {

    /// calculcations to be done
    svaCalc(income) {
        const SVA_BASE_MAX: number = 73080
        const SVA_SUM_MIN: number = 2062.2

        // 27,68% = 18,5% Pensions- + 7,65% Krankenversicherung +  1,53% Vorsorge
        // 9,79 ist der monatliche Unfallversicherungsbeitrag
        const base = Math.min(income, SVA_BASE_MAX)
        const sva_sum: number = (base * 0.2768) + (9.79 * 12)

        return Math.max(sva_sum, SVA_SUM_MIN)
    }

    estCalc(income) {
        let tax: number = 0;

        const BASE_TAX = [
            { min:      0, max: 11000,    rate: 0 },
            { min:  11000, max: 18000,    rate: 0.25 },
            { min:  18000, max: 31000,    rate: 0.35 },
            { min:  31000, max: 60000,    rate: 0.42 },
            { min:  60000, max: 90000,    rate: 0.48 },
            { min:  90000, max: 1000000,   rate: 0.50 },
            { min: 1000000, max: Infinity, rate: 0.55 },
        ]


        for (const base of BASE_TAX) {
            let range = 0;
            if (base.max !== Infinity) {
                range = base.max - base.min
            } else {
                range = income
            }
            if (range === 0 || income <= 0) {
                return tax
            }

            const base_sum = Math.min(income, range)

            income -= base_sum
            tax += base_sum * base.rate
        }

        return tax
    }
}
