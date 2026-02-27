export function formatResponse(rawText: string, sources: Array<{ domain: string, title: string, url: string }> = [], costUsd: number = 0.25): string {
    const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];

    // Build Curated Links block
    let curatedLinks = "";
    if (sources && sources.length > 0) {
        // Filter out junk, only keep news, intel, and research_report
        const validSources = sources.filter(s =>
            s.domain === 'news' ||
            s.domain === 'intel' ||
            s.domain === 'research_report' ||
            s.domain === 'trending_topic'
        );

        // Remove duplicates by URL and cap at 15 items to match prompt intent
        const uniqueSources = Array.from(new Map(validSources.map(s => [s.url, s])).values()).slice(0, 15);

        if (uniqueSources.length > 0) {
            curatedLinks = "\n\n🔗 **Verified Sources:**\n";
            const linkArray: string[] = [];

            uniqueSources.forEach((s) => {
                let shortName = s.title.split(" ").slice(0, 6).join(" ").replace(/[\\[\\]_*]/g, "");
                if (s.title.split(" ").length > 6) {
                    shortName += "...";
                }
                const typeEmoji = s.domain === 'news' ? '🗞️' : s.domain === 'intel' ? '🧠' : s.domain === 'trending_topic' ? '🔥' : '🔗';
                linkArray.push(`${typeEmoji} [${shortName}](${s.url})`);
            });

            // Join them with newlines to form a bulleted list
            curatedLinks += linkArray.join("\n");
        }
    }

    const footer = `
---${curatedLinks}
💰 Cost: $${costUsd}/request
⏳ ${timestamp}
🌐 Network: Base / USDC
`;

    // Clean up ugly markdown headers that AI might hallucinate
    // e.g., "## 3. Leading Protocols" -> "🔥 **3. Leading Protocols**"
    let cleanedText = rawText.replace(/###\s(.*?)(?=\n|$)/g, "🔹 **$1**");
    cleanedText = cleanedText.replace(/##\s(.*?)(?=\n|$)/g, "🔥 **$1**");
    // Clean up ugly list asterisk combinations like "*  **" 
    cleanedText = cleanedText.replace(/^\*\s+\*\*/gm, "🔸 **");

    return `${cleanedText}\n${footer}`;
}
