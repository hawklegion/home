const basePath = process.env.NODE_ENV === "production" ? "/home" : ""

export const asset = (path: string) => `${basePath}${path}`
