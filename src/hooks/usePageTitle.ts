import { useTitle } from '@vueuse/core';

export function usePageTitle(titleValue: string) {
  const title = useTitle();
  title.value = titleValue;
}
