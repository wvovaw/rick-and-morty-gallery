import { ApiError } from "./errors";
import type { ICharacter, IEpisode } from "@/models/rick-and-morty";

interface IGetMany<T = any> {
  info: {
    count: number;
    pages: number;
    next: string;
    prev: number | null;
  };
  results: T[];
}

async function api<T>(endpoint: string): Promise<T | undefined> {
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}${endpoint}`);
  if (!response.ok)
    throw new Error(`Request error: ${response.status}`);

  return response.json();
}

interface GetCharactersParams { page?: number; filters: { name?: string; status?: string } }
type GetCharactersResponse = IGetMany<ICharacter>;
export async function getCharacters({ page = 1, filters: { name, status } }: GetCharactersParams): Promise<GetCharactersResponse | undefined> {
  try {
    let query = `/character/?page=${page}`;
    if (name && name?.length > 0)
      query = query.concat(`&name=${name}`);
    if (status && status?.length > 0)
      query = query.concat(`&status=${status}`);

    const data = await api<GetCharactersResponse>(query);
    return data;
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      if (e.message.includes("404"))
        throw new ApiError("CHARACTERS_NOT_FOUND");
    }
    else { throw new ApiError(); }
  }
}

type GetEpisodeResponse = IEpisode;
export async function getEpisode(id: number): Promise<GetEpisodeResponse | undefined> {
  try {
    const data = await api<GetEpisodeResponse>(`/episode/${id}`);
    return data;
  }
  catch (e: unknown) {
    if (e instanceof Error) {
      if (e.message.includes("404"))
        throw new ApiError("EPISODE_NOT_FOUND");
    }
    else { throw new ApiError(); }
  }
}
