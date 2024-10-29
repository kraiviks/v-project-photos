import { useRoute } from "vue-router";
import { RouteLocationNormalizedLoaded } from "vue-router";

type RouteWithId = RouteLocationNormalizedLoaded & {
  params: { id: string };
};

export function useRouteId() {
  const route = useRoute();
  const id = (route.params as RouteWithId["params"]).id;
  return id;
}
