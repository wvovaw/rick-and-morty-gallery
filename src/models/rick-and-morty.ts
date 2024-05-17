export interface ICharacter {
  id: number; // The id of the character.
  name: string; // The name of the character.
  status: string; // The status of the character ('Alive', 'Dead' or 'unknown').
  species: string; // The species of the character.
  type: string; //  The type or subspecies of the character.
  gender: string; //  The gender of the character ('Female', 'Male', 'Genderless' or 'unknown').
  origin: ILocationReference; //  Name and link to the character's origin location.
  location: ILocationReference; //  Name and link to the character's last known location endpoint.
  image: string; //  (url) Link to the character's image. All images are 300x300px and most are medium shots or portraits since they are intended to be used as avatars.
  episode: string[]; //  (urls) List of episodes in which this character appeared.
  url: string; //  (url) Link to the character's own URL endpoint.
  created: string; //  Time at which the character was created in the database.
}

interface ILocationReference {
  name: string;
  url: string;
}

export interface ILocation {
  id: number; // The id of the location.
  name: string; // The name of the location.
  type: string; // The type of the location.
  dimension: string; // The dimension in which the location is located.
  residents: string[]; // List of character who have been last seen in the location.
  url: string; // (url) Link to the location's own endpoint.
  created: string;// Time at which the location was created in the database.
}

export interface IEpisode {
  id: number; // The id of the episode.
  name: string; // The name of the episode.
  air_date: string;// The air date of the episode.
  episode: string; // The code of the episode.
  characters: string[]; // (urls) List of characters who have been seen in the episode.
  url: string; // (url) Link to the episode's own endpoint.
  created: string; // Time at which the episode was created in the database.
}
