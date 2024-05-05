import { ApplicationError } from "@/protocols";

export function categoryUpsertError(): ApplicationError {
  return {
    name: "CategoryError",
    message: "Dont update or create category",
  };
}
