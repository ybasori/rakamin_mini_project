export interface ITODOS {
  isLoadingTodos: boolean;
  todos:
    | {
        id: number;
        title: string;
        description: string;
        created_by: string;
        created_at: string;
        updated_at: string;
      }[]
    | null;
  errorTodos: unknown;
  isLoadingItems: boolean;
  items: {
    created_at: string;
    done: unknown;
    id: number;
    name: string;
    progress_percentage: number;
    todo_id: number;
    updated_at: string;
  }[][];
  errorItems: unknown[];
  gettingIndexItem: number | null;
}
