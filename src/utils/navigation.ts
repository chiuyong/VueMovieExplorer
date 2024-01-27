import VueRouter from 'vue-router';

export const navigate = (
  router: VueRouter,
  routeName: string,
  query: Record<string, string | undefined> = {}
) => {
  router.push({ name: routeName, query }).catch(err => {
    if (err.name !== 'NavigationDuplicated') {
      console.error(err);
    }
  });
};
