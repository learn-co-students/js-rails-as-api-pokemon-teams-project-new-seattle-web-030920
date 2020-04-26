class Trainer < ApplicationRecord
    has_many :pokemons

    def self.trainerTeams 
        teams = []
        Trainer.all.map do |trainer|

            pokeList = Pokemon.where(trainer_id: trainer.id)
            teams <<  {trainer: trainer, pokemons: pokeList} 

        end
        teams
    end

end
