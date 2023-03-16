export const POKE_API_URL = 'https://pokeapi.co/api/v2';

const colors = {
  blue: { background: '#4a90e2', text: '#063361' },
  brown: { background: '#8b5a2b', text: '#301a0d' },
  gray: { background: '#808080', text: '#262626' },
  green: { background: '#4caf50', text: '#1b5e20' },
  pink: { background: '#e91e63', text: '#880e4f' },
  purple: { background: '#9c27b0', text: '#4a148c' },
  red: { background: '#e53935', text: '#8b0000' },
  white: { background: '#ffffff', text: '#000000' },
  yellow: { background: '#ffeb3b', text: '#ff6f00' },
};

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
      icon: data?.sprites?.other?.['dream_world']?.front_default,
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
    const color = data?.color?.name;

    return {
      backgroundColor: colors[color]?.background,
      color: colors[color]?.text,
      nameJA: data?.names?.find?.((item) => item?.language?.name === 'ja')
        ?.name,
    };
  }
}

export const pokeApi = new PokeApi();
