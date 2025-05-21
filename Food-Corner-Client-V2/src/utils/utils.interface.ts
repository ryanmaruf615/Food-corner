export interface IRoutOptionChildItem {
  name?: string;
  path: string;
  element: JSX.Element;
}
export interface IRouteOption {
  name: string;
  path?: string;
  element?: JSX.Element;
  children?: IRoutOptionChildItem[];
}
