export const twitterUrl = 'https://x.com/ASIMOV_Platform';
export const githubUrl = 'https://github.com/asimov-platform';
export const modulesUrl = 'https://github.com/asimov-modules';
export const protocolUrl = 'https://www.asimovprotocol.org';
export const asimovCLIUrl = 'https://github.com/asimov-platform/asimov-module-cli';
export const modulesSpecsUrl = 'https://asimov-specs.github.io';
export const modulesSpecsGithubUrl = 'https://github.com/asimov-specs';

export const footerLinks: {
	title: string;
	links: { text: string; href: string; target?: string }[];
}[] = [
	{
		title: 'Platform',
		links: [
			{ text: 'Modules', href: '#modules' },
			{ text: 'Learn & Code', href: '#learn-code' },
			{ text: 'Why ASIMOV', href: '#why-asimov' }
		]
	},
	{
		title: 'Developers',
		links: [
			{ text: 'CLI Tool', href: asimovCLIUrl, target: '_blank' },
			{ text: 'Browse Modules', href: modulesUrl, target: '_blank' },
			{ text: 'Documentation', href: modulesSpecsUrl, target: '_blank' }
		]
	},
	{
		title: 'Resources',
		links: [
			{ text: 'ASIMOV Protocol', href: protocolUrl, target: '_blank' },
			{ text: 'GitHub', href: githubUrl, target: '_blank' }
		]
	}
];
