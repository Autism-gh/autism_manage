<template>
    <pre :class="['code-container', { 'hascolor': color }]" :style="formatStyle">
        <div class="code-content" v-html="html"></div>
    </pre>
</template>

<script>
import { isObject } from '@/util/common/type-check'
export default {
    components: {  },
    props: {  
        // 数据
        code: {
            type: [String, Object],
            default: ''
        },
        
        // 是否显示颜色
        color: {
            type: Boolean,
            default: false
        },

        // 缩进
        indent: {
            type: Number,
            default: 2
        },

        height: {
            type: [String],
            default: 'max-content'
        }
    },
    name: '',
    data() {
       return {
           html: ''
       };
    },
    watch: {
        code(newVal) {
            this.reflashCode(newVal)
        }
    },
    computed: {
        formatStyle() {
            return `height: ${ this.height }`
        }
    },
    methods: {
        reflashCode(code = null) {
            if(!code) this.html = ''
            let source = isObject(code) ? JSON.stringify(this.code, null, this.indent) : this.code
            source = source.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');

            const format = source.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+]?\d+)?)/g, function(match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });

            this.html = format
        }
    },
    created() {
        
    },
    mounted() {
        this.reflashCode(this.code)
    },
};
</script>
<style lang="scss">
.code-container {
    &.hascolor {
        .string { 
            color: green; 
        }
        .number { 
            color: darkorange; 
        }
        .boolean { 
            color: blue; 
        }
        .null { 
            color: magenta; 
        }
        .key { 
            color: red; 
        }
    }
}
</style>
<style lang="scss" scoped>
.code-container {
    position: relative;
    width: 100%;
    border: 1px solid var(--border-color-base); 
    overflow: auto;

    .code-content {
        width: 100%;
        height: 100%;
    }

    &.hascolor {

        .string { 
            color: green; 
        }
        .number { 
            color: darkorange; 
        }
        .boolean { 
            color: blue; 
        }
        .null { 
            color: magenta; 
        }
        .key { 
            color: red; 
        }
    }
}
</style>