export function formatDownloads(downloads: number): string {
	if (downloads >= 1000000) {
		return (downloads / 1000000).toFixed(1) + 'M';
	}
	if (downloads >= 1000) {
		return (downloads / 1000).toFixed(1) + 'K';
	}
	return downloads.toLocaleString();
}

export function formatStars(count: number): string {
	if (count >= 1000) {
		return `${(count / 1000).toFixed(1)}k`;
	}
	return count.toString();
}

export function getLanguageColor(language: string): string {
	const colors: { [key: string]: string } = {
		Python: 'bg-blue-100 text-blue-800',
		TypeScript: 'bg-indigo-100 text-indigo-800',
		JavaScript: 'bg-yellow-100 text-yellow-800',
		Go: 'bg-cyan-100 text-cyan-800',
		Rust: 'bg-orange-100 text-orange-800',
		Ruby: 'bg-red-100 text-red-800',
		PowerShell: 'bg-purple-100 text-purple-800',
		Nix: 'bg-green-100 text-green-800',
		Svelte: 'bg-pink-100 text-pink-800',
		Unknown: 'bg-gray-100 text-gray-800'
	};
	return colors[language] || 'bg-gray-100 text-gray-800';
}
