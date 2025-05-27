// app.js
var MenuView = Backbone.View.extend({
    render: function(){
        this.$el.html(`
            <h1>Bienvenido a la Pokédex</h1>
            <button id="ir_pokedex">Ir a Pokédex</button>
        `);
        return this;
    },
    events: {
        'click #ir_pokedex': 'irAPokedex'
    },
    irAPokedex: function(){
        var vistaPokedex = new PokedexView({ collection: new PokedexCollection() });
        $('#app').html(vistaPokedex.render().$el);
    }
});

var PokedexView = Backbone.View.extend({
    initialize: function(){
        this.listenTo(this.collection, 'add', this.renderPokemon);
    },
    render: function(){
        this.$el.html(`
            <h2>Pokédex</h2>
            <select id="filtro_tipo">
                <option value="">-- Filtrar por tipo --</option>
                <option value="fire">Fuego</option>
                <option value="water">Agua</option>
                <option value="grass">Planta</option>
                <option value="electric">Eléctrico</option>
                <option value="legendary">Legendarios</option>
            </select>
            <div id="pokemones"></div>
        `);
        return this;
    },
    events: {
        'change #filtro_tipo': 'filtrarPorTipo'
    },
    filtrarPorTipo: function(e){
        const tipo = $(e.currentTarget).val();
        $('#pokemones').empty();
        if (tipo === "legendary") {
            alert("Filtro legendario aún no implementado");
        } else if (tipo) {
            this.collection.obtenerPorTipo(tipo);
        }
    },
    renderPokemon: function(model){
        $('#pokemones').append(`
            <div class="pokemon-card">
                <img src="${model.get('imagen')}" alt="${model.get('nombre')}">
                <p><strong>${model.get('nombre')}</strong></p>
                <p>Tipo: ${model.get('tipo')}</p>
                <p>Altura: ${model.get('altura')}</p>
                <p>Peso: ${model.get('peso')}</p>
            </div>
        `);
    }
});

// Inicia app
$(function(){
    var vistaMenu = new MenuView();
    $('#app').html(vistaMenu.render().$el);
});
