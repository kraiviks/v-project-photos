import { useRoute } from "vue-router";
import { RouteLocationNormalizedLoaded } from "vue-router";

type RouteWithId = RouteLocationNormalizedLoaded & {
  params: { id: string };
};

type RouteWithQuery = RouteLocationNormalizedLoaded & {
  query: { [key: string]: string };
};

export function useRouteId() {
  const route = useRoute();
  const id = (route.params as RouteWithId["params"]).id;
  return id;
}

export function useRouteQuery<T extends string>(key: T) {
  const route = useRoute();
  const query = (route.query as RouteWithQuery["query"])[key];
  return query;
}
