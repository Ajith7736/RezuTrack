import { Json } from "@/lib/database.types";
import React, { ReactElement } from "react";

export type Themeprops = "light" | "dark" | "system"

export interface contents {
    icon: ReactElement;
    title: string;
    desc?: string;
}

export type ResumeData = {
    createdAt: string;
    Customization: Json;
    id: string;
    name: string;
    ResumeContent: ResumeContentProps | Json | null;
    template: string;
    updatedAt: string;
    userId: string;
}

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

export type ProfileProps = Partial<Pick<ResumeContentProps, 'fullname' | 'email' | 'phonenumber' | 'links' | 'address' | 'professionaltitle' | 'profilepic' | 'personaldetails'>>


export type ResumeContentProps = {
    profilepic: string,
    fullname: string,
    professionaltitle: string,
    email: string,
    address: string,
    phonenumber: string,
    personaldetails: {
        name: string,
        value: string
    }[],
    links: {
        name: string
        label: string,
        link: string
    }[],
    profile: string[],
    education: {
        college: string,
        field: string,
        startDate: string,
        endDate: string,
        location: string,
        Description: string
    }[],
    skills: {
        name: string,
        information: string,
        level: string
    }[],
    languages: {
        name: string,
        additionalInformation: string,
        level: string
    }[],
    experience: {
        title: string,
        subtitle: string,
        startDate: string,
        endDate: string,
        location: string,
        description: string
    }[],
    projects: {
        projectTitle: string,
        subtitle: string,
        startDate: string,
        endDate: string,
        description: string
    }[],
    strength: {
        skill: string,
        information: string,
        level: string
    }[],
    certificates: {
        certificate: string,
        additionalInformation: string
    }[],
    awards: {
        award: string,
        issuer: string,
        date: string,
        description: string
    }[],
    interest: {
        interest: string,
        additionalInformation: string
    }[],
    courses: {
        courseTitle: string,
        institution: string,
        startDate: string,
        endDate: string,
        location: string,
        description: string
    }[],
    organizations: {
        organization: string,
        position: string,
        startDate: string,
        endDate: string,
        location: string,
        description: string
    }[],
    publications: {
        title: string,
        publisher: string,
        date: string,
        description: string
    }[],
    references: {
        name: string,
        jobtitle: string,
        organization: string,
        email: string,
        phone: string
    }[],
    custom: Record<string, string>
}

export type CustomizeInputs = {
    language: string,
    dateFormat: string,
    pageFormat: 'A4',
    template: string,
    layout: {
        columns: 'one' | 'two' | 'mix',
        headerPostion: 'top' | 'left' | 'right'
        columnwidth: {
            left: string,
            right: string
        },
        sectionLayout: string[]
    },
    spacing: {
        fontSize: string,
        lineHeight: number,
        leftRightMargin: string,
        topBottomMargin: string,
        entrySpacing: string
    },
    colors: {
        mode: 'basic' | 'advanced' | 'border',
        accent: string,
        color: string,
        applyAccentColor: ('name' | 'jobtitle' | 'headings' | 'headingsLine' | 'headerIcons' | 'dotsBarsBubbles' | 'dates' | 'linkIcons')[]
    },
    font: {
        type: 'serif' | 'sans' | 'mono',
        fontname: string
    },
    sectionHeadings: {
        style: string,
        capitalization: 'capitalize' | 'uppercase',
        size: 's' | 'm' | 'l' | 'xl',
        icons: 'none' | 'outline' | 'filled'
    },
    entryLayout: {
        layout: string,
        titleSubtitleSize: 's' | 'm' | 'l',
        subtitleStyle: 'normal' | 'bold' | 'italic',
        subtitlePlacement: 'same-line' | 'next-line',
        descriptionIndentation: boolean,
        listStyle: 'bullet' | 'hyphen'
    },
    footer: {
        pageNumbers: boolean,
        email: boolean,
        name: boolean
    },
    links: {
        underline: boolean,
        blueColor: boolean,
        linkIcon: {
            show: boolean,
            type: string
        }
    },
    personalDetails: {
        align: 'left' | 'center' | 'right',
        arrangement: 'icon' | 'bullet' | 'bar',
        iconStyle: 'no-frame' | 'circle-filled' | 'rounded-filled' | 'square-filled' | 'circle-outline' | 'rounded-outline' | 'square-outline',
        nameSize: 'xs' | 's' | 'm' | 'l' | 'xl',
        nameBold: boolean,
        namefont: 'bodyfont' | 'creative'
        professionalTitle: {
            size: 's' | 'm' | 'l',
            position: 'same-line' | 'below',
            style: 'normal' | 'italic'
        }
    },
    sections: {
        skills: {
            layout: 'grid' | 'level' | 'compact' | 'bubble' | 'bullet' | 'pipe' | 'new-line' | 'comma',
            subinfoStyle: 'dash' | 'colon' | 'bracket'
        },
        languages: {
            layout: 'grid' | 'level' | 'compact' | 'bubble' | 'text' | 'dots' | 'bar'
        },
        interests: {
            layout: 'grid' | 'compact' | 'bubble' | 'bullet' | 'pipe' | 'new-line' | 'comma',
            subinfoStyle: 'dash' | 'colon' | 'bracket'
        },
        certificates: {
            layout: 'grid' | 'compact' | 'bubble' | 'bullet' | 'pipe' | 'new-line' | 'comma',
            subinfoStyle: 'dash' | 'colon' | 'bracket'
        },
        profile: {
            showHeading: boolean
        }
        education: {
            order: 'degree-school' | 'school-degree'
        },
        workExperience: {
            order: 'title-employer' | 'employer-title',
            groupPromotions: boolean
        },
        strength: {
            layout: 'grid' | 'level' | 'compact' | 'bubble' | 'bullet' | 'pipe' | 'new-line' | 'comma',
            subinfoStyle: 'dash' | 'colon' | 'bracket'
        },
        declaration: {
            showHeading: boolean,
            position: 'left' | 'right',
            signatureLine: 'none' | 'solid'
        }
    }
}