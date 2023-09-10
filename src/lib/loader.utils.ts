import {
  Await as RrdAwait,
  defer,
  LoaderFunctionArgs,
  useLoaderData as useRrdLoaderData,
} from "react-router-dom";

export function useLoaderData<
  TLoader extends ReturnType<typeof createTypedLoader>
>() {
  return useRrdLoaderData() as ReturnType<TLoader>["data"];
}

export function createTypedLoader<TData extends Record<string, unknown>>(
  dataFunc: (args: LoaderFunctionArgs) => TData
) {
  return (args: LoaderFunctionArgs) =>
    defer(dataFunc(args)) as Omit<ReturnType<typeof defer>, "data"> & {
      data: TData;
    };
}

export interface AwaitResolveRenderFunction<T> {
  (data: Awaited<T>): React.ReactElement;
}

export interface AwaitProps<T> {
  children: React.ReactNode | AwaitResolveRenderFunction<T>;
  errorElement?: React.ReactNode;
  resolve: Promise<T>;
}

export function Await<T>(props: AwaitProps<T>): JSX.Element {
  return RrdAwait(props);
}