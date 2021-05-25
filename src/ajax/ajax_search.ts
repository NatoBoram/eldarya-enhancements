import type { AjaxSearchRequest } from "../api/ajax_search_request";
import { ITEMS_PER_PAGE } from "../api/ajax_search_request";

export async function ajax_search(data: AjaxSearchRequest): Promise<string> {
  return new Promise<string>((resolve): void => {
    void $.get(
      "/marketplace/ajax_search",
      {
        ...data,
        from: (data.page - 1) * ITEMS_PER_PAGE,
        to: ITEMS_PER_PAGE,
      },
      resolve
    );
  });
}
