export class SvaCalc {
    
    /// calculcations to be done
    calc(income) {
        // 27,68% = 18,5% Pensions- + 7,65% Krankenversicherung +  1,53% Vorsorge
        // 9,60 ist der monatliche Unfallversicherungsbeitrag
        return (income * 0.2768) + (9.6 * 12);
    }
}