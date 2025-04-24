export default {
  async fetch(request, env) {
    if (request.method === "PUT") {
      // TO DO: add x-api-key header check
      const body = await request.json()
      const name = body?.name || "UnknownDevice"
      const serial = name.split(" ")[1] || "unknown_serial"
      await env.SMARTSHUNT.put(serial, JSON.stringify(body))
      return new Response(`Stored under serial: ${serial}`, {
        status: 200,
        headers: { "Access-Control-Allow-Origin": "*" }
      })
    }

    if (request.method === "GET") {
      const url = new URL(request.url)
      const serial = url.searchParams.get("key") || "unknown_serial"
      const value = await env.SMARTSHUNT.get(serial)
      return new Response(value || "{}", {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      })
    }

    return new Response("Method not allowed", { status: 405 })
  }
}
