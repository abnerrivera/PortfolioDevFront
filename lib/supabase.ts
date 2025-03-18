// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error('Las variables de entorno de Supabase no están definidas')
}

// ⚡ Cliente público para el navegador (uso en el cliente)
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ⚡ Cliente con más permisos para el backend (solo en el servidor)
export const supabaseAdmin =
  SUPABASE_SERVICE_ROLE_KEY && createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)
