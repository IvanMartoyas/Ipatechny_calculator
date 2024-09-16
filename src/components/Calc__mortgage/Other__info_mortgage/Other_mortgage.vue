<template>
    <div class="formAndOther__half card">
         <div class="statistik">
            <div class="col-6" v-if="globalStatistik != null">
                <p class="statistik__title">Ежемесячный платёж</p>
                <div v-if="globalStatistik.type_Payment == 'different'">
                    От {{globalStatistik.summPayment.firstPay}} до {{globalStatistik.summPayment.lastPay}} 

                </div>
                <div v-else >
                    Ежемесячный платёж: {{globalStatistik.summPayment.firstPay }}
                </div>
                
                <p class="statistik__title">Налоговый вычет</p>
                <div>Общаяя сумма выплаты:       <span class="statistik__value">{{ globalStatistik.taxDeduction.amountPayment }}  </span> </div>
                <div>Выплата по процентам:       <span class="statistik__value"> {{ globalStatistik.taxDeduction.forInterest }}  </span>   </div>
                <div>Выплата по основному долгу: <span class="statistik__value">{{ globalStatistik.taxDeduction.forDebit }}   </span>      </div>

            </div>
        </div>
    </div>
</template>
<script>
export default{ 
    data() {
        return {
           
        }
    },
    methods: {
    },
    mounted() {
    },
    computed: {
        globalStatistik() {
            return this.$store.getters.getDataCalcMortgage.globalStatistik
        }
    }
}
            
</script>
<style lang="scss">
    @import '@/assets/css/statistik.scss'; 
</style>