class TrainersController < ApplicationController

    def index
        render json: Trainer.trainerTeams
      end
     
      def show
        trainer = Trainer.find_by(id: params[:id])
        pokemonList = Pokemon.where(trainer_id: trainer.id)
        if trainer
            render json: {trainer: trainer, pokemons: pokemonList}
        else
            render json: { message: 'No sighting found with that id' }
          end
      end

end
