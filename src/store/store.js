import Vue from 'vue';
import Vuex from 'vuex';



import calculation_mortgage from './_calc.js'; // вычисляет ипатеку

export default new Vuex.Store({
    
    modules: {
        calculation_mortgage
    }
  })