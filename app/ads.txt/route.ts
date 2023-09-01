export async function GET() {
  if (process.env.GOOGLE_ADSENSE_TXT) {
    return new Response(process.env.GOOGLE_ADSENSE_TXT);
  } else {
    return new Response('Not Found', { status: 404 });
  }
}
