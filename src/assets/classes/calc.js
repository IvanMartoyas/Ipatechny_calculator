class Tax {
    constructor() {
        this.ForDebit = 0;
        this.ForInterest = 0;
        this.taxDeductionAmountPayment = 0;
        this.procentRateTaxDeduction = 0.13;
    }
    log(text) {
        console.log(text);
    }
    calcTax(cost_Real_Estate, amountPaymentProcent) {
        if (cost_Real_Estate >= 2000000) {
            this.taxDeductionAmountPayment = 650000;
            this.ForDebit = 260000;
            this.ForInterest = 390000;
        }
        else {
            if ((cost_Real_Estate * this.procentRateTaxDeduction) > 260000) {
                this.ForDebit = 260000;
            }
            else {
                this.ForDebit = cost_Real_Estate * this.procentRateTaxDeduction;
            }
            if ((cost_Real_Estate * amountPaymentProcent) > 390000) {
                this.ForInterest = 390000;
            }
            else {
                this.ForInterest = cost_Real_Estate * amountPaymentProcent;
            }
            this.taxDeductionAmountPayment = this.ForInterest + this.ForDebit;
        }
        let result = {
            taxDeductionAmountPayment: this.taxDeductionAmountPayment,
            ForDebit: this.ForDebit,
            ForInterest: this.ForInterest,
            amountPaymentProcent: amountPaymentProcent
        };
        return result;
    }
}
const _Tax = new Tax();
class TimeDebit {
    log(text) {
        console.log(text);
    }
    createDate(period) {
        let dateT = new Date();
        dateT.getMonth();
        let DateDebit = [
            {
                month: dateT.getMonth() + 1,
                year: dateT.getFullYear(),
            }
        ];
        DateDebit[0].monthQuality = this.GetQualityDayOfMonth(0, DateDebit);
        for (let i = 1; i < period; i++) {
            let month = DateDebit[i - 1].month + 1;
            if (month == 13) {
                DateDebit.push({
                    month: 1,
                    year: DateDebit[i - 1].year + 1,
                });
                DateDebit[i - 1].year += 1;
            }
            else {
                DateDebit.push({
                    month: DateDebit[i - 1].month + 1,
                    year: DateDebit[i - 1].year,
                });
            }
            DateDebit[i].monthQuality = this.GetQualityDayOfMonth(i, DateDebit);
        }
        return DateDebit;
    }
    GetQualityDayOfMonth(indexOfArray, array) {
        let value = 0;
        switch (array[indexOfArray].month - 1) {
            case 0:
                value = 31;
                break;
            case 1:
                value = 28;
                break;
            case 2:
                value = 31;
                break;
            case 3:
                value = 30;
                break;
            case 4:
                value = 31;
                break;
            case 5:
                value = 30;
                break;
            case 6:
                value = 31;
                break;
            case 7:
                value = 31;
                break;
            case 8:
                value = 30;
                break;
            case 9:
                value = 31;
                break;
            case 10:
                value = 30;
                break;
            case 11:
                value = 31;
                break;
        }
        return value;
    }
}
const timeDebit = new TimeDebit();
export class Initial_calc {
    constructor() {
        this.DataCalc = {
            table: [],
            result: {}
        };
        this.cost_Real_Estate = 0;
        this.initial_Payment = 0;
        this.loan_Term = { value: 0, time: "08.08.2024" };
        this.interest_rate = 0;
        this.type_Payment = "anuity";
        this.period = 0;
    }
    init(data) {
        if (data.loan_Term.time == "year") {
            this.period = data.loan_Term.value * 12;
        }
        else {
            this.period = data.loan_Term.value;
        }
        this.cost_Real_Estate = data.cost_Real_Estate;
        this.initial_Payment = data.initial_Payment;
        this.loan_Term = data.loan_Term;
        this.type_Payment = data.type_Payment;
        this.interest_rate = data.interest_rate;
    }
    Calc() {
        if (this.type_Payment == "anuity") {
            this.CalcAnuity();
        }
        else if (this.type_Payment == "different") {
            this.CalcDifferentiated();
        }
    }
    ResetDataCalc() {
        this.DataCalc = {
            table: [],
            result: {}
        };
    }
    CalcAnuity() {
        this.ResetDataCalc();
        let DateDebit = timeDebit.createDate(this.period);
        let summ = this.cost_Real_Estate - this.initial_Payment;
        let month_rate = this.interest_rate / (100 * 12);
        let payment = 0;
        let KafPayment = 0;
        KafPayment = (month_rate * (Math.pow(1 + month_rate, this.period))) / (Math.pow(1 + month_rate, this.period) - 1);
        payment = summ * KafPayment;
        let amountPaymentProcent = this.cost_Real_Estate * 0.05;
        let Tax = _Tax.calcTax(this.cost_Real_Estate, amountPaymentProcent);
        this.DataCalc.result = {
            payment: Math.round(payment),
            typePayment: this.type_Payment,
            amountPaymentProcent: Tax.amountPaymentProcent,
            taxDeduction: {
                forDebit: Tax.ForDebit,
                forInterest: Tax.ForInterest,
                amountPayment: Tax.taxDeductionAmountPayment
            }
        };
        return console.log("this.DataCalc anuiti", this.DataCalc);
    }
    CalcDifferentiated() {
        this.ResetDataCalc();
        let DateDebit = timeDebit.createDate(this.period);
        let summ = this.cost_Real_Estate - this.initial_Payment;
        let month_rate = 0;
        let baseDebit = Math.round(summ / this.period);
        let Month_pay = 0;
        for (let i = 0; i < this.period; i++) {
            month_rate = ((this.interest_rate / 365) * DateDebit[i].monthQuality / 100);
            if (i == 0) {
                let debitProcent = (summ * month_rate);
                Month_pay = baseDebit + debitProcent;
                const date = new Date(DateDebit[i].year, DateDebit[i].month);
                const month = date.toLocaleString('default', { month: 'long' });
                this.DataCalc.table.push({
                    number_Month: i + 1,
                    date_Month: `${month}  ${DateDebit[i].year}`,
                    summ_Payment: Number((Month_pay).toFixed(2)),
                    payment_PrincipalDebt: Number((baseDebit).toFixed(2)),
                    interest_Payment: Number(debitProcent.toFixed(2)),
                    balance_Of_Debt: Number((summ - baseDebit).toFixed(2))
                });
            }
            else {
                let debitProcent = Number(this.DataCalc.table[i - 1].balance_Of_Debt * month_rate);
                Month_pay = baseDebit + debitProcent;
                const date = new Date(DateDebit[i].year, DateDebit[i].month);
                const month = date.toLocaleString('default', { month: 'long' });
                this.DataCalc.table.push({
                    number_Month: i + 1,
                    date_Month: `${month}  ${DateDebit[i].year}`,
                    summ_Payment: Number((Month_pay).toFixed(2)),
                    payment_PrincipalDebt: Number((baseDebit).toFixed(2)),
                    interest_Payment: Number(debitProcent.toFixed(2)),
                    balance_Of_Debt: Number((this.DataCalc.table[i - 1].balance_Of_Debt - baseDebit).toFixed(2))
                });
            }
        }
        let amountPaymentProcent = this.cost_Real_Estate * 0.05;
        let Tax = _Tax.calcTax(this.cost_Real_Estate, amountPaymentProcent);
        this.DataCalc.result = {
            typePayment: this.type_Payment,
            amountPaymentProcent: Tax.amountPaymentProcent,
            taxDeduction: {
                forDebit: Tax.ForDebit,
                forInterest: Tax.ForInterest,
                amountPayment: Tax.taxDeductionAmountPayment
            }
        };
    }
    renderTable() {
        let table = `
        <table class="table table-hover">
            <thead>
                <tr>
                    <th scope="col">№</th>
                    <th scope="col">Месяц</th>
                    <th scope="col">Сумма платежа</th>
                    <th scope="col">Основной долг</th>
                    <th scope="col">Проценты</th>
                    <th scope="col">Остаток долга</th>
                </tr>
            </thead>
            <tbody>`;
        let index = 0;
        this.DataCalc.table.forEach(month => {
            table += `
            <tr>
                <th>${month.number_Month}</th>
                <td>${month.date_Month}</td>
                <td>${month.summ_Payment.toLocaleString()}</td>
                <td>${month.payment_PrincipalDebt.toLocaleString()}</td>
                <td>${month.interest_Payment.toLocaleString()}</td>
                <td>${month.balance_Of_Debt.toLocaleString()}</td>
            </tr>
          `;
        });
        table += `</tbody> </table>`;
        return table;
    }
    renderCart() {
    }
    startCalc(data) {
        this.init(data);
        this.Calc();
        return this.renderCart();
    }
    test(message) {
        console.log(message);
    }
}
