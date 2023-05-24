var tarefa = {
    status: false,
    edit: false,
    disabled: false,
    focus: true,
    exibeErroEdicao: false
};

const app = {
    data(){
        return {
            criadas: 0,
            concluidas: 0,
            exibeErro: false,
            tarefas: [],
            novaTarefa: {},
            editaTarefa: {}
        };
    },
    methods: {
        getIndex: function(tarefa){
            return this.tarefas.findIndex(item => item.id == tarefa.id);
        },
        setId: function(){
            return {id: Math.floor(Math.random() * 10000000000) + 1};
        },
        setErro: function(exibe){
            this.exibeErro = exibe;
        },
        setErroEdicao: function(tarefa, exibe){
            tarefa.exibeErroEdicao = exibe;
        },
        setFocus: function(tarefa, focus){
            tarefa.focus = focus;
        },
        setEdit: function(tarefa, edit){
            tarefa.edit = edit;
        },
        setDadosLocalStorage: function(){
            /**
             * Utiliza JSON.strigfy para enviar uma string para o localStorage
             */
            localStorage.setItem('tarefas', JSON.stringify(this.tarefas));
        },
        getDadosLocalStorage: function(){
            /**
             * Utiliza JSON.parse para converter a string em JSON
             */
            return localStorage.getItem('tarefas') ? JSON.parse(localStorage.getItem('tarefas')) : [];
        },
        getTotalConcluidas: function(){
            return this.tarefas.filter(item => item.status == true ).length;
        },
        getBarraProgresso: function(){
            return this.tarefas.length > 0 ? parseInt((this.getTotalConcluidas() / this.tarefas.length) * 100) : 0;
        },
        statusBotoes: function(status){
            this.tarefas.forEach(item => item.disabled = status );
        },
        adicionar: function(){
            if(this.novaTarefa.titulo){
                var cloneTarefa = {...tarefa};
                Object.assign(cloneTarefa, this.setId());
                Object.assign(cloneTarefa, this.novaTarefa);
                this.tarefas.push(cloneTarefa);
                this.resetNovaTarefa();
                this.setErro(false);
                this.setDadosLocalStorage();
            } else {
                this.setErro(true);
            }
        },
        apagar: function(tarefa){
            if(confirm('Deseja apagar esta tarefa?')){
                this.tarefas.splice(this.getIndex(tarefa), 1);
                this.setDadosLocalStorage();
            }
        },
        apagarTodasTarefas: function(){
            if(confirm('Deseja apagar TODAS as tarefas?')){
                this.tarefas = [];
                this.setDadosLocalStorage();
            }
        },
        editar: function(tarefa){
            this.statusBotoes(true);
            this.setEdit(tarefa, true);
            this.setFocus(tarefa, true);
            this.editaTarefa.titulo = tarefa.titulo;
            this.setDadosLocalStorage();
        },
        cancelarEdicao: function(tarefa){
            this.statusBotoes(false);
            this.setEdit(tarefa, false);
            this.setErroEdicao(tarefa, false);
            this.resetEditarTarefa();
            this.setDadosLocalStorage();
        },
        atualizar: function(tarefa){
            if(this.editaTarefa.titulo){
                this.statusBotoes(false);
                this.setErroEdicao(tarefa, false);
                this.setEdit(tarefa, false);
                this.setFocus(tarefa, false);
                tarefa.titulo = this.editaTarefa.titulo;
                this.resetEditarTarefa();
            } else {
                this.setFocus(tarefa, true);
                this.setErroEdicao(tarefa, true);
            }
            this.setDadosLocalStorage();
        },
        alteraStatus: function(){
            this.setDadosLocalStorage();
        },
        resetNovaTarefa: function(){
            this.novaTarefa = {};
        },
        resetEditarTarefa: function(){
            this.editaTarefa = {};
        }
    },
    created() {
        this.tarefas = this.getDadosLocalStorage();
    },
};

var appVue = Vue.createApp(app);

appVue.directive('focus', (el, binding) => {
    if(binding.value == true){
        el.focus();
    }
});

appVue.mount('#root');