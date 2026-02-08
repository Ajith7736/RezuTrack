import React, { ReactElement } from "react";

export type Themeprops = "light" | "dark" | "system"

export interface contents {
    icon: ReactElement;
    title: string;
    desc?: string;
}

export type Status = "Applied" | "Pending" | "Interviewing" | "No_Response" | "Rejected" | "Offer";

export interface User {
    id: string;
    email: string;
    fullname: string | null;
    image: string | null;
    createdAt: string;
}

export interface Resume {
    id: string;
    userId: string;
    resumeContent: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export interface Application {
    id: string;
    userId: string;
    companyName: string;
    roleTitle: string;
    resumeId: string;
    resumeUsed: string;
    Date: Date;
    Link: string;
    jobDescription: string;
    Status: Status;
}

export interface ResumeChanges {
    id: string;
    old_resume_id: string;
    new_resume_id: string;
    changed: string;
    removed: string;
    notChanged: string;
    dateChanged: string;
    resumeId: string | null;
}

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>

