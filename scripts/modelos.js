// modelo.js
var URL_API = "https://pokeapi.co/api/v2/pokemon/";
var URL_API_TIPO = "https://pokeapi.co/api/v2/type/";

var PokemonModel = Backbone.Model.extend({
    obtenerDatos: function(){
        var nombre = this.get('nombre').toLowerCase();
        $.getJSON(URL_API + nombre)
            .done((data) => {
                this.set({
                    imagen: data.sprites.front_default,
                    tipo: data.types.map(t => t.type.name).join(', '),
                    altura: data.height,
                    peso: data.weight,
                    legendario: false, // se puede mejorar con otra llamada a species
                    nombre: data.name
                });
                this.trigger('datos:listos');
            })
            .fail(()=>{
                alert("Pokémon no encontrado");
            });
    }
});

var PokedexCollection = Backbone.Collection.extend({
    model: PokemonModel,

    obtenerPorTipo: function(tipo) {
        var self = this;
        this.reset();
        $.getJSON(URL_API_TIPO + tipo)
            .done(function(data) {
                var pokemons = data.pokemon.slice(0, 10); // limitar a 10
                pokemons.forEach(p => {
                    var poke = new PokemonModel({ nombre: p.pokemon.name });
                    poke.obtenerDatos();
                    self.add(poke);
                });
            });
    }
});
