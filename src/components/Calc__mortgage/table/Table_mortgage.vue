<template>
    <div v-if="globalStatistik != null">
        
        <div class="container tableCalc" v-if="globalStatistik.type_Payment == 'different'"  >
            <div v-if="full_show">
              
                    <div class="table__head">
                        <div>№</div>
                        <div>Месяц</div>
                        <div>Сумма платежа</div>
                        <div>Основной долг</div>
                        <div>Проценты</div>
                        <div>Остаток долга</div>
                    </div>
                    <div class="table__result">
                        <div
                            class="table__item"
                            v-for="month in table"
                            :key="month"
                        >
                            <div class="table__time--wrapper">
                                <div>{{month.number_Month}}</div>
                                <div>{{month.date_Month}}</div>
                                <div>{{month.summ_Payment}}</div>
                                <div>{{month.payment_PrincipalDebt}}</div>
                                <div>{{month.interest_Payment}}</div>
                                <div>{{month.balance_Of_Debt}}</div>
                            </div>
                        </div>
                    </div>

                
            </div>
            <div v-else>
            
                <div class="table__head">
                    <div>№</div>
                    <div>Месяц</div>
                    <div>Сумма платежа</div>
                    <div>Основной долг</div>
                    <div>Проценты</div>
                    <div>Остаток долга</div>
                </div>
                <div class="table__result">
                    <div
                        class="table__item"
                        v-for="( month) in dataCalc.result.tableResultStart"
                        :key="month"
                    >
                        <div class="table__time--wrapper">
                            <div>{{month.number_Month}}</div>
                            <div>{{month.date_Month}}</div>
                            <div>{{month.summ_Payment}}</div>
                            <div>{{month.payment_PrincipalDebt}}</div>
                            <div>{{month.interest_Payment}}</div>
                            <div>{{month.balance_Of_Debt}}</div>
                        </div>
                    </div>
                    <div class="table__buttonResult" v-if="table != null" v-on:click="full_show=!full_show">{{!full_show? 'Смотреть полностью': "Скрыть" }}</div>
                    <div
                        class="table__item"
                        v-for="( month ) in dataCalc.result.tableResultEnd"
                        :key="month"
                    >
                        <div class="table__time--wrapper">
                            <div>{{month.number_Month}}</div>
                            <div>{{month.date_Month}}</div>
                            <div>{{month.summ_Payment}}</div>
                            <div>{{month.payment_PrincipalDebt}}</div>
                            <div>{{month.interest_Payment}}</div>
                            <div>{{month.balance_Of_Debt}}</div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'Table_mortgage',
    data() {
        return {
            full_show: false,
            tableResultStart: null, // первые элементы для пердварительного просмотра
            tableResultEnd: null,   // последние элементы для пердварительного просмотра,
            dataCalc: {}
        }
    },
    mounted() {
    },
    computed: {
        table() {
            return this.$store.getters.getDataCalcMortgage.table
        },
        globalStatistik() {
            return this.$store.getters.getDataCalcMortgage.globalStatistik
        },
        dataCalc() {
            return this.$store.getters.getDataCalcMortgage
        }
    }
}
</script>
<style>

</style>