import { defineStore } from "pinia";

interface GridState {
  columns: number;
}

export const useGridStore = defineStore("grid-store", {
  state: (): GridState => ({
    columns: 2,
  }),

  actions: {
    setColumns(newColumns: number): void {
      const validColumns = Math.max(1, Math.min(newColumns, 5)); // Limit the value from 1 to 5
      this.columns = validColumns;
    },
  },
  persist: true,
});
