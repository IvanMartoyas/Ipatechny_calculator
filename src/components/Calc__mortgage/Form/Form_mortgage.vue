<template>
    <div class="formAndOther__half">
        <form action="#" class="form_calculator">
            <div class="form__row">
                <div class="errorFildMessage" v-if="error.cost_Real_Estate != ''">{{error.cost_Real_Estate}}</div>
                <label for="cost_Real_Estate">Стоимость недвижимости</label>
                <input type="number" class="form-control" id="cost_Real_Estate" v-model="cost_Real_Estate" />
            </div>
            <div class="form__row">
                <div class="errorFildMessage" v-if="error.initial_Payment != ''">{{error.initial_Payment}}</div>
                <label for="initial_Payment">Первоначальный взнос</label>
                <input type="number" class="form-control" id="initial_Payment" v-model="initial_Payment" />
            </div>
    
            <div class="form__row">
                <div class="errorFildMessage" v-if="error.loan_Term != ''">{{error.loan_Term}}</div>
                <div class="calc__loan_Term form__flex">
                    <div class="form__row--item3">
                        <label for="loan_Term">Срок кредита</label>
                        <input type="number" class="form-control" id="loan_Term"  v-model="loan_Term.value" />
                    </div>
                    <Select 
                        :data="[
                             {
                                name: 'Месяцев', 
                                value: 'month'
                            },
                            {
                                name: 'Лет', 
                                value: 'year'
                            },
                        ]"
                        :title ="'Выберите срок'"
                        @selectResult="set_term"
                    ></Select>
                </div>
            </div>
            <div class="form__row">
                <div class="errorFildMessage" v-if="error.interest_rate != ''">{{error.interest_rate}}</div>
                <label for="interest_rate">Процентная ставка</label>
                <input type="number" id="interest_rate" class="form-control" v-model="interest_rate" />
            </div>
            <div class="">
                <div class="errorFildMessage" v-if="error.type_Payment != ''">{{error.type_Payment}}</div>
                <div class="form__row">
                    <Select 
                        :data="[
                            {
                                name: 'Ануитетный', 
                                value: 'anuity'
                            },
                            {
                                name: 'Дифференцированный', 
                                value: 'different'
                            }
                        ]"
                        :title ="'Выберите cпособ платежа'"
                        @selectResult="set_type_Payment"
                    ></Select>
                </div>
            </div>
            <button v-on:click.prevent="calc__send " class="">Расчитать</button>
        </form>
    </div>
</template>
<script>
import Select from '@/components/Calc__mortgage/Form/Custom_select.vue';
export default {
    name: 'Form_mortgage',
    components: {
        Select
    },
    data() {
        return {
            interest_rate: 22, // процентная ствака
            cost_Real_Estate: 3000000, // стоимость кредита
            loan_Term: {
                value: 30,   // срок кредита
                time: "year" // период
            },
            initial_Payment: 303000,//Первоначальный взнос
            type_Payment: "anuity",// different | anuity Аунуитет или диференцированный

            error: {
                cost_Real_Estate: "",
                initial_Payment: "",
                loan_Term: "",
                interest_rate: "",
                type_Payment: ""
            },
            
            // result
            tableResult: '',
            tableResultStart: "",
        }
    },
    methods: {
        calc__send() {
            //Oобрабодка ошибок
            if(this.cost_Real_Estate == "") {
                this.error.cost_Real_Estate = "Ошибка заполнения";
                return this.errorMessageClose();
            }
            if(this.loan_Term == "") {
                this.error.loan_Term = "Ошибка заполнения";
                return this.errorMessageClose();
            }
            if(this.interest_rate == "") {
                this.error.interest_rate = "Ошибка заполнения";
                return this.errorMessageClose();
            }
            if(this.type_Payment == "") {
                this.error.type_Payment = "Ошибка заполнения";
                return this.errorMessageClose();
            }

            this.$store.dispatch("startCalc", {
                cost_Real_Estate: this.cost_Real_Estate,
                initial_Payment:  this.initial_Payment, 
                loan_Term:        this.loan_Term,
                interest_rate:    this.interest_rate,
                type_Payment:     this.type_Payment
            })
        },
        errorMessageClose() {
            setTimeout(()=>{
                this.error = {
                    cost_Real_Estate: "",
                    initial_Payment: "",
                    loan_Term: "",
                    interest_rate: "",
                    type_Payment: ""
                }
            }, 5000);
        },
        create() {
            this.tableResult = initial_calc.renderTable();
        },
        set_type_Payment(value) {
          
            this.type_Payment = value;
            this.$forceUpdate();
        },
        set_term(value) {
      
            this.loan_Term.time = value;
            this.$forceUpdate();
        }
    }
}
</script>
<style lang="scss">
    @import '@/assets/css/form.scss'; 
</style>