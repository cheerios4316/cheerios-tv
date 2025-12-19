import { Metadata } from "next";

export interface ISettings {
    links: ILink[];
    searchEndpoint: string;
    backgroundImage?: string;
    metadata?: Metadata;
}

export interface ILink {
    image: string;
    anchor: string;
    url: string;
}