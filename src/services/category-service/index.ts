import { categoryUpsertError } from "@/errors";
import EventCategoryRepository, { CreateCategoryParams } from "@/repositories/category-repository";

async function createOrUpdateCategoryService(params: CreateCategoryParams) {
  try {
    await EventCategoryRepository.upsert(params.name, params, params);
  } catch (error) {
    throw categoryUpsertError();
  }
}

async function getCategoriesService() {
  try {
    const result = await EventCategoryRepository.getCategoriesRepository();  
    return result;
  } catch (error) {
    throw categoryUpsertError();
  }
}

async function getUserCategoryService(userId: number) {
  try {
    const result = await EventCategoryRepository.getUserCategoryRepository(userId);
    return result;
  } catch (error) {
    throw categoryUpsertError();
  }
}

async function getUsersByCategoriesService(category: string) {
  try {
    const result = await EventCategoryRepository.getUsersByCategoryRepository(category);
    return result;
  } catch (error) {
    throw categoryUpsertError();
  }
}

const categoryService = {
  createOrUpdateCategoryService,
  getCategoriesService,
  getUserCategoryService,
  getUsersByCategoriesService
};

export default categoryService;
