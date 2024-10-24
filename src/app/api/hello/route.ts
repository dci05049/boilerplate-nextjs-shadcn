import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers"; 

export async function GET() {
//   const res = await fetch('https://data.mongodb-api.com/...', {
//     headers: {
//       'Content-Type': 'application/json',
//       'API-Key': process.env.DATA_API_KEY,
//     },
//   })
//   const data = await res.json()
const supabase = createClient();
const {
  data: { user },
} = await supabase.auth.getUser();

    console.log(user)

 
  return Response.json({ hello: "Mesage" })
}

