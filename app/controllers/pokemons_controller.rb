class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, only: [:nickname, :species, :id, :trainer_id]
      end
      def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, only: [:nickname, :species, :id, :trainer_id]
      end
      def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
      end
end
