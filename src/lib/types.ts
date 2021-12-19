export interface Link {
	title: string;
	description: string;
	href: string;
}

export interface LinkSection {
	title: string;
	description: string;
	links: Link[];
}

export interface Links {
	title: string;
	subtitle: string;
	sections: LinkSection[];
}

export const default_link: Link = {
	title: 'Example Link',
	description: 'This is an example of a link',
	href: 'https://example.com'
};

export const default_link_section: LinkSection = {
    "title": "Example",
    "description":"This is an example of a link section",
    "links": [
        default_link,
        default_link,
        default_link,
    ]
}

export const default_links: Links = {
    title: 'SampleLinks',
    subtitle: 'Example for Linkte',
    sections: [
        default_link_section,
        default_link_section,
        default_link_section,
        default_link_section,
        default_link_section,
    ]
}
