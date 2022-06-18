import Pagination from "../../../src/stockComponents/components/pagination/index.vue";

export default function registerComponents(app: any) {
  console.log(Pagination);

  app.component("Pagination", Pagination);
}
