import { supabase } from '../../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).end()
  try {
    const { data, error } = await supabase
      .from('aetherion_core')
      .select('value')
      .eq('key','core_seed')
      .single()
    if (error) throw error
    return res.status(200).json({ core: data.value })
  } catch (e) {
    console.error('core get error', e.message || e)
    return res.status(500).json({ error: e.message || 'read failed' })
  }
}
