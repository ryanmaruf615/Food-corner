import { IRouteOption } from "./utils.interface";

export interface ISidebarItem {
  key: string;
  label: string;
  children?: ISidebarItem[] | null;
}

export const sideNavLinkGenerator = (routes: IRouteOption[], role: string) => {
  const sideNavLink = routes.reduce((acc: ISidebarItem[], item) => {
    if (item.path && item.element && item.name) {
      acc.push({
        key: item.name,
        label: `/${role}/${item.path}`, //we can use Link or Navlink here
      });
    }
    if (item.children && item.children.length > 0) {
      const children = item.children
        .map((child) => {
          if (child.name && child.path) {
            return {
              key: child.name,
              label: `/${role}/${child.path}`, // we can use Link or Navlink here
            };
          }
          return null; // explicitly handle null return
        })
        .filter((child): child is ISidebarItem => !!child); // filter out null values

      acc.push({
        key: item.name,
        label: item.name,
        children,
      });
    }
    return acc;
  }, [] as ISidebarItem[]);
  return sideNavLink;
};
