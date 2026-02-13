import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const { event } = await req.json();

        const supabaseAdmin = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SECRECT_KEY!)

        switch (event.type) {
            case 'INITIAL_PURCHASE':
            case 'RENEWAL':
                const userId = event.app_user_id;

                await supabaseAdmin.auth.admin.updateUserById(userId,{
                    app_metadata : {
                        subscription : 'Pro'
                    }
                })
                break;
        }


        return Response.json({ success: true, message: "Success" }, { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error " }, { status: 500, headers: { "Content-Type": "application/json" } })
    }
}