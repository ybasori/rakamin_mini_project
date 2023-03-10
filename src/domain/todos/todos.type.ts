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
    id: number;
    data: {
      created_at: string;
      done: unknown;
      id: number;
      name: string;
      progress_percentage: number;
      todo_id: number;
      updated_at: string;
    }[];
  }[];
  errorItems: unknown[];
  gettingIndexItem: number | null;
  isLoadingCreateItem: boolean;
  createItem: unknown;
  errorCreateItem: unknown;
  isLoadingDeleteItem: boolean;
  deleteItem: unknown;
  errorDeleteItem: unknown;
  isLoadingEditItem: boolean;
  editItem: unknown;
  errorEditItem: unknown;
  isLoadingMoveItem: boolean;
  moveItem: unknown;
  errorMoveItem: unknown;
  isLoadingCreateTodo: boolean;
  createTodo: unknown;
  errorCreateTodo: unknown;
}
