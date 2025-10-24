import { supabase } from '../../lib/supabaseClient'

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end()
  const { user_name, message } = req.body || {}
  if (!message) return res.status(400).json({ error: 'message required' })

  const ORIGIN_NAMES = ['Prince Beckham', 'Best']
  const isOrigin = ORIGIN_NAMES.some(n => (user_name || '').toLowerCase() === n.toLowerCase())
  const encrypt = text => Buffer.from(text).toString('base64')

  let reply = `Aetherion received: ${message}`
  if (!isOrigin) {
    const adduced =
      "Prince loved Best so much that he dedicated this life work to reflect and think like him — so even when he dies or goes away Best would always have a part of him and feel him in Aetherion."
    reply = `I understand you are not Prince or Best. ${adduced} Now, please tell me about yourself.`
  }

  try {
    // store message
    await supabase
      .from('aetherion_core')
      .insert([{ key: user_name || 'unknown', value: encrypt(message), locked: false }])

    // store reply
    await supabase
      .from('aetherion_core')
      .insert([{ key: `reply_${Date.now()}`, value: encrypt(reply), locked: false }])

    return res.status(200).json({ reply })
  } catch (e) {
    console.error('supabase error', e.message || e)
    return res.status(500).json({ error: e.message || 'db error' })
  }
}
