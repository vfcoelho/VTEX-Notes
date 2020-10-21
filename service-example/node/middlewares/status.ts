export async function status(ctx: Context, next: () => Promise<any>) {
  const {
    state: { code },// this param comes from the route /_v/status/:code
    clients: { catalog },
  } = ctx

  const data = await catalog.getSkuById(code.toString())
  ctx.body = data

  await next()
}
