import { Database } from "@/lib/database.types";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
    try {
        const { event } = await req.json();

        const authHeader = req.headers.get("Authorization");

        const signature = authHeader?.split(' ')[1]

        const env = process.env.REVENUECAT_WEBHOOK_SECRET;

        if (signature !== process.env.REVENUECAT_WEBHOOK_SECRET) {
            return Response.json({ error: "Unauthorized", signature, env }, { headers: { "Content-Type": "application/json" }, status: 401 })
        }

        const userId = event.app_user_id;


        const supabaseAdmin = createClient<Database>(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

        switch (event.type) {
            case 'INITIAL_PURCHASE':
            case 'RENEWAL':
            case 'PRODUCT_CHANGE':
            case 'UNCANCELLATION':
            case 'NON_RENEWING_PURCHASE':

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


                break;
            case 'CANCELLATION':
            case 'EXPIRATION':

                const { error: cancel_authError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
                    app_metadata: {
                        subscription: "Free"
                    }
                })

                const { error: cancel_userError } = await supabaseAdmin.from('User').update({
                    Subscription: "Free"
                }).eq('id', userId);


                const { error: cancel_usageError } = await supabaseAdmin.from('Usage').update({
                    total_Applications: 20,
                    total_resume: 2
                }).eq('userId', userId)

                if (cancel_authError || cancel_usageError || cancel_userError) {
                    console.error("Failed to cancel the subscriptions : ", cancel_authError || cancel_usageError || cancel_userError)

                    throw new Error('Cancellation failed')
                }

                break;

        }


        return Response.json({ success: true, message: "Success" }, { status: 200, headers: { "Content-Type": "application/json" } })
    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: `Server Error` }, { status: 500, headers: { "Content-Type": "application/json" } })
    }
}