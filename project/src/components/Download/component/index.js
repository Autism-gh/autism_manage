
import { mapState } from "vuex"

const mixin = {
    components: { },
    data() {
        return {
            
        }
    },
    watch: {

    },
    computed: {
        ...mapState('download', ['progressList'])
    },

    beforeMount() {
        
    },

    methods: {
        
    }
}

export default mixin