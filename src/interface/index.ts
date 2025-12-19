export interface ISettings {
    links: ILink[];
    searchEndpoint: string;
    backgroundImage?: string;
}

export interface ILink {
    image: string;
    anchor: string;
    url: string;
}