<template>
    <div ref="webglref" class="learning-layout"></div>
</template>
<script>
    import * as THREE from 'three'
    export default {
        name: 'ThreeLine',
        components: {},
        props: {},
        data() {
            return {
                documentInstance: null
            }
        },
        computed: {

        },
        methods: {

            initWebGlInstance() {
                // 创建载体
                this.documentInstance = this.$refs['webglref']

                // 创建渲染器
                const renderer = new THREE.WebGLRenderer();
                renderer.setSize(window.innerWidth, window.innerHeight);
                this.documentInstance.appendChild(renderer.domElement)

                // 摄像机，显示角度就是
                const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
                camera.position.set(0, 0, 100);
                camera.lookAt(0, 0, 0);

                const scene = new THREE.Scene();

                const material = new THREE.LineDashedMaterial({
                    color: 0x0000ff
                });

                const points = [];
                points.push(new THREE.Vector3(-10, 0, 0));
                points.push(new THREE.Vector3(0, 10, 0));
                points.push(new THREE.Vector3(10, 0, 0));

                const geometry = new THREE.BufferGeometry().setFromPoints(points);

                const line = new THREE.Line(geometry, material);

                scene.add(line);

                renderer.render(scene, camera);
            }
        },
        beforeCreate() {

        },
        created() {

        },
        beforeMount() {

        },
        mounted() {
            this.initWebGlInstance()
        },
        beforeDestroy() {

        },
    }
</script>
<style lang="scss" scoped>
@import '../scss/common.scss';
</style>