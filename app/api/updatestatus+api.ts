import { UpdateStatus } from "@/lib/Database/Applications/Actions";


export async function PUT(request: Request) {
    try {
        const { userId, applicationId, Status } = await request.json();

        await UpdateStatus(userId, applicationId, Status);

        return Response.json({ success: true, message: 'Success' }, { status: 200 })

    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: 'Server Error' }, { status: 500 })
    }
}