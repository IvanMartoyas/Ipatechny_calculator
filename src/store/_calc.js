// // import js calc classes
import {Initial_calc} from '../assets/classes/calc';
const Calc = new Initial_calc();

export default {
  state: {
      count: 0,
      dataCalc: {},
  },
  actions: {
    startCalc({state},data) {
      
      Calc.startCalc(data);
      let dataCalc = Calc.DataCalc;

      if(dataCalc.result.typePayment == 'anuity') {

        dataCalc.globalStatistik = {
          type_Payment: dataCalc.result.typePayment,
          summPayment: {
            firstPay:  dataCalc.result.amountPaymentProcent
          },
          taxDeduction: dataCalc.result.taxDeduction,
        }

      } else { // different

        // кастыль решает проблему отрицательного остатака долга в последнем месяце
        let length = dataCalc.table.length-1;
        dataCalc.table[length].balance_Of_Debt = 0;

        dataCalc.globalStatistik = {
          type_Payment: dataCalc.result.typePayment,
          summPayment: {
            firstPay:  dataCalc.table[0].summ_Payment,
            lastPay: dataCalc.table[dataCalc.table.length -1].summ_Payment
          },
          taxDeduction: dataCalc.result.taxDeduction,
        }

        dataCalc.result.tableResultStart = dataCalc.table.slice(0, 5);
        dataCalc.result.tableResultEnd = dataCalc.table.slice(-5);

      }

      state.dataCalc = dataCalc;    
    }
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  getters: {
      count: state => state.count,
      getDataCalcMortgage: state => state.dataCalc,

  }
  
}