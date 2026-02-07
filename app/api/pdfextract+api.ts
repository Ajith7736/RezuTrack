import { getDocumentProxy, extractText } from 'unpdf'


export async function POST(request: Request) {
    try {
        const arrayBuffer = await request.arrayBuffer()

        const pdf = await getDocumentProxy(new Uint8Array(arrayBuffer));

        const { text } = await extractText(pdf, {
            mergePages: true
        })

        if (!text) return Response.json({ success: false, message: "Couldnt extract pdf, Try uploading again" });

        return Response.json({ success: true, message: 'Successfully extracted', text })


    } catch (err) {
        console.error(err);
        return Response.json({ success: false, message: "Server Error" }, { status: 500 })
    }
}