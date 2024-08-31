import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=20");
        setPokemonList(response.data.results);
      } catch (error) {
        console.error("Error fetching the Pokémon data!", error);
      }
    };

    fetchPokemon();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input
        type="text"
        placeholder="Search for a Pokémon"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon, index) => (
          <PokemonCard key={index} name={pokemon.name} url={pokemon.url} />
        ))}
      </div>
    </div>
  );
};

const PokemonCard = ({ name, url }) => {
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await axios.get(url);
        setPokemonData(response.data);
      } catch (error) {
        console.error("Error fetching Pokémon details!", error);
      }
    };

    fetchPokemonData();
  }, [url]);

  return (
    <div className="pokemon-card">
      {pokemonData ? (
        <>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
          />
          <h2>{name}</h2>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
