class PokemonsController < ApplicationController

    def new
        pokemon = Pokemon.new
    end

    def create
        trainerID = params["_json"]
        name = Faker::Name.first_name  
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.new(species: species, nickname: name, trainer_id: trainerID)
        pokemon.save
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id].to_i)
        pokemon.destroy
    end
end
