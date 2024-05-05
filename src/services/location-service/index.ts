import { categoryUpsertError } from "@/errors";
import locationRepository from "@/repositories/location-repository";

async function getUsersByLocationService(location: string) {
  try {
    const result = await locationRepository.getUsersByLocationRepository(location);
    return result;
  } catch (error) {
    throw categoryUpsertError();
  }
}

const locationService = {
  getUsersByLocationService
};

export default locationService;
