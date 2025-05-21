import { IRouteOption } from "./utils.interface";
interface IRoute {
  path: string;
  element: JSX.Element;
}
export const generatedRoute = (routes: IRouteOption[]) => {
  const finalRoutes = routes.reduce((acc: IRoute[], item: IRouteOption) => {
    if (item.path && item.element) {
      acc.push({ path: item.path, element: item.element });
    }
    if (item.children) {
      item.children.forEach((item) =>
        acc.push({ path: item.path, element: item.element })
      );
    }

    return acc;
  }, []);
  return finalRoutes;
};
