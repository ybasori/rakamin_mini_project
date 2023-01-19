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
}
