import { ResumeContentProps } from "@/types/types";

export function SummarySection(content: Partial<Pick<ResumeContentProps, 'summary'>>): string {

    const summaries = content?.summary?.map((item) => {
        return `<p>${item}</p>`
    })

    return `   <section>
            <h3>SUMMARY</h3>
            <hr />
            ${summaries?.join('') || ''}
        </section>`
}