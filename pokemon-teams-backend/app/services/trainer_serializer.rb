class TrainerSerializer

    def initialize(team_object)
        @team = team_object
    end

    def to_serialized_json
        options = {
            include: {
              trainer: {
                only: [:name]
              },
              pokemons: {
                only: [:species, :nickname]
              }
            },
            except: [:updated_at],
          }
          @team.to_json(options)
    end

end