export class FeeCalc {
    
    /// calculcations to be done
    svaCalc(income) {
        const SVA_BASE_MAX :number = 71820
        const SVA_SUM_MIN :number = 2050.2

        // 27,68% = 18,5% Pensions- + 7,65% Krankenversicherung +  1,53% Vorsorge
        // 9,60 ist der monatliche Unfallversicherungsbeitrag
        let base = Math.min(income, SVA_BASE_MAX)
        let sva_sum: number = (base * 0.2768) + (9.6 * 12)

        return Math.max(sva_sum, SVA_SUM_MIN)
    }

    estCalc(income) {
        let tax: number = 0;

        const BASE_TAX = [
            { min:      0, max: 11000,   rate: 0 },
            { min:  11000, max: 18000,   rate: 0.25 },
            { min:  18000, max: 31000,   rate: 0.35 },
            { min:  31000, max: 60000,   rate: 0.42 },
            { min:  60000, max: 90000,   rate: 0.48 },
            { min:  90000, max: 100000,  rate: 0.50 },
            { min: 100000, max: Infinity,rate: 0.55 },
        ]

        let i = 0;
        for (let base of BASE_TAX) {
            let range = 0;
            if (base.max !== Infinity) {
                range = base.max - base.min
            }
            if (range === 0 || income <= 0) return tax

            let base_sum: number = 0
            if(base.max !== Infinity) {
                base_sum = Math.min(income, range)
            }
            
            income -= base_sum
            tax += base_sum * base.rate

            console.log(base.rate, base_sum, tax, income, range)
        }

        return tax 
    }
}