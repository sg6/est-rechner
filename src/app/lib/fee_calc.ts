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
       return income * 0.2 
    }
}