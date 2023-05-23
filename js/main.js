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
        adicionar: function(){
            if(this.novaTarefa.titulo){
                this.tarefas.push({
                    id: this.tarefas.length + 1,
                    titulo: this.novaTarefa.titulo,
                    status: false,
                    edit: false
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
            tarefa.edit = true;
            this.editaTarefa.titulo = tarefa.titulo;
        },
        cancelarEdicao: function(tarefa){
            tarefa.edit = false;
            tarefa.exibeErroEdicao = false;
        },
        atualizar: function(tarefa){
            if(this.editaTarefa.titulo){
                tarefa.edit = false;
                tarefa.titulo = this.editaTarefa.titulo;
                this.editaTarefa = {};
                tarefa.exibeErroEdicao = false;
            } else {
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

Vue.createApp(app).mount('#root');