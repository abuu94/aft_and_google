import "datatables.net";

declare global {
  interface JQuery {
    DataTable(options?: any): JQuery;
  }
}
