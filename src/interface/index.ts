export interface ISettings {
    links: ILink[];
    backgroundImage?: string;
}

export interface ILink {
    image: string;
    anchor: string;
    url: string;
}