export const POKE_API_URL = 'https://pokeapi.co/api/v2';

class PokeApi {
  #baseUrl = POKE_API_URL;

  #enpoints = {
    pokemon: '/pokemon',
    pokemonSpecies: '/pokemon-species',
  };

  #noPaginationPath(path, limit) {
    return `${path}?offset=0&limit=${limit}`;
  }

  async #get(path) {
    try {
      const res = await fetch(`${this.#baseUrl}${path}`);
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  async getPokemonList() {
    const data = await this.#get(
      `${this.#noPaginationPath(this.#enpoints.pokemon, 1300)}`
    );
    if (!data) {
      return null;
    }
    return (data?.results || []).map(({ name }) => name);
  }

  async getPokemonByName(nameOrId) {
    const data = await this.#get(`${this.#enpoints.pokemon}/${nameOrId}`);
    if (!data) {
      return null;
    }
    return {
      id: data?.id,
      experience: data?.base_experience,
      height: data?.height,
      weight: data?.weight,
      stats: data?.stats?.map?.((stat) => ({
        name: stat?.stat?.name,
        value: stat?.base_stat,
      })),
      image: data?.sprites?.other?.['official-artwork']?.front_default,
      name: data?.name,
    };
  }

  async getPokemonSpeciesByName(nameOrId) {
    const data = await this.#get(
      `${this.#enpoints.pokemonSpecies}/${nameOrId}`
    );
    if (!data) {
      return null;
    }
    return {
      color: data?.color?.name,
      nameJA: data?.names?.find?.((item) => item?.language?.name === 'ja')
        ?.name,
    };
  }
}

export const pokeApi = new PokeApi();
