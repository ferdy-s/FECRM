import { api } from "./api";

import type {
  Collection,
  CollectionResponse,
} from "../types/collection";

export const collectionService = {
  async getWorklist(): Promise<Collection[]> {
    const response =
      await api.get<CollectionResponse>(
        "/collections/worklist"
      );

    return response.data.data;
  },
};