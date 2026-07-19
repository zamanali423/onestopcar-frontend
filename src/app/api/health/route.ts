export async function GET() {
  try {
    // Simulate a database check
    await new Promise(resolve => setTimeout(resolve, 100));
    return Response.json({ ok: true });
  } catch {
    return Response.json({ ok: false }, { status: 500 });
  }
}
