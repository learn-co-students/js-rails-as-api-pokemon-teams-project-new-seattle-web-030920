class TrainersController < ApplicationController
    def index
        trainers = Trainer.all

        render json: trainers.to_json(:include => {
            :pokemons => {:only => [:nickname, :species]}
          }, :except => [:updated_at])

      end
end
