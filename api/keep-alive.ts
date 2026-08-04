const SUPABASE_URL = 'https://ohzlzeczotyqqyogkxdb.supabase.co';
const SUPABASE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oemx6ZWN6b3R5cXF5b2dreGRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3NzkwNzgsImV4cCI6MjA4NzM1NTA3OH0.U065g4i8YvIT5vQhYDMhS2iXzfWLYn-AuSrm_ZWkdR8';

export default async function handler(req: any, res: any) {
  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/puppies?select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
        },
      }
    );
    res.status(200).json({ ok: response.ok, status: response.status });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err) });
  }
}
