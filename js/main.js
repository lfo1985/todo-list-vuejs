const app = {
    data(){
        return {
            criadas: 0,
            concluidas: 0,
            exibeErro: false,
            exibeErroEdicao: false,
            tarefas: window.tarefas,
            novaTarefa: {},
            editaTarefa: {}
        };
    },
    methods: {
        getIndex: function(tarefa){
            return this.tarefas.findIndex(function(item){
                return item.id == tarefa.id;
            });
        },
        setErro: function(exibe){
            this.exibeErro = exibe;
        },
        totalConcluidas: function(){
            this.concluidas = tarefas.filter(function(item){
                return item.status == true;
            }).length;
            return this.concluidas;
        },
        barraProgresso: function(){
            return this.tarefas.length > 0 ? parseInt((this.totalConcluidas() / this.tarefas.length) * 100) : 0;
        },
        statusBotoes: function(status){
            this.tarefas.forEach(item => {
                item.disabled = status;
            });
        },
        adicionar: function(){
            if(this.novaTarefa.titulo){
                this.tarefas.push({
                    id: this.tarefas.length + 1,
                    titulo: this.novaTarefa.titulo,
                    status: false,
                    edit: false,
                    disabled: false,
                    focus: true
                });
                this.limpar();
                this.setErro(false);
            } else {
                this.setErro(true);
            }
        },
        apagar: function(tarefa){
            if(confirm('Deseja apagar esta tarefa?')){
                this.tarefas.splice(this.getIndex(tarefa), 1);
            }
        },
        editar: function(tarefa){
            this.statusBotoes(true);
            tarefa.edit = true;
            tarefa.focus = true;
            this.editaTarefa.titulo = tarefa.titulo;
        },
        cancelarEdicao: function(tarefa){
            tarefa.edit = false;
            tarefa.exibeErroEdicao = false;
            this.statusBotoes(false);
            this.editaTarefa = {};
        },
        atualizar: function(tarefa){
            if(this.editaTarefa.titulo){
                tarefa.edit = false;
                tarefa.titulo = this.editaTarefa.titulo;
                this.editaTarefa = {};
                tarefa.exibeErroEdicao = false;
                tarefa.focus = false;
                this.statusBotoes(false);
            } else {
                tarefa.focus = true;
                tarefa.exibeErroEdicao = true;
            }
        },
        limpar: function(){
            this.novaTarefa = {};
        },
        limparTodos: function(){
            this.tarefas = [];
        }
    }
};

var appVue = Vue.createApp(app);

appVue.directive('focus', (el, binding) => {
    if(binding.value == true){
        el.focus();
    }
});

// appVue.directive('focus', {
//     mounted(el, binding) {
//         if(binding.value == true){
//             el.focus();
//         }
//     },
// });

// appVue.directive('focus-in', {
//     updated(el, binding) {
//         if(binding.value == true){
//             el.focus();
//         }
//     },
//     created(el, binding) {
//         if(binding.value == true){
//             el.focus();
//         }
//     },
// });

appVue.mount('#root');