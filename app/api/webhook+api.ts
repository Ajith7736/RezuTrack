import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const { event } = await req.json();

        const supabaseAdmin = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

        switch (event.type) {
            case 'INITIAL_PURCHASE':
            case 'RENEWAL':
                const userId = event.app_user_id;

                const { error: authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
                    app_metadata: {
                        subscription: 'Pro'
                    }
                })

                const { error: dbError } = await supabaseAdmin.from('User').update({
                    Subscription: "Pro"
                }).eq('id', userId)

                const { error: usageError } = await supabaseAdmin.from('Usage').update({
                    total_Applications: null,
                    total_resume: null
                }).eq('userId', userId)

                if (authError || dbError || usageError) {
                    console.error('Failed to upgrade user : ', authError || dbError)

                    throw new Error("Update failed");
                }


                console.log("Successfully upgraded user:", userId);

                break;
        }


        return Response.json({ success: true, message: "Success" }, { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: `Server Error` }, { status: 500, headers: { "Content-Type": "application/json" } })
    }
}