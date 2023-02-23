<template>
    <div class="login">
        <div class="login__content">
            <LoginForm></LoginForm>
        </div>

        <div class="login__footer">
            copyright© 2021 <span class="text--brand">AUTISM</span> Co. Ltd. All Rights Reserved.
        </div>

    </div>
</template>

<script>
import LoginForm from './login/LoginForm.vue'
export default {
    name: 'Login',
    components: { LoginForm },
    props: {  },
    data() {
       return {
           
       };
    },
    watch: {
        
    },
    computed: {
        
    },
    methods: {
        
    },
    created() {
        
    },
    async mounted() {
        
    },
};
</script>
<style lang="scss" scoped>
.login {
    position: fixed;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--background-color-base);

    &__content {
        width: 500px;
        padding: 30px 50px 30px 50px;
        background-color: var(--color-white);
        box-shadow: var(--box-shadow-base);
        border-top: solid 5px var(--color-primary);
        border-radius: 4px;

        .box {
            width: 20px;
            height: 20px;
        }
    }

    &__footer {
        position: absolute;
        bottom: 35px;
        left: 50%;
        transform: translateX(-50%);
    }
}
</style>