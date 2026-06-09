export const getClientKey = (searchParams: { client?: string | string[] }): string | undefined => {
  const value = searchParams.client;

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  return undefined;
};
