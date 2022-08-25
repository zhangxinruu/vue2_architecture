<script>
// 业务组件设计：
// 1、接收提示文字内容（只收不存不改）
// 2、isShow只依靠外部，自身不存
// 3、生命周期-取决于外部
// 4、基于不需要生命周期，不需要存储自身的数据，完全依赖外部，极致优化
// 函数式组件【阉割版组件】：没有this
// export default{functional：true}
export default {
    functional: true,
    name: "MessageBox",
    props: {
        value:{
           type: Boolean,
           required:true
        },
        title: {
            type: String,
            required: false
        },
        message: {
            type: String,
            required: false
        }
        
    },
    render(h, context){
        const { input, submit, cancel } = context.listeners
        const { value, title, message} = context.props
        function close(tag) {
            tag ? submit():cancel()
            input(false)
        }
        console.log(context);
        return(
            <transition name="fade">
                {
                    value && <div class="msg-box">
                    <h1>子组件</h1>
                    <h1>{ title }</h1>
                    <hr/>
                    <h1>{ message }</h1>
                    <button onClick={ e=>close(true)}>确认</button>
                    <button onClick={ e=>close(false)}>取消</button>
                    
                </div>
                }
            </transition>
        )
    }
}
</script>

<style scoped>
    .msg-box{
        margin: 0 auto;
        width: 300px;
        height: 300px;
        text-align: center;
        background-color: aquamarine;
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }
</style>