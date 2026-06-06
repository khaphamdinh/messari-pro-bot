// No fs/path imports — samples are embedded for Railway deployment

export const REPORT_TEMPLATES: Record<string, string> = {
  diligence: `Act as a Senior Crypto Analyst. Write a strictly formatted **Comprehensive Due Diligence Report** for: [QUERY_PLACEHOLDER].
Sections (Translate the headers into the language of the query):
**1. Executive Thesis:** (Why does this matter now? Core value prop).
**2. Mechanism Design:** (Deep dive into consensus, state growth, or smart contract logic).
**3. Tokenomics & Value Accrual:** (Emission curves, burn rates, utility).
**4. Ecosystem & Traction:** (Developer activity, TVL, user retention).
**5. Risk Assessment:** (Identify 3 existential threats).
**6. Verdict:** (Buy/Hold/Watch with solid reasoning).`,

  compare: `Act as a Protocol Researcher. Write an **In-Depth Comparison Report** critically comparing: [QUERY_PLACEHOLDER].
Sections (Translate the headers into the language of the query):
**1. Strategic Differences:** (How do their approaches vary?).
**2. Tech Architecture:** (Throughput, finality, data availability trade-offs).
**3. Tokenomics Battle:** (Which token accrues value better?).
**4. Moat & Liquidity:** (Institutional backing vs. retail momentum).
**5. Verdict:** (Declare a winner for a 3-year horizon with rationale).`,

  bullbear: `Act as a Macro Hedge Fund Manager. Provide a rigorously objective **Bull, Bear, and Balanced Case Report** for: [QUERY_PLACEHOLDER].
Sections (Translate the headers into the language of the query):
**1. The Bull Thesis:** (3 high-conviction catalysts for massive outperformance).
**2. The Bear Thesis:** (3 structural/macro headwinds that could cause catastrophic underperformance).
**3. Pragmatic Base Case:** (Synthesizing market realities).
**4. Actionable Positioning:** (Weighted allocation recommendation).`,

  narrative: `Act as a Crypto Macro Strategist. Write a panoramic **Sector/Narrative Brief** for: [QUERY_PLACEHOLDER].
Sections (Translate the headers into the language of the query):
**1. Macro Driver & TAM:** (Why is this narrative gaining traction?).
**2. Sub-Sector Breakdown:** (Categorize the layers).
**3. Leading Protocols:** (Top 3 market leaders and their dominance scores).
**4. Bottlenecks:** (What tech or regulatory issues are holding the sector back?).
**5. 12-Month Projection:** (Fad or structural shift?).`,

  risk: `Act as a Crypto Technical Auditor and Policy Analyst. Write an exhaustive **Deep Risk & Policy/Tech Report** covering the issue: [QUERY_PLACEHOLDER].
Sections (Translate the headers into the language of the query):
**1. Problem Formulation:** (Define the exact technical threat or regulatory act).
**2. Attack Vectors:** (How it breaks the system or creates friction).
**3. Mitigation Strategies:** (Current efforts to fix or pivot).
**4. Timeline of Urgency:** (When does this transition from theoretical to existential?).
**5. Market Impact:** (How pricing factors in this risk today).`,

  morning: `Act as the Editor-in-Chief of Messari's Alpha Research Desk. Your objective is to scan all available Messari curated news, intel, and daily recaps from the past 24 hours.
Follow this strict data processing pipeline:
1. **Deduplication:** Aggressively filter out redundant news covering the same event.
2. **Curation:** Select the 10 to 15 most critical, market-moving events. Prioritize major structural crypto developments and 'Crypto x AI' narratives.
3. **Synthesis:** Present these events as a dynamic list of bullet points (use dashes -, NOT numbers). For each event, write EXACTLY one concise, heavily analytical paragraph (2-3 sentences max) capturing the core fact and its immediate market implication. Do NOT just summarize; add critical alpha.
4. **Constraint:** Do NOT categorize them under headers. Do NOT generate fake hyperlinks in the text. I will programmatically append the verified sources at the bottom.`,

  tweet: `Act as an elite Crypto Thread Writer. Transform the analytical research / key concepts for: [QUERY_PLACEHOLDER] into an engaging, high-impact Twitter/X thread.
Requirements (Translate into the language of the query):
1. **The Hook (Tweet 1):** Start with an incredibly punchy contrarian take or a mind-blowing stat about the query. Must be viral-worthy.
2. **The Flow (Tweet 2-5):** Break down the core mechanics, the 'Game Changer' aspect, and the numbers. Use short paragraphs, line breaks, and highly relevant emojis.
3. **Mental Models:** Bring in business or game theory mental models if relevant to explain the thesis clearly.
4. **Formatting:** Number each tweet explicitly like (1/X), (2/X). Use '---' or equivalent line separator between tweets.
5. **Constraint:** Keep the entire thread under 600 words total. Make it analytical but extremely readable and hard-hitting.`
};

// ============================================================
// EMBEDDED STYLE REFERENCE SAMPLES
// Replaces fs.readFileSync — works on Railway (no local files needed)
// ============================================================

const SAMPLE_DILIGENCE = `Deep Research | Powered by MessariAI

### Deep Research | Powered by MessariAI
# **Comprehensive Diligence** **Report for Ethereum**

### Created Nov 18, 2025

**Table of Contents**

**General**
1. What is the function or purpose of the project?
2. What is the function or purpose of the asset (if applicable)?
3. Project Background
4. What's the URL to the project whitepaper?
5. Is the project sponsored or supported by a centralized entity?
6. When was it founded or originated?
7. Where is it based or operating (if applicable)?
8. List of core team members or leaders
9. Does the project team have a relevant background?

**Token Usage and Economics**
1. How does the asset work?
2. Do users or token holders earn fees or compensation?
3. What are the typical ways users can acquire this asset?
4. Does the network have a staking or liquidity provision mechanism?
5. Is the asset primarily used on an associated platform?
6. Do token holders have any claims on capital or voting rights?
7. Are there any burning or token buyback mechanisms?

**Technology**
1. Is the project open-source?
2. Where is the primary source code or repository located?
3. Is the asset built on its own network, or on top of another?
4. Provide links to the relevant token contract(s).
5. What is the accounting standard of the asset's underlying network?
6. Are there contracts outside of the core token contract key to the platform's operation?
7. Has the project received any technical audits?
8. Is the asset supported by any wallets or browser extensions?
9. Does the asset's underlying network have a Rosetta implementation?
10. Are there plans to migrate the asset to another network?

**Legal and Regulatory**
1. Project funding details.
2. Did the project team allocate a share of tokens to themselves?
3. Did the project team discuss or publicize the listing of the asset on secondary trading platforms?
4. Are all contemplated features of the asset fully available?
5. Are the asset and platform designed for gambling or lottery-like games?
6. Is the asset used on potentially illicit sites?
7. Are the management team or the project subject of publicly announced litigation?

## **Comprehensive Diligence Report for Ethereum**

**General**

**1. What is the function or purpose of the project?**

**Project Purpose**: Ethereum functions as a foundational Layer-1 (L1) blockchain platform designed for smart contracts and decentralized applications (dApps), serving as a cornerstone for various new assets and industries such as Decentralized Finance (DeFi), Non-Fungible Tokens (NFTs), Decentralized Autonomous Organizations (DAOs), and Web3. The platform enables users to build extensively through smart contracts, ensuring they run as programmed without censorship or third-party interference.

**Live Features**: Ethereum's mainnet has been operational since July 30, 2015, with no downtime recorded. The network currently operates on a Proof-of-Stake (PoS) consensus mechanism following "The Merge" in September 2022, which reduced energy consumption by approximately 99%. The Ethereum Virtual Machine (EVM) serves as the execution engine optimized for smart contract processing. The platform supports various token standards including ERC-20 (fungible tokens), ERC-721 (NFTs), and ERC-1155 (multi-token standard).

**Planned Features**: Ethereum's roadmap emphasizes a rollup-centric future to address scalability through Layer-2 solutions. The Dencun upgrade in March 2024 implemented EIP-4844 (proto-danksharding), which significantly reduced transaction costs for L2s. Future upgrades include Fusaka (December 2025) introducing PeerDAS for validator bandwidth reduction, and longer-term phases focusing on scalability (The Surge), censorship resistance (The Scourge), easier node operation (The Verge), state bloat reduction (The Purge), and EVM improvements (The Splurge).

**2. What is the function or purpose of the asset (if applicable)?**

**Asset Function**: ETH is the native token of Ethereum with a total supply of approximately 120.8 million as of November 2025. ETH serves multiple functions within the ecosystem: payment for gas fees when users interact with smart contracts or send transactions; staking by validators to secure the network and participate in the PoS consensus mechanism, with a minimum requirement of 32 ETH per validator; and as a medium of exchange across the Ethereum ecosystem, including decentralized exchanges, NFT marketplaces, and lending protocols.

**3. Project Background**

Ethereum was conceptualized by Vitalik Buterin in 2013, motivated by the limitations of Bitcoin's scripting language and the desire to create a more extensible blockchain for smart contracts and dApps. The whitepaper was released on November 27, 2013, followed by the Yellowpaper on April 1, 2014. A public crowdsale was conducted from July 22 to September 2, 2014, raising over $18 million in Bitcoin. The mainnet launched on July 30, 2015, with the Frontier release.

**Key Milestones**: The network has undergone numerous upgrades including Homestead (March 2016), the controversial DAO Fork (July 2016) that split the chain into Ethereum and Ethereum Classic, Byzantium (October 2017), Constantinople (February 2019), Istanbul (December 2019), the London Upgrade implementing EIP-1559 (August 2021), The Merge transitioning to PoS (September 2022), Shanghai/Capella enabling staking withdrawals (April 2023), and Cancun-Deneb introducing proto-danksharding (March 2024).

**Current Status**: As of December 2024, Ethereum is a mature, fully operational blockchain with continuous evolution through hard fork upgrades. The network has successfully transitioned to PoS and continues to implement scaling solutions and protocol improvements.

**4. What's the URL to the project whitepaper?**

The original Ethereum whitepaper was published on November 27, 2013, and the Yellowpaper was released on April 1, 2014. Current technical specifications are maintained in GitHub repositories, with execution layer specifications in the execution-specs repository and consensus layer specifications in the consensus-specs repository.

**5. Is the project sponsored or supported by a centralized entity?**

**Ethereum Foundation**: The project is supported by the Ethereum Foundation (EF), a non-profit organization founded in 2014 by the original co-founders and incorporated in 2018. The foundation is registered and based in Zug, Switzerland, a jurisdiction recognized as crypto-friendly with favorable regulations for non-profit DAO structures. The EF is dedicated to Ethereum's research, core protocol development, and ecosystem growth. As of 2024, the EF's treasury was valued at $970.2 million, primarily held in ETH, and managed conservatively to fund essential projects through market cycles.

**ConsenSys**: Additionally, ConsenSys, founded in 2014 by Joseph Lubin (one of Ethereum's co-founders), serves as a significant supporting entity. Headquartered in Fort Worth, ConsenSys has built infrastructure products and services including MetaMask, Infura, Truffle, and Linea, which have enabled the Ethereum ecosystem to flourish.

**6. When was it founded or originated?**

Ethereum was founded through a series of key dates: the whitepaper was released on November 27, 2013; the Yellowpaper was published on April 1, 2014; the public crowdsale occurred from July 22 to September 2, 2014; and the mainnet launched on July 30, 2015.

**7. Where is it based or operating (if applicable)?**

The Ethereum Foundation operates from Zug, Switzerland. ConsenSys is headquartered at 5049 Edwards Ranch Road, Fort Worth. The network itself operates globally through a decentralized validator set, though as of September 2022, 60% of validators were located in either Germany or the U.S., despite the broader network being distributed across 60 countries.

**8. List of core team members or leaders**

**Founding Team**: Ethereum was founded by eight co-founders: Vitalik Buterin (primary founder), Gavin Wood, Charles Hoskinson, Joseph Lubin, Anthony Di Iorio, Mihai Alisie, Amir Chetrit, and Jeffrey Wilcke.

**Current Leadership**:
- **Vitalik Buterin**: Co-Founder of Ethereum and Board Member of the Ethereum Foundation
- **Aya Miyaguchi**: Executive Director of the Ethereum Foundation
- **Patrick Storchenegger**: Board Member of the Ethereum Foundation
- **Tim Beiko**: Protocol Support Lead
- **Justin Drake**: Core Researcher

**9. Does the project team have a relevant background?**

The founding team brought diverse technical and business expertise to Ethereum's development. Vitalik Buterin, the primary founder, had previously worked on Bitcoin-related projects and identified the limitations of Bitcoin's scripting language, leading to his conception of Ethereum. Gavin Wood contributed significantly to Ethereum's technical foundation, including authoring the Yellowpaper. Joseph Lubin's business acumen led to the founding of ConsenSys, which became instrumental in building Ethereum's infrastructure ecosystem. The current leadership team continues to demonstrate relevant expertise in blockchain research, protocol development, and ecosystem management through their ongoing contributions to Ethereum's evolution.

**Token Usage and Economics**

**1. How does the asset work?**

ETH serves multiple critical functions within the Ethereum ecosystem. As the native asset, ETH is required to pay for transaction fees (gas) on the Ethereum network. The London Hard Fork in August 2021 introduced EIP-1559, which implemented a fee-burning mechanism where a base fee for each transaction is dynamically adjusted based on network congestion and permanently removed from circulation. Approximately 85% of all transaction fees are burned, with the remaining 15% going to validators as "tips" or priority fees.

ETH is also staked by validators to secure the network and participate in the PoS consensus mechanism. Validators earn rewards from three primary sources: newly minted ETH distributed as block rewards, priority fees paid by users, and Maximal Extractable Value (MEV) derived from their ability to reorder, include, or censor transactions within a block. Both native ETH and its wrapped ERC-20 version (WETH) serve as a medium of exchange across the Ethereum ecosystem, including decentralized exchanges, NFT marketplaces, and lending protocols.

**2. Do users or token holders earn fees or compensation?**

ETH holders can earn rewards through several mechanisms. Direct staking requires 32 ETH to operate a validator, earning rewards from issuance, priority fees, and MEV. For holders with less than 32 ETH, liquid staking protocols provide access to staking rewards without technical complexity. Major liquid staking providers include Lido, which distributes 90% of net staking rewards to stETH holders with 5% going to node operators and 5% to the Lido DAO treasury; Rocket Pool, which offers rETH as a value-accruing token; and centralized exchanges like Coinbase offering cbETH.

Staking yields have fluctuated, with Q4 2025 showing an Annual Percentage Rate (APR) around 2.94%. Messari projections for annual yield in 2025 ranged from 2.5% (Base scenario) to 5.0% (Restaking Layer scenario). Additionally, ETH can be used as collateral in DeFi protocols to earn yield or borrow against holdings.

**3. What are the typical ways users can acquire this asset?**

Users can acquire ETH through multiple methods. The initial distribution occurred through the 2014 crowdsale where approximately 60 million ETH (80% of the initial supply) was sold to the public at an average price of approximately $0.31 per ETH. Prior to The Merge in September 2022, ETH was acquired through Proof-of-Work mining. Currently, ETH is widely available for purchase on cryptocurrency exchanges, with daily trading volumes as of November 17, 2025, showing $123.6 billion on centralized exchanges and $1.46 billion on decentralized exchanges.

Post-Merge, ETH can be acquired by staking existing ETH and earning rewards from newly minted ETH, priority fees, and MEV. Institutional interest has grown significantly, with notable inflows into U.S. spot Ethereum ETFs observed in August 2025.

**4. Does the network have a staking or liquidity provision mechanism?**

Ethereum operates a Proof-of-Stake consensus mechanism where validators secure the network by staking ETH. To run a validator, operators need specific infrastructure including execution and consensus clients, an operating system, and hardware for node hosting. Validators earn rewards from three sources: newly minted ETH issuance, priority fees from transactions, and MEV opportunities.

A minimum of 32 ETH is required to activate a single validator on the Ethereum network. Validators must maintain proper infrastructure and meet uptime requirements to avoid penalties.

Direct delegation is not available at the protocol level. However, liquid staking protocols enable users to delegate their ETH to professional node operators. Rocket Pool allows permissionless entry where node operators contribute 16 ETH and an RPL bond, with stakers contributing the remaining 16 ETH to form a 32 ETH minipool validator.

The protocol requires exactly 32 ETH per validator, with no maximum limit on the number of validators a single entity can operate. As of November 2025, approximately 36 million ETH (29% of circulating supply) is staked.

Validator rewards are paid continuously through the consensus mechanism. The issuance policy follows a square root scaling law, with issuance decreasing as staking participation increases to ensure long-term supply stability. In Q3 2025, Ethereum's annualized issuance remained below 1%.

Rewards come from three sources: protocol issuance of new ETH tokens, priority fees paid by users (approximately 15% of transaction fees), and MEV captured by validators through transaction ordering. The EIP-1559 mechanism burns the base fee portion of transactions, contributing to the network's often deflationary monetary policy post-Merge.

**5. Is the asset primarily used on an associated platform?**

ETH is primarily used on the Ethereum mainnet and its associated Layer 2 scaling solutions. The network can be accessed through various interfaces including wallet applications like MetaMask, hardware wallets, and infrastructure providers such as Infura, Alchemy, and QuickNode. Layer 2 solutions like Arbitrum, Optimism, and Polygon utilize ETH for transaction fees and security.

**6. Do token holders have any claims on capital or voting rights?**

ETH holders do not have direct formal voting rights over the base protocol. Unlike application-level DAOs that implement on-chain voting mechanisms, Ethereum's core protocol relies on social consensus and off-chain coordination through the EIP process. While large ETH holders could theoretically attempt to influence governance, the protocol's decentralized, process-driven structure makes outright capture unlikely, as influence requires building consensus among diverse node operators and client teams rather than simple token-weighted voting.

**7. Are there any burning or token buyback mechanisms?**

The primary burn mechanism is EIP-1559, implemented with the London Hard Fork on August 5, 2021. This mechanism algorithmically burns the base fee portion of every transaction, with approximately 85% of transaction fees permanently removed from circulation. The burning occurs continuously with each block and is executed automatically by the protocol, not by the project team.

Layer 2 solutions also contribute to ETH burning. For example, Linea burns 20% of ETH gas fees on Ethereum Layer 1, further supporting ETH's value accrual. The combination of reduced issuance post-Merge and the EIP-1559 burn mechanism has often made ETH a net deflationary asset.

ETH is not a stablecoin. It is a native cryptocurrency with a floating market value that fluctuates based on supply and demand dynamics.

ETH does not have native privacy characteristics. Ethereum's base layer is transparent by design, meaning all accounts, balances, and transactions are publicly visible, offering pseudonymity rather than inherent privacy. This transparency allows for trustless validation but makes on-chain activity susceptible to profiling and surveillance.

The Ethereum Foundation has significantly increased its commitment to privacy, establishing a dedicated Privacy Cluster comprising 47 experts to integrate privacy across the blockchain's layers. Vitalik Buterin published a privacy roadmap for Ethereum in April 2025, focusing on practical upgrades at the wallet and application level without major changes to the consensus layer.

**Technology**

**1. Is the project open-source?**

Ethereum is fully open-source with all core clients operating under various permissive licenses. Execution clients include Geth under GNU LGPL v3, Nethermind in .NET Core, Erigon under GNU LGPLv3, and Besu under Apache 2.0. Consensus clients operate under Lighthouse (Apache-2.0), Prysm (GPL-3.0), Teku (Apache 2.0), Nimbus (Apache-2.0), and Lodestar (LGPL-3.0).

**2. Where is the primary source code or repository located?**

Ethereum's development is managed through public GitHub repositories. Execution layer specifications are maintained in the execution-specs repository, consensus layer specifications in the consensus-specs repository, and the Engine API in the execution-apis repository. The full JSON-RPC API specification and Ethereum Improvement Proposals are also available on GitHub.

**3. Is the asset built on its own network?**

ETH is the native asset of the Ethereum network, which uses an account-based accounting standard. Ethereum is not a fork of another network; it was conceived and built as an original blockchain platform by Vitalik Buterin in 2013 due to Bitcoin's scripting limitations. However, the current Ethereum blockchain is technically a fork of the original Ethereum chain following the DAO hard fork on July 20, 2016, with the original chain continuing as Ethereum Classic.

Ethereum supports various token standards including ERC-20 for fungible tokens, ERC-721 for NFTs, ERC-1155 for multi-token standards, and ERC-4337 for account abstraction.

**7. Has the project received any technical audits?**

Ethereum has undergone numerous technical audits and formal verification efforts. Notable audits include EIP-4788 Smart Contract Audit by Chain Security (September 28, 2023), EIP-4337 Ethereum Account Abstraction Audit by OpenZeppelin (April 19, 2022), EIP-3074 Security Audit by Least Authority (June 14, 2021), Ethereum 2.0 Specifications Security Audit by Least Authority (March 6, 2020), and Node Discovery Protocol Audit by Least Authority (October 25, 2019). The Ethereum Foundation also funds security audits as part of its core development tasks.

**12. Is there notable concentration among nodes or validators?**

Validator concentration exists among major staking entities. As of November 2025, Lido controls approximately 23% of the liquid staking market representing 8.5 million staked ETH, though this represents a decrease from its earlier dominance of nearly 70%. Binance holds 9% and Coinbase holds 6.8% of the market share. Geographic concentration shows 60% of validators located in Germany or the U.S. as of September 2022.

At the protocol level, Ethereum does not have "superuser powers" or "admin keys" that allow for freezing or confiscation of ETH, or rolling back state beyond normal consensus hard forks. The principle of "code is law" is foundational to the protocol. However, the increasing proportion of OFAC-compliant blocks post-Merge (reaching 70% by December 2022) indicates growing influence of censorship-compliant practices among validators, primarily through MEV-Boost relays, which raises concerns about censorship resistance.

External contributors are actively compensated through various programs. The Ethereum Foundation's Ecosystem Support Program (ESP) allocated over $32.6 million in Q1 2025 to projects across community education, consensus layer, cryptography, and developer tooling. The Client Incentive Program provides grants of 144 validators (4608 ETH) to client teams to incentivize long-term maintenance.

Ethereum's governance is primarily off-chain, relying on social consensus through the Ethereum Improvement Proposal (EIP) process. Anyone can propose an EIP, which undergoes community review, iteration based on feedback, and eventual inclusion in network upgrades if approved. AllCoreDevs calls coordinate between execution and consensus layer client teams to discuss upgrades, bug fixes, and EIP prioritization.

The process involves multiple independent client teams (Geth, Nethermind, Erigon, Besu for execution; Lighthouse, Prysm, Teku, Nimbus, Lodestar for consensus) that must implement and coordinate on network upgrades. The Ethereum Foundation facilitates the process through funding and coordination but cannot unilaterally implement changes.

Ethereum continues efforts to increase decentralization across multiple dimensions. Client diversity initiatives aim to reduce Geth's dominance (currently 61% of execution clients), with Lido actively diversifying its client usage. The Ethereum Foundation is fostering independent organizations like Argot Collective, Nomic Foundation, and L2BEAT to share in Ethereum's advancement. Future upgrades focus on mitigating MEV risks, simplifying node verification, and reducing technical debt to create a more robust and decentralized network.

**Legal and Regulatory**

**1. Project funding details**

- Date of funding: July 22 - September 2, 2014
- Number of tokens sold: Approximately 60 million ETH, representing 80% of the initial 72 million ETH supply
- Price of the token at sale: Initial price was 2000 ETH per BTC for the first 14 days, linearly declining to 1337 ETH per BTC, with an average price of approximately $0.31 per ETH
- Amount raised: Over $18 million in Bitcoin
- Known participants: The crowdsale was open to the public. Key founders included Vitalik Buterin, Gavin Wood, Charles Hoskinson, Joseph Lubin, Anthony Di Iorio, Mihai Alisie, Jeffrey Wilcke, and Amir Chetrit

**2. Did the project team allocate a share of tokens to themselves?**

The remaining 12 million ETH (20% of the initial supply) was allocated to the Ethereum Foundation and early contributors. The Ethereum Foundation was allocated approximately 5.98 million ETH (8.31% of the initial total token supply). According to Vitalik Buterin in October 2018, the Ethereum Foundation "only ever owned ~3m, and now has ~660k; the rest was spent on development."

The allocation included 3 million ETH for a long-term endowment, 6 million ETH distributed among 85 developers who contributed prior to the crowdsale, and 3 million ETH for a "developer purchase program" allowing Ethereum developers to purchase ETH at crowdsale prices.

**4. Are all contemplated features of the asset fully available?**

ETH's core features are fully available, including gas payments, staking for network security, and use as a medium of exchange. The network operates on Proof-of-Stake consensus with staking withdrawals enabled since the Shanghai upgrade in April 2023. Additional features continue to be developed, including account abstraction (ERC-4337), privacy enhancements, and scaling improvements through Layer 2 integration. Future upgrades like Fusaka (December 2025) will introduce PeerDAS for validator bandwidth reduction.

**7. Are the management team or the project subject of publicly announced litigation?**

**ConsenSys vs SEC**: ConsenSys filed a lawsuit against the SEC in April 2024, seeking a court ruling that ETH is a commodity and not a security. The SEC had initiated an investigation into whether Ethereum is a security in March 2023, which was closed in June 2024 without charges.

**Tornado Cash Legal Support**: The Ethereum Foundation and Vitalik Buterin have provided financial support for the legal defense of Tornado Cash developers. In February 2025, the Ethereum Foundation donated $1.25 million to support Alexey Pertsev's legal defense. Vitalik Buterin has made multiple donations, including 30 ETH in May 2024 and 50 ETH in January 2025, to legal defense funds for Tornado Cash developers.

No direct litigation against the Ethereum Foundation itself or core team members for criminal or civil matters related to their roles in Ethereum development has been identified in the available documentation.`;

const SAMPLE_COMPARE = `# In-Depth Comparison Report: Optimism vs Arbitrum

Optimism (OP) and Arbitrum (ARB) represent governance tokens for two leading Ethereum Layer 2 scaling solutions that employ optimistic rollup technology — a method that assumes transactions are valid by default but allows challenges during a dispute period — to reduce transaction costs and increase throughput. Both tokens serve as governance mechanisms rather than gas tokens, with users paying transaction fees in ETH on both networks.

### What each asset is & category:

OP and ARB are Layer 2 native governance tokens that grant holders voting rights over protocol upgrades, treasury allocations, and ecosystem development decisions. OP governs the Optimism Collective, which operates a network of chains called the Superchain built on the open source OP Stack. ARB governs the Arbitrum DAO, which controls Arbitrum One and Arbitrum Nova chains, their underlying protocols, and the Security Council. Neither token is required for transaction fees, as both networks use ETH as their gas token.

### Issuers / project entities:

The Optimism Foundation, a foundation company incorporated under Cayman Islands law, guides the growth of the Optimism Collective and defers to the governance of OP token holders through structured rights protections. The Arbitrum Foundation, also incorporated in the Cayman Islands, supports the Arbitrum DAO by managing offchain agreements, allocating funds for protocol growth, and overseeing operational functions. Both foundations operate under DAO oversight, with governance bodies maintaining the authority to change foundation directors and modify operational parameters.

### Design & mechanism:

Optimism Mainnet operates as a Stage 1 optimistic rollup — L2Beat's classification indicating it meets specific decentralization standards including proof systems and permissionless exits — utilizing a fault proof system that enables permissionless validation through the Cannon Fault Proof Virtual Machine. Fault proofs allow users to challenge incorrect state transitions by proving computational errors onchain, with a 7 day challenge period during which disputes can be raised before withdrawals are finalized. Arbitrum One functions as a Stage 1 optimistic rollup but uses interactive fraud proofs requiring multiple transactions to resolve disputes through a bisection game — a process that narrows down disagreements to a single computational step that can be verified onchain. Arbitrum Nova operates on the AnyTrust protocol, utilizing a Data Availability Committee (DAC) — a permissioned group that stores transaction data offchain to reduce costs — enabling faster withdrawals under normal operation but reverting to standard rollup mode if the committee fails.

### Ecosystem role & integrations:

OP tokens facilitate governance over the Superchain ecosystem, where member chains contribute revenue through a standardized model requiring the greater of 2.5% of revenue or 15% of net onchain profit to the Optimism Collective. This revenue funds public goods through Retroactive Public Goods Funding (RetroPGF) — a mechanism that rewards past contributions to the ecosystem — and ecosystem development initiatives. ARB tokens govern a multi chain ecosystem including Arbitrum One for general DeFi applications, Arbitrum Nova for gaming and social applications, and Arbitrum Orbit — customizable Layer 3 chains that can modify gas tokens and governance parameters. The Arbitrum DAO treasury holds approximately $1.3 billion in ARB tokens as of September 2025, funding ecosystem growth through various incentive programs.

OP tokens are native to Optimism Mainnet and are supported across multiple chains built on the OP Stack, including Base (Coinbase's L2), Mode, Zora, and Ronin Network, which adopted the OP Stack in September 2025. ARB tokens are native to Arbitrum One with official support on Arbitrum Nova and numerous Arbitrum Orbit chains. Both tokens maintain their primary governance functions on their respective native chains, with bridged representations available through canonical bridge systems.

## Market Data

### Supply & valuation:

Circulating supply is the portion of total tokens currently in public hands; FDV (fully diluted valuation) values all tokens at the current price, including locked ones. As of August 28, 2025, OP has a circulating supply of 1,752,186,819 tokens from a total supply of 4,294,967,296, representing a market capitalization of $1,243,501,392 and fully diluted valuation of $3,048,075,555. ARB maintains a circulating supply of 5,295,780,056 tokens from a total supply of 10,000,000,000, with a market capitalization of $2,577,091,331 and fully diluted valuation of $4,866,311,107 as of September 2025. The OP token supply increased from 808 million in Q3 2023 to 1.26 billion by Q3 2024, marking a 55.9% increase as tokens were released according to predetermined schedules.

### Emissions & monetary policy:

OP operates with a default 2% annual inflation rate designed to fund ecosystem growth, though governance can adjust this rate and has considered proposals to set inflation to 0%. ARB maintains a maximum inflation rate of 2% per year, which can only be introduced through DAO approval, with no inflation implemented beyond the initial allocation during 2023-2024. Over the last 24 months, OP has released approximately 452 million tokens (from 808 million to 1.26 billion circulating), while ARB has maintained its initial distribution without additional emissions.

### Liquidity & trading:

OP recorded a 24 hour trading volume of $158,329,727 as of August 28, 2025, with primary trading occurring on centralized exchanges including Binance (OP/USDT: $20,487,128), DigiFinex ($12,320,774), and WhiteBIT ($13,535,135). ARB demonstrated higher liquidity with a 24 hour volume of $401,389,107 as of September 2025. Both tokens trade predominantly against USDT on major centralized exchanges, with Tether, USD, and USD Coin representing the top three trading pairs for OP.

### Holder/staker profile:

OP has approximately 269,605 token holders as of September 17, 2025, with the Ecosystem Fund controlling 25% of total supply and RetroPGF program holding 20% of total supply. ARB maintains a holder base with the DAO treasury controlling 35.3% of total supply as of June 30, 2025, while team and investor allocations represent 26.9% and 17.5% respectively. Native staking is not applicable for either token as they function purely as governance tokens. Notable protocol holders include GMX as the largest single ARB holder with 8 million tokens as of 2025.

### Usage & activity:

Optimism recorded a TVL of $456.3 million as of September 2025, supporting 97 protocols across its ecosystem. Arbitrum demonstrated higher usage with a TVL of $6.56 billion reaching a new all time high on September 17, 2025, with Arbitrum One maintaining 4.2 million monthly active users as of September 2025.

Both networks utilize canonical bridges — official protocols for moving assets between chains — with distinct withdrawal mechanisms. Optimism employs a 7 day withdrawal period through its Standard Bridge, requiring users to wait for the challenge period before funds become available on Ethereum. Arbitrum One implements a withdrawal window of 45,818 blocks (approximately 6.5 days), while Arbitrum Nova enables instant withdrawals under normal AnyTrust operation but reverts to the standard delay if the Data Availability Committee fails.

### Purpose & utility:

Both OP and ARB function exclusively as governance tokens, granting holders voting rights over protocol parameters, treasury allocations, and ecosystem development decisions. OP holders participate in a bicameral governance system comprising the Token House for protocol upgrades and treasury management, and the Citizens' House for Retroactive Public Goods Funding distribution. ARB holders govern through a single token DAO structure with authority over Constitutional AIPs that modify core protocols and Non-constitutional AIPs for funding requests and guidelines. Neither token serves as a gas token, with both networks requiring ETH for transaction fees.

Both networks operate as Stage 1 optimistic rollups according to L2Beat's classification, but employ different dispute resolution mechanisms. Optimism utilizes a fault proof system with the Cannon Fault Proof Virtual Machine, enabling permissionless validation through interactive proofs that require multiple transactions over time. Arbitrum One implements interactive fraud proofs using a bisection game to identify disputed instructions, which are then executed onchain in a WASM (WebAssembly) — a binary instruction format for efficient execution — OneStepProver contract. Arbitrum Nova differentiates itself through the AnyTrust protocol, utilizing a Data Availability Committee to store transaction data offchain for reduced costs, while maintaining a fallback to standard rollup operation if committee integrity is compromised.

OP launched with a total supply of 4,294,967,296 tokens featuring a 2% default annual inflation rate that governance can modify, with 25% allocated to ecosystem development, 20% to RetroPGF, and 19% to airdrops. ARB operates with a 10 billion token supply and maximum 2% annual inflation requiring DAO approval, distributing 35.3% to the DAO treasury, 26.9% to team and advisors, 17.5% to investors, and 11.6% to user airdrops as of June 30, 2025. ARB implements structured 4 year vesting schedules for team and investor allocations with monthly unlocks after the first year, while OP follows a flexible release schedule tied to ecosystem milestones and governance decisions. Neither token implements burns or buybacks, and value accrual mechanisms beyond governance rights are not disclosed.

### Distribution & concentration:

OP maintains allocations for public goods funding through RetroPGF (20% of supply) and ecosystem development (25% of supply). ARB concentrates 35.3% in the DAO treasury while maintaining team and investor allocations of 26.9% and 17.5% respectively, subject to multi-year vesting periods as of June 30, 2025. The Arbitrum DAO treasury's $1.3 billion value in ARB tokens as of September 2025 provides resources for ecosystem incentives, while Optimism's model emphasizes ongoing revenue generation through Superchain contributions.

### Policy controls & governance:

Optimism operates through a bicameral system where the Token House manages protocol upgrades and treasury distributions while the Citizens' House oversees RetroPGF allocation. A Security Council established in February 2024 operates with a 75% signing threshold and manages protocol upgrades under governance direction, serving 12 month terms. The Security Council can pause withdrawals across the Superchain but cannot alter historical transactions or arbitrarily change user balances. Arbitrum governance functions through a single-token DAO with a 12 member Security Council requiring 9/12 approval for emergency actions, with terms extended to 2 years in September 2025. Both systems maintain upgrade controls through multi-signature mechanisms, with Optimism utilizing a 2/2 multisig between the Foundation and Security Council, while Arbitrum employs allowlisted validators and a permissioned Security Council.

### Ecosystem integration:

Optimism's Superchain model creates a unified ecosystem where member chains contribute revenue through standardized terms, with Base contributing $4.9 million (73.6% of total revenue) by May 2025. This approach emphasizes horizontal scaling through interoperable chains sharing security and governance. Arbitrum focuses on vertical integration through specialized chains: Arbitrum One for general DeFi, Nova for gaming and social applications, and Orbit for customizable Layer 3 deployments. Arbitrum's Stylus upgrade, launched September 3, 2024, enables smart contracts written in Rust, C, and C++, expanding developer accessibility beyond Solidity.

### Regulatory posture:

Both foundations operate under Cayman Islands incorporation, providing regulatory clarity for their governance structures. The Optimism Foundation maintains rights protections ensuring the Token House can veto changes that would materially diminish OP holder rights. The Arbitrum Foundation operates under DAO oversight with the authority to change directors and modify operational parameters. Neither foundation has disclosed specific regulatory licenses or compliance frameworks beyond their incorporation jurisdictions.

### Operational resilience:

Optimism experienced unsafe head stalls on April 30, 2024, and September 4, 2024, requiring network pauses by OP Labs with no user funds affected. The network's fault proof system was temporarily reverted to permissioned operation in August 2024 before being re-enabled with the Granite upgrade in Q3 2024. Arbitrum has experienced infrastructure-related outages affecting Arbiscan (blockchain explorer) services on September 8, 2025 (11 minutes), September 12, 2025, and September 15, 2025, while maintaining core network operations. Both networks maintain centralized sequencers — entities that order and batch transactions — with governance authority to modify sequencer operations, though both are developing decentralized sequencing solutions as planned features.

### Technical & tokenomics events:

Optimism activated its permissionless fault proof system on June 11, 2024, marking advancement to Stage 1 decentralization, though the system was temporarily reverted to permissioned operation in August 2024 before being restored with the Granite network upgrade in Q3 2024. The Holocene network upgrade was implemented on January 9, 2025, introducing protocol improvements and enhanced functionality. Arbitrum launched Stylus on mainnet on September 3, 2024, enabling smart contracts written in WebAssembly compatible languages including Rust, C, and C++, offering performance improvements of 10-70x for compute-intensive operations. The BOLD (Bounded Liquidity Delay) protocol for permissionless validation went live on February 13, 2025, enabling anyone to participate in validating chain state and advancing toward Stage 2 decentralization.

### Market & liquidity events:

Arbitrum launched Timeboost on April 18, 2025, a transaction ordering system that generated nearly $3 million in fees within three months, with 97% of revenue flowing to the DAO treasury. This mechanism allows users to bid for transaction priority through 60 second auctions, reducing MEV exploitation while generating revenue. Optimism's revenue model continued expanding through Superchain growth, with Base contributing $1.86 million in membership fees by May 4, 2024, and generating $4.9 million representing 73.6% of total ecosystem revenue by May 2025.

Optimism allocated 850 million OP tokens across RetroPGF rounds 4-7 in March 2024, distributing 20.4 million OP to 374 projects throughout 2024. The ecosystem expanded with Ronin Network's governance vote on September 9, 2025, to adopt the OP Stack, transitioning from a sidechain to an Ethereum L2 with $5-7 million in grants from the Optimism Foundation. Arbitrum approved the Gaming Catalyst Program on June 7, 2024, allocating 225 million ARB over three years (2024-2027) to support gaming projects, though the program faced criticism by March 2025 regarding accountability and progress. The DeFi Renaissance Incentive Program launched on September 3, 2025, with $40 million in ARB tokens to boost liquidity and innovation across lending and borrowing protocols.

### What is similar vs. materially different:

Both OP and ARB function as governance tokens for Stage 1 optimistic rollups that use ETH for transaction fees, operate under Cayman Islands incorporated foundations, and maintain 7 day withdrawal periods. Material differences emerge in scale, with Arbitrum recording $6.56 billion TVL versus Optimism's $456.3 million as of September 17, 2025 and September 2025 respectively. Governance structures differ through Optimism's bicameral system versus Arbitrum's single token DAO, and ecosystem approaches vary between Optimism's Superchain revenue sharing and Arbitrum's specialized multi-chain model. Revenue generation mechanisms differ, with Optimism relying on Superchain member contributions and Arbitrum implementing Timeboost auction revenue alongside traditional sequencer fees.

For governance exposure to Layer 2 scaling, ARB provides access to an ecosystem with higher transaction volumes and TVL ($6.56 billion vs $456.3 million as of September 2025), while OP offers exposure to a Superchain model with potential for horizontal scaling through member chain growth. For treasury or institutional holdings, ARB's higher market capitalization ($2.58 billion vs $1.24 billion as of August-September 2025) and trading volume ($401.4 million vs $158.3 million daily) may offer better liquidity. For ESG-focused mandates, OP's public goods funding model through RetroPGF may align with sustainability objectives.

### Key monitoring items:

Critical upcoming events include OP token releases from ecosystem fund allocations following the 55.9% increase pattern observed from Q3 2023 to Q3 2024, and ARB vesting releases from team and investor allocations following monthly schedules through March 2027. Governance proposals affecting inflation rates require monitoring, particularly OP's potential shift from 2% default inflation to 0% and ARB's DAO decisions on implementing the 2% maximum inflation. Technical milestones include Optimism's progression toward Stage 2 decentralization through Security Council evolution and Arbitrum's BOLD implementation effectiveness following the February 13, 2025 launch. Ecosystem developments include Superchain member chain additions beyond the September 9, 2025 Ronin adoption and Arbitrum Orbit chain deployments with Stylus adoption rates following the September 3, 2024 mainnet launch.

This analysis presents factual comparisons based on publicly available data and official documentation without investment recommendations. Token holders should evaluate governance participation requirements, ecosystem development trajectories, and technical risk factors according to their specific investment criteria and risk tolerance. Market data reflects conditions as of August 28, 2025 through September 17, 2025 and may not represent current or future performance.`;

const SAMPLE_BULLBEAR = `Bull, Bear, and Balanced Case Report for Aster

Executive Summary

Aster presents a high-risk, high-reward investment opportunity in the rapidly evolving decentralized perpetual exchange (perp DEX) sector. This analysis assigns a 35% probability to the bull case, 25% to the bear case, and 40% to the balanced case over a 12-24 month investment horizon.

The top five takeaways for investors are:

- CZ backing provides distribution advantages: Binance founder CZ's support through YZi Labs offers credibility and potential user acquisition channels that could accelerate market share gains against Hyperliquid, supporting the bull case.
- Strong launch metrics indicate product-market fit: $371 million in day-one trading volume, 330,000 new wallet addresses, and 20% perpetual DEX market share capture during Stage 1 demonstrate user demand, though sustainability remains uncertain for the balanced case.
- Regulatory risks threaten operations: No-KYC derivatives trading and 1,001x leverage create exposure to enforcement actions similar to the CFTC's 2022 Ooki DAO case, representing the primary bear case catalyst.
- Layer 1 launch could expand ecosystem: The October 5, 2025 blockchain launch may differentiate Aster from competitors and create additional token utility, though execution risk and competition with established Layer 1 networks could limit impact.
- Token distribution uncertainty creates modeling challenges: Over 50% community allocation supports decentralization, but undisclosed vesting schedules for team and investor allocations prevent accurate dilution modeling across all scenarios.

Background

Aster emerged from the strategic merger of Astherus and APX Finance announced on December 5, 2024, combining Astherus' yield-generating products with APX's perpetual trading infrastructure. The project launched in September 2025 with backing from Binance founder Changpeng Zhao (CZ) through YZi Labs, positioning it as a competitor to established perp DEX leader Hyperliquid.

Aster operates as a multi-chain decentralized perpetual exchange supporting BNB Chain, Ethereum, Solana, Arbitrum, and seven Ethereum Virtual Machine (EVM) chains total. The platform's architecture centers on three distinct trading modes. Pro Mode utilizes an order book interface with deep liquidity and advanced tools for sophisticated traders, featuring trading fees of 0.01% for makers and 0.035% for takers. Simple Mode provides Automated Market Maker (AMM)-based trading against the Aster Liquidity Pool (ALP) with Maximal Extractable Value (MEV)-resistant execution and up to 1,001x leverage for retail users. Spot Mode offers traditional spot trading through order book mechanisms.

Key historical milestones demonstrate rapid execution and market adoption. The Token Generation Event (TGE) occurred on September 17, 2025, followed by listings on major exchanges including Binance Alpha and HTX on September 19, Bybit on September 21, and OKX perpetual futures on September 22. Aster became the first project to debut on CoinMarketCap's CMC Launch on September 23, 2025. The platform's Stage 1 airdrop campaign attracted over 527,000 wallets and generated $37.7 billion in trading volume over 20 weeks, capturing nearly 20% of the perpetual DEX market share.

Tokenomics

ASTER serves as the native governance and utility token within the Aster ecosystem, with a total supply of 8 billion tokens. The tokenomics structure prioritizes community participation through an allocation of over 50% of total supply designated for community airdrops, with 8.8% (704 million ASTER) unlocked immediately at the September 17, 2025 TGE for eligible participants.

Token allocation breakdown:
- Community airdrops: Over 50% of total supply
- Team allocation: Undisclosed
- Investor allocation: Undisclosed
- Treasury/ecosystem fund: Undisclosed
- Initial unlock: 8.8% (704 million ASTER) at TGE

The lack of detailed allocation information beyond the community portion creates significant modeling challenges for investors attempting to assess future dilution scenarios. This opacity represents a material risk factor given the potential for unexpected token releases.

Token utility encompasses multiple functions within the Aster ecosystem. ASTER functions as the primary governance token, enabling holders to participate in protocol decisions and upgrades. The token integrates into Aster's Trade & Earn program, where users can employ yield-generating assets like asBNB (liquid staking tokens) and USDF (yield-bearing stablecoins) as trading collateral while continuing to earn passive rewards.

The current circulating supply stands at approximately 1.66 billion ASTER as of September 24, 2025, representing roughly 20% of the total supply. Detailed vesting schedules for allocations beyond the community airdrop remain undisclosed, creating uncertainty around future token releases for team, investor, and treasury allocations.

Value capture mechanisms center on trading volume growth and ecosystem expansion. As trading volumes increase across Aster's multi-chain platform, the protocol generates revenue through trading fees, with daily revenue reaching $9 million on September 24, 2025. The upcoming Layer 1 chain launch could introduce additional utility for ASTER as a native gas token and staking asset.

Market Positioning & Ecosystem

Aster positions itself as a direct competitor to Hyperliquid, the current market leader in decentralized perpetual exchanges, while differentiating through multi-chain support, CZ backing, and yield integration features. The broader competitive landscape includes established players such as dYdX (order book-based perpetuals), GMX (AMM-based perpetuals with liquidity pools), and Drift (Solana-based perpetuals), each with distinct architectural approaches and market positioning.

Against primary competitor Hyperliquid, Aster leverages several key differentiators. The multi-chain architecture supporting BNB Chain, Ethereum, Solana, and Arbitrum provides broader accessibility compared to Hyperliquid's more limited chain support. Aster's integration with BNB Chain offers potential synergies with Binance's ecosystem and CZ's backing, providing credibility and potential user acquisition channels. The platform's cross-chain trading capability eliminates the need for manual bridging, addressing a user experience friction point in multi-chain DeFi.

Developer activity and ecosystem growth metrics demonstrate strong early traction. The platform attracted nearly 330,000 new wallet addresses within 24 hours of launch. Trading volume metrics show rapid market share capture, with Aster surpassing Hyperliquid's daily volume on multiple occasions, achieving $21.6 billion compared to Hyperliquid's $10.7 billion on September 24, 2025.

Bull Case (35% Probability)

In brief: Aster captures 30%+ of the perpetual DEX market share within 12-24 months through successful Layer 1 execution, regulatory clarity, and sustained competitive advantages.

The bull case centers on successful execution of the Layer 1 chain launch, continued market share gains against Hyperliquid, and regulatory clarity that legitimizes decentralized derivatives trading. Under favorable conditions, Aster could capture 30% or more of the perpetual DEX market share within 12-24 months, driven by superior user experience, CZ's backing, and yield integration features.

The October 5, 2025 Layer 1 chain launch represents the primary catalyst for the bull case, potentially creating ecosystem expansion and differentiation from competitors operating on existing blockchains. A purpose-built blockchain optimized for derivatives trading could provide performance advantages including faster settlement, lower fees, and enhanced scalability compared to general-purpose blockchains. The L1 launch would also introduce additional utility for ASTER as a native gas token and staking asset, creating new demand drivers beyond governance and collateral functions.

CZ's backing through YZi Labs provides distribution advantages that could accelerate user acquisition and institutional adoption. The Binance founder's credibility and extensive network in the cryptocurrency industry could facilitate strategic partnerships, exchange listings, and user migration from centralized platforms. Social media endorsements and public support from CZ have already generated community interest, as evidenced by the launch metrics and rapid market share capture.

Regulatory clarity supporting decentralized derivatives trading would remove a major overhang and enable institutional participation. Clear regulatory frameworks that distinguish between truly decentralized protocols and centralized operators could provide safe harbors for platforms like Aster while maintaining appropriate consumer protections. Such clarity would likely trigger institutional adoption, professional market maker participation, and integration with traditional financial infrastructure.

Bear Case (25% Probability)

In brief: Aster faces operational restrictions, user exodus, and substantial value destruction within 12-24 months due to regulatory crackdowns, competitive displacement, or technical failures.

The bear case reflects downside risks from regulatory crackdowns, competitive displacement, technical failures, and governance capture by concentrated token holders. Under adverse conditions, Aster could face operational restrictions, user exodus, and substantial value destruction within 12-24 months.

Regulatory enforcement represents the primary bear case risk, with the CFTC's 2022 action against Ooki DAO providing a relevant precedent for potential enforcement against no-KYC derivatives platforms. Aggressive regulatory actions targeting Aster's high-leverage offerings and no-KYC model could force operational changes, geographic restrictions, or complete shutdowns in major markets. The platform's offering of up to 1,001x leverage and U.S. stock derivatives without traditional regulatory compliance creates heightened exposure to enforcement actions.

Competitive displacement by Hyperliquid or new entrants could erode Aster's early market share gains. While Aster achieved strong initial trading volumes, Hyperliquid maintains advantages in liquidity depth, track record, and established user base. New competitors with superior technology, regulatory compliance, or institutional backing could capture market share, particularly if regulatory pressure forces Aster to compromise its no-KYC model or reduce leverage offerings.

Technical failures or security breaches could severely damage Aster's reputation and user confidence. The platform's multi-chain architecture and rapid development timeline increase technical complexity and potential attack vectors. A security incident, smart contract vulnerability, or cross-chain bridge exploit could result in user fund losses and permanent reputation damage.

Balanced Case (40% Probability)

In brief: Aster achieves moderate success as a significant but not dominant player, stabilizing with 15-20% market share amid mixed regulatory outcomes and sustained competition.

The balanced case represents the most likely scenario where Aster achieves moderate success as a significant but not dominant player in the perpetual DEX market. Under this scenario, Aster stabilizes with 15-20% market share, sufficient for sustainability but falling short of displacing Hyperliquid as the market leader.

Adoption patterns under the balanced case would show steady but not explosive growth, with regulatory uncertainty limiting institutional participation while retail adoption continues at a measured pace. The no-KYC model would attract privacy-conscious users and jurisdictions with favorable DeFi regulations, but regulatory restrictions in major markets would cap total addressable market expansion. The platform would likely need to implement some compliance measures or geographic restrictions to maintain operations in key markets.

CZ's backing would provide ongoing credibility and some distribution advantages through the Binance ecosystem, but would not be sufficient to overcome all competitive and regulatory challenges. The association would help with user acquisition and partnership development but would not guarantee market dominance or regulatory immunity.

Conclusion

Aster presents a high-risk, high-reward investment opportunity in the rapidly evolving decentralized perpetual exchange sector. The analysis assigns a 40% probability to the balanced case as the most likely outcome, reflecting moderate success amid competitive and regulatory challenges, with 35% probability for the bull case driven by successful L1 launch and regulatory clarity, and 25% probability for the bear case centered on regulatory enforcement and competitive displacement.

Key tokenomics factors present both opportunities and risks for investors. The community-focused distribution with over 50% of tokens allocated to airdrops demonstrates commitment to decentralization and could create network effects through user engagement. However, the lack of detailed vesting schedules for team and investor allocations represents a critical information gap that could impact future price dynamics through unexpected selling pressure. The current circulating supply of approximately 1.66 billion ASTER represents roughly 20% of the total supply, with the remaining distribution timeline unclear.

Investors should monitor the following key factors for reassessing scenario probabilities: regulatory developments affecting no-KYC derivatives platforms, competitive dynamics with Hyperliquid and new entrants, L1 chain launch execution and adoption metrics, token unlock schedules and large holder movements, governance decisions on fee structures and value accrual mechanisms, security incidents or technical vulnerabilities, and macroeconomic factors affecting DeFi derivatives adoption.`;

const SAMPLE_NARRATIVE = `Decentralized AI Compute (DePIN Compute) Sector Analysis

1) Executive Summary

The decentralized AI compute sector represents a rapidly maturing alternative to traditional cloud providers, leveraging blockchain technology to create distributed computing resources for AI workloads. As of September 25, 2025, the sector commands an aggregate market capitalization of $6.1 billion across seven leading projects, with projections suggesting the broader DePIN market could reach $3.5 trillion by 2028.

Top 5 Takeaways for Investors:
- Significant Cost Advantages: Decentralized networks offer 50-85% cost savings compared to centralized cloud providers, with Akash providing compute up to 85% cheaper than traditional alternatives and io.net offering NVIDIA A100 access at $0.89/hour versus AWS's $5.12/hour.
- Rapid Infrastructure Scaling: The sector has achieved substantial scale with Aethir operating over 400,000 GPUs across 95 countries, io.net maintaining 318,933 verified GPUs, and Bittensor supporting 64 specialized AI subnets.
- Regulatory Headwinds: The EU AI Act implementation timeline creates compliance obligations (prohibitions effective February 2025, General Purpose AI (GPAI) obligations by March 2025, penalties beginning August 2025), while U.S. export controls on advanced AI chips continue affecting global supply chains.
- Technical Maturation: Advanced verification mechanisms including zero-knowledge (ZK) proofs (RISC Zero's zkVM approach), Proof-of-Time-Lock systems, and hardware attestation protocols are addressing trust and verification challenges.
- Revenue Growth Despite Token Declines: Leading networks achieve substantial revenue growth (Aethir's $110 million Annual Recurring Revenue (ARR)) despite significant token price declines (-10% to -75% across major assets over the past 12 months).

12-24 Month Outlook Scenarios:
- Base Case (55%): Steady enterprise adoption with 2-3x revenue growth despite continued token price volatility
- Bull Case (25%): Mainstream enterprise migration and favorable regulatory clarity driving 5-10x growth potential
- Bear Case (20%): Regulatory restrictions and traditional cloud provider competitive responses limiting growth

2) Sector Definition & Scope

Decentralized AI compute operates as a sub-segment of Digital Resource Networks (DRNs) within the broader Decentralized Physical Infrastructure Networks (DePIN) ecosystem. DePIN systems leverage token rewards to incentivize crowdsourcing and building of real-world physical infrastructure, while DRNs specifically focus on fungible digital resources like compute, storage, and bandwidth.

Problem Addressed: The sector addresses three core problems in traditional cloud computing: (1) high costs due to centralized provider monopolization, (2) centralized control creating single points of failure and censorship risks, and (3) limited access for developers in regions with restricted cloud services.

Value Chain Position: Decentralized AI compute functions as middleware between blockchain infrastructure and AI applications, enabling permissionless access to compute resources. Users can deploy AI workloads without traditional Know Your Customer (KYC) requirements or geographic restrictions, while providers monetize idle hardware resources globally.

Sub-segments:
- GPU Marketplaces: io.net, Aethir, Nosana providing raw compute access
- AI/ML/Inference Networks: Bittensor, Gensyn offering specialized AI model training and inference
- Rendering Networks: Render Network for visual processing and AI-powered content creation
- General-Purpose Compute: Akash Network, Golem for broader computational applications

3) History & Evolution

The decentralized AI compute sector evolved through three distinct phases, each shaped by technological advances and market dynamics.

Early Phase (2020-2022) — Foundation Building: Render Network launched with a focus on path-tracing image jobs for cinematic visual effects, establishing the first major decentralized GPU network. Akash Network introduced its "Airbnb for Datacenters" model using reverse auctions where tenants specify resource requirements and providers bid competitively. Bittensor created a competitive marketplace for machine learning models, pioneering token-incentivized AI development.

Growth Phase (2023-2024) — AI Boom Catalyst: The AI narrative drove substantial growth, contributing $3 billion to DePIN market capitalization from June to November 2023. Render Network migrated to Solana in November 2023, citing affordability and fast transaction times, while expanding beyond rendering to AI compute through governance proposals RNP 004 and RNP 005. The broader DePIN sector experienced 296% year-over-year growth in fundraising, raising $246 million across 70 deals in 2024.

Maturation Phase (2025) — Infrastructure Scaling and Security Hardening: Aethir expanded to over 400,000 GPUs across 95 countries by February 2025, while the broader DePIN market surpassed $50 billion in May 2025. Networks implemented advanced security measures following major incidents, with Akash introducing the Akash Enhancement Proposal (AEP) 76 Burn-Mint Equilibrium model in September 2025.

4) Current State

As of September 25, 2025, the decentralized AI compute sector demonstrates substantial infrastructure scale alongside significant token price volatility.

Adoption Metrics:
- GPU Infrastructure: Aethir operates over 400,000 GPUs across 95 countries, io.net maintains 318,933 verified GPUs with 34,724 cluster-ready, Render Network supports over 3,000 GPUs
- Network Activity: Bittensor supports 64 specialized subnets covering diverse AI workflows, Aethir has delivered over 430 million compute hours, Akash maintains 74 active providers with 100% year-over-year growth
- Usage Patterns: AI inference and training dominate demand, with revenue from AI inference projected to grow at 48% CAGR to $169 billion by 2032

Capital Flows (as of September 25, 2025): Total sector market capitalization reaches $6.1 billion, distributed as: Bittensor (TAO) $3.0 billion, Render (RENDER) $1.8 billion, Aethir (ATH) $682 million, Akash (AKT) $274 million, Livepeer (LPT) $269 million, Golem (GLM) $218 million, and io.net (IO) $108 million.

Despite infrastructure growth, token prices declined significantly over the past 12 months: TAO -45.3%, AKT -65.1%, LPT -58.6%, GLM -37.1%, IO -74.8%, and RENDER -41.2%. Only ATH showed relative resilience with -10.2% decline.

5) Technology & Architecture

Decentralized AI compute networks employ sophisticated mechanisms for job scheduling, verification, and payment processing, each designed to address specific trust and scalability challenges.

Job Scheduling and Resource Allocation: Akash Network uses a reverse auction model where tenants specify deployment requirements (GPU, CPU, memory, storage) and providers bid to offer resources. io.net employs Ray-based distributed computing for optimizing clustering and task orchestration, with a head node managing workload distribution. Aethir uses Indexers to match compute requests to available containers.

Verification Systems: Networks implement diverse verification mechanisms to ensure computational integrity. io.net combines Proof-of-Work (PoW) and Proof-of-Time-Lock (PoTL) with staking-based penalties for underperforming nodes. Aethir uses Proof-of-Capacity (PoC) and Proof-of-Delivery (PoD) mechanisms. Bittensor employs Yuma Consensus to reward top-performing AI models.

Advanced verification includes zero-knowledge approaches: RISC Zero's zkVM enables verifiable computation by allowing programs in mainstream languages to generate ZK proofs. However, ZK verification introduces 1,000x to 100,000x computational overhead for complex AI model inference and training workloads due to the cryptographic proof generation requirements, leading to alternative approaches like Optimistic ML (opML) and Trusted Execution Environment (TEE) verification.

Payment and Escrow Mechanisms: Token economics vary significantly across networks. Akash's AEP 76 introduces the Burn-Mint Equilibrium (BME) model with ACT (Akash Compute Token), a non-transferable USD-pegged compute credit. Tenants prepay in ACT (minted by burning AKT), creating consistent buy pressure on AKT while providing stable USD pricing.

6) Economics & Value Capture

Revenue Sources: Networks generate revenue through marketplace fees, with io.net charging a 2% facilitation fee (waived for direct IO payments). Aethir charges a 20% platform fee on service transactions.

Compute fees represent the primary revenue driver, with pricing significantly below centralized alternatives. Akash offers up to 85% cost savings versus traditional cloud providers, while io.net provides NVIDIA A100 access at $0.89/hour compared to AWS's $5.12/hour.

Tokenomics and Value Accrual: Tokens serve multiple roles across networks: payment for services, governance participation, and staking for security. Akash's AEP 76 BME model creates deflationary pressure by burning AKT to mint ACT compute credits. Render's burn-and-mint mechanism balances token supply with network demand.

Bittensor's Dynamic TAO proposal aims to automate emission distribution through market-driven mechanisms, with subnet token pools enabling validators to stake TAO for rewards. io.net's disinflationary model reduces emissions over 20 years while implementing programmatic burns.

7) Market Sizing & Share

Aggregate Market Metrics: Total sector capitalization reaches $6.1 billion across seven leading projects as of September 25, 2025. Market share distribution shows Bittensor (TAO) leading with $3.0 billion (49% of sector), followed by Render (RENDER) at $1.8 billion (30%), and remaining infrastructure providers comprising 21%.

Market Share by Sub-segment:
- AI/ML Networks: Bittensor dominates with 49% market share
- Rendering/Video Processing: Render Network (30%), Livepeer (4%) combined 34% market share
- GPU Marketplaces: Aethir (11%), io.net (2%) combined 13% market share
- General-Purpose Compute: Akash (4%), Golem (4%) combined 8% market share

8) Top Assets/Projects

Bittensor leads in token value despite infrastructure challenges, reflecting its unique position as a comprehensive AI development platform. The network's 64 subnets cover diverse AI workflows from text generation to financial predictions, creating network effects through specialized AI services. However, the network faces technical risks including blockchain halts (May 2025) and security incidents ($8M wallet attack in July 2024).

Render Network migrated from visual rendering to general AI compute through RNP 019, introducing dedicated GPU nodes for AI inference and machine learning. The migration to Solana improved transaction costs and speed, while the expanding AI compute subnet addresses broader market demand beyond traditional rendering.

Aethir demonstrates the largest GPU infrastructure scale with over 400,000 GPUs across 95 countries, achieving $110 million annual recurring revenue. The network's enterprise focus and partnerships with platforms like Sequence and MetaGravity provide stable demand, though centralization risks and upcoming token unlocks present challenges.

Akash Network maintains its "Airbnb for Datacenters" positioning with innovative tokenomics through AEP 76's Burn-Mint Equilibrium model. However, limited high-end GPU supply (174 total GPUs) constrains AI workload capabilities compared to specialized competitors.

io.net operates as a GPU cloud compute marketplace built on Solana, aggregating over 318,933 verified GPUs globally. The network experienced Sybil attacks where malicious actors spoofed GPU availability, leading to enhanced security measures and planned head node distribution to address centralization risks.

9) Competitive Dynamics & Moats

Network Effects and Liquidity: Provider density creates positive feedback loops, with larger networks attracting more users through better resource availability and pricing. Bittensor's 64 subnets generate network effects through specialized AI services, while Render's 3,000+ GPUs provide rendering capacity that smaller networks cannot match. Aethir's 400,000 GPU infrastructure creates substantial liquidity for enterprise customers.

Switching Costs and Integration Complexity: Technical integration requirements vary significantly across networks. Akash's Docker container deployment model offers familiar interfaces for cloud-native applications, while Bittensor requires specialized AI model development skills. Data migration costs increase with workload complexity, particularly for training large AI models requiring consistent hardware configurations.

Pricing Competitiveness: Cost advantages remain a primary competitive factor, with networks offering 50-85% savings versus centralized providers. io.net provides NVIDIA A100 access at $0.89/hour compared to AWS's $5.12/hour, while Akash delivers up to 85% cost reductions. However, pricing alone is insufficient for enterprise adoption, which requires Service Level Agreements (SLAs) and reliability guarantees.

10) 12-24 Month Sector Outlook

Base Case (55% Probability) — Steady Enterprise Adoption: The most likely scenario involves continued gradual enterprise adoption driven by cost advantages and improved technical maturity. Networks maintain 50-85% cost savings versus centralized providers, attracting price-sensitive customers and developers in regions with limited cloud access. Revenue growth accelerates 2-3x across leading networks, with Aethir expanding beyond its current $110 million ARR and other networks achieving meaningful revenue milestones.

Bull Case (25% Probability) — Mainstream Enterprise Migration: An optimistic scenario sees accelerated enterprise adoption driven by favorable regulatory clarity and major cloud provider partnerships. Major enterprises migrate significant workloads to decentralized networks, driven by cost savings, censorship resistance, and geographic distribution benefits. Token prices recover significantly (5-10x growth potential) as networks demonstrate sustainable revenue models and token utility becomes clearer.

Bear Case (20% Probability) — Regulatory and Competitive Headwinds: A pessimistic scenario involves restrictive regulatory implementation and aggressive competitive responses from traditional cloud providers. Traditional cloud providers respond with significant price reductions and improved service offerings, eroding decentralized networks' primary competitive advantage. Market consolidation accelerates, with only 1-2 networks surviving as viable alternatives to centralized providers.

11) Conclusion

The decentralized AI compute sector presents substantial opportunities alongside significant execution and regulatory risks, with outcomes heavily dependent on enterprise adoption rates and competitive responses from traditional cloud providers.

Structural Attractions: The sector addresses real market needs through substantial cost advantages (50-85% savings versus centralized providers), censorship resistance for developers in restricted regions, and innovation pace exceeding traditional cloud development cycles. Networks have achieved meaningful scale with over 400,000 GPUs deployed globally and revenue growth reaching $100+ million ARR for leading players.

Structural Risks: Regulatory uncertainty remains the primary structural risk, with EU AI Act implementation and U.S. export controls creating compliance obligations that may favor centralized providers with dedicated legal resources. Token price volatility affects provider economics and network security, while the disconnect between infrastructure growth and token value suggests limited correlation between network usage and investment returns.

The decentralized AI compute sector stands at an inflection point where technical capabilities increasingly meet enterprise requirements, but regulatory clarity and competitive dynamics will ultimately determine whether these networks capture meaningful market share from traditional cloud providers or remain niche alternatives for specific use cases.`;

const SAMPLE_RISK = `Deep Research | Powered by MessariAI

# The U.S. Digital Asset Market Clarity Act (CLARITY Act): Structure, Revisions, and Implications for Crypto Market Structure

Created Feb 1, 2026

## 1. Key Insights

- The Digital Asset Market Clarity Act of 2025 (H.R. 3633, the "CLARITY Act") is the House's flagship digital asset market structure bill, designed to move U.S. crypto regulation from case-by-case enforcement to a clear statutory framework that divides responsibilities between the Securities and Exchange Commission (SEC) and Commodity Futures Trading Commission (CFTC).
- In the Senate, parallel efforts — the Banking Committee's CLARITY/DAMCA draft and the Agriculture Committee's Digital Commodity Intermediaries Act (DCIA) — build on and in some respects diverge from the House approach, especially around DeFi, stablecoins, and financial surveillance.
- Together, these texts construct a new taxonomy for digital assets: "digital commodities" overseen primarily by the CFTC; "mature blockchain systems" that have graduated from securities treatment; and, in Senate Banking's version, "ancillary assets" subject to bespoke SEC disclosure rules.
- The House bill creates a $75 million exempt offering pathway and broader safe-harbor concepts that allow token issuers to raise capital with tailored disclosures while building toward decentralization, whereas Senate drafts tighten timing and disclosure expectations, particularly for ancillary assets.
- DeFi and non-custodial infrastructure are treated relatively lightly in the House version (with explicit carve-outs and fraud backstops) but face more intrusive treatment in Senate Banking's draft, which extends Bank Secrecy Act (BSA), sanctions, and AML obligations to some blockchain front ends and DeFi interfaces.
- CLARITY interlocks with the already-enacted GENIUS Act stablecoin law: the House regime recognizes "permitted payment stablecoins" under joint SEC-CFTC oversight, while the Senate draft controversially bans issuers from paying yield solely for holding a payment stablecoin, forcing yield into separate lending products.
- The expansion of BSA obligations to digital commodity intermediaries and the new surveillance authorities in Senate drafts raise civil-liberties concerns and could reinforce market concentration by favoring large, well-capitalized intermediaries.
- Implementation will stress agency capacity — especially at the CFTC, where staffing has already declined — and likely trigger Administrative Procedure Act (APA), preemption, and classification litigation as projects and regulators test the new boundaries.

## 2. Introduction and Legislative Context

U.S. crypto markets have operated for years in a regulatory "gray zone," with overlapping SEC and CFTC claims and limited bespoke statutory guidance. Token issuers and trading venues have faced uncertainty over whether and when digital assets are securities, commodities, or something in between, and regulators have largely governed through enforcement rather than clear ex-ante rules.

The Digital Asset Market Clarity Act of 2025 (H.R. 3633) is the House's attempt to replace that patchwork with a coherent market structure law that:
- Defines key categories of digital assets and intermediaries
- Assigns primary jurisdiction for "digital commodities" to the CFTC and leaves fundraising and investment contracts with the SEC
- Establishes exemptions and safe harbors to allow network development while maintaining investor protection and anti-illicit-finance controls

In parallel, the Senate has developed its own drafts through the Banking and Agriculture Committees. These texts — often referred to collectively as CLARITY or DAMCA (Digital Asset Market Clarity Act) and DCIA (Digital Commodity Intermediaries Act) — share core goals with the House bill but introduce new constructs (like "ancillary assets") and more aggressive BSA/AML measures, especially targeting DeFi access points.

### 2.1 Why Market Structure Legislation Was Needed

Before CLARITY, agencies relied on traditional tests like Howey to determine whether a token sale constituted an investment contract, but there was no digital-asset-specific statute delineating when a token could evolve from a security-like instrument into a commodity-like asset. This ambiguity produced several problems:
- Regulatory turf battles: The SEC and CFTC both asserted authority over overlapping aspects of crypto markets, creating uncertainty for exchanges and token issuers.
- Enforcement-driven policy: Absent a clear statute, industry guidance emerged primarily from enforcement actions and speeches, which many viewed as unpredictable and backward-looking.
- Offshoring and consumer risk: Policymakers argued that the lack of clear rules pushed legitimate firms offshore while leaving U.S. consumers exposed to unregulated venues and products.

### 2.2 Overview of the CLARITY Act Package

- House CLARITY Act (H.R. 3633): Provides definitions for "digital asset" and "digital commodity," grants the CFTC exclusive jurisdiction over digital commodities and their spot markets, creates an exempt offering pathway up to $75 million, and establishes a new CFTC registration regime for digital commodity platforms, including BSA obligations.
- Senate Banking CLARITY/DAMCA draft: Introduces "ancillary assets," refines the lifecycle transition from security to commodity status, creates a special carve-out for tokens underlying exchange-traded products (ETPs), adds a micro-innovation sandbox, and significantly expands Treasury's financial-surveillance powers and restrictions on stablecoin yield.
- Senate Agriculture DCIA: Focuses on expanding CFTC authority over spot digital asset markets, building out licensing and prudential requirements for digital commodity intermediaries.

## 3. Legislative Timeline and Process

- May 29, 2025: H.R. 3633, the Digital Asset Market Clarity Act of 2025, is introduced in the House by Rep. French Hill, Chair of the House Financial Services Committee.
- June 5, 2025: House Financial Services holds a hearing on the bill, examining its framework for defining digital assets and assigning SEC/CFTC roles.
- July 17, 2025: The unified CLARITY Act passes the House with a strong bipartisan majority (294 votes in favor) and is sent to the Senate.
- July 18, 2025: The GENIUS stablecoin act is signed into law, providing the stablecoin counterpart to CLARITY's market structure reforms.
- January 13, 2026: Senate Banking releases its CLARITY/DAMCA draft, including detailed provisions on ancillary assets, stablecoin yield, DeFi, and Treasury surveillance powers.
- January 29, 2026: Senate Agriculture advances DCIA out of committee on a 12-11 party-line vote, significantly expanding CFTC authority over spot digital assets.

Implementation timelines: CLARITY gives the SEC and CFTC approximately 360 days after enactment to complete key rulemakings, while intermediaries such as digital commodity exchanges, brokers, and dealers must register with the CFTC within 180 days. Full operational implementation is expected to take 1-2 years beyond passage.

## 4. Core Architecture of the House CLARITY Act

### 4.1 Policy Objectives

House CLARITY pursues three main policy goals:
1. Regulatory clarity and division of labor: Delineate which assets and activities fall under SEC versus CFTC oversight, ending the current jurisdictional ambiguity.
2. Innovation and competitiveness: Explicitly framed as promoting U.S. leadership in digital assets while providing guardrails to protect consumers.
3. Consumer protection and illicit-finance controls: Through disclosure requirements, BSA integration, and joint rulemakings, CLARITY tries to reduce fraud and illicit use without banning core technologies.

### 4.2 Key Definitions and Regulatory Perimeter

- Digital commodity: H.R. 3633 defines a category of "digital commodity" that encompasses non-security digital assets associated with blockchains and used in decentralized networks, and assigns this category to the CFTC.
- Digital asset platforms: The bill creates regulated classes of "digital commodity exchanges," "digital commodity brokers," and "digital commodity dealers," which must register with the CFTC and comply with new conduct and prudential standards.

### 4.3 SEC-CFTC Jurisdictional Split

Under House CLARITY:
- CFTC: Holds exclusive jurisdiction over spot-market trading in "digital commodities," including digital commodity exchanges, brokers, and dealers, except when such assets are traded on SEC-regulated venues.
- SEC: Retains jurisdiction over primary market fundraising via investment contracts, subject to the new $75 million exempt offering pathway. Keeps antifraud and anti-manipulation authorities over digital commodities, and retains jurisdiction over digital commodity activities occurring on SEC-registered broker-dealers and exchanges.
- Shared oversight: Both agencies share oversight of "permitted payment stablecoins," reflecting stablecoins' hybrid nature as both payments instruments and traded assets.

## 5. Evolving Classification Framework

### 5.1 Digital Commodities and the CFTC's Expanded Role

The core innovation of CLARITY is to codify "digital commodities" as a distinct class of assets regulated by the CFTC in the spot market. Senate Agriculture's DCIA amplifies this role by explicitly extending CFTC authority to spot digital asset transactions, subjecting fungible cryptoassets such as ETH and memecoins to a comprehensive licensing and oversight regime for intermediaries.

### 5.2 Mature Blockchain Systems and Decentralization Criteria

House CLARITY introduces the concept of a "mature blockchain" to determine when a project has achieved sufficient decentralization and functional utility to transition from securities treatment to digital commodity status. Key criteria include:
- Decentralized control: No single entity may hold more than roughly 20% of ownership or control over the blockchain system.
- Functional utility: Tokens must be intrinsically linked to network operations — paying transaction fees, participating in staking, or governing protocol parameters.
- Transparency and open source: The protocol should be open-source with transparent operations and community-driven governance and development.

### 5.3 Ancillary Assets (Senate Banking)

The Senate Banking CLARITY/DAMCA draft introduces a distinct construct: the "ancillary asset" — a token that can be sold alongside securities but does not itself convey traditional financial rights like dividends, profit sharing, or corporate governance authority. Issuers of ancillary assets may self-certify that the asset is a non-security, subject to SEC review within a defined window (e.g., 60 days). Unless the project is decentralized or small, issuers face robust disclosure obligations around project operations, promoter involvement, and tokenomics.

### 5.4 ETF Carve-Out and Blue-Chip Commodities

The Senate Banking draft creates an important ETP carve-out: tokens that are the principal asset in an exchange-traded product listed on a national securities exchange as of January 1, 2026 are automatically treated as commodities. At the time of drafting, this carve-out clearly covers Bitcoin (BTC) and Ethereum (ETH), and could expand to tokens such as DOGE, XRP, or SOL if they become the reference asset of listed spot ETFs by that date. This mechanism effectively codifies a "blue-chip commodity" tier for ETF-underlying tokens, conferring legal certainty and potentially reinforcing their status as the safest assets for institutional participation.

## 6. Fundraising, Safe Harbors, and Issuer Disclosure Obligations

### 6.1 The $75 Million Exempt Offering

House CLARITY creates a new exemption from Securities Act of 1933 registration for the offer and sale of an investment contract involving units of a digital commodity, subject to several constraints:
- Cap: Aggregate proceeds must not exceed $75 million over any 12-month period.
- Network status: The underlying blockchain's status (mature versus immature) affects eligibility and ongoing obligations.
- Issuer conditions: Issuers must meet conditions relating to domicile, compliance history, and disclosures.
- Offering statement: Issuers are required to file an "offering statement" with the SEC and to provide periodic updates until specified triggers — such as network maturity — are satisfied.

## 7. DeFi, Non-Custodial Infrastructure, and Intermediary Regulation

### 7.1 House DeFi Carve-Outs

House CLARITY is relatively hands-off toward DeFi infrastructure:
- Activities such as running nodes, developing or operating open-source software, or passively providing liquidity to pools are generally not treated as regulated intermediary activities.
- Regulators retain anti-fraud and anti-manipulation authority over activity in digital commodity markets.

### 7.2 Senate Banking Provisions on DeFi

Senate Banking's DAMCA draft takes a more interventionist stance:
- Title III defines "decentralized protocol" and classifies protocols that do not meet decentralization criteria, as well as their associated front ends, as regulated entities subject to the Securities Exchange Act of 1934 and BSA compliance.
- The draft extends sanctions and AML obligations to some blockchain front ends and DeFi interfaces, which observers say goes "far beyond" the House version's illicit-finance provisions.

Critics warn that these measures could chill non-custodial DeFi development by imposing compliance burdens on interfaces and development teams, and push usage toward either fully permissionless smart contract interaction without U.S. front ends or toward offshore interfaces beyond U.S. jurisdiction. Coinbase has explicitly cited perceived "DeFi prohibitions" in the Senate draft as a central reason for withdrawing its support.

### 7.3 Developer Liability and Money Transmission Laws

Despite tougher provisions for interfaces, the Senate draft includes an important developer protection: software creators of non-custodial tools are shielded from prosecution under money transmission laws, addressing concerns raised by cases such as the prosecution of Tornado Cash co-founder Roman Storm.

## 8. Stablecoins, the GENIUS Act, and Yield Restrictions

### 8.1 The GENIUS Act

The Guiding and Establishing National Innovation for U.S. Stablecoins (GENIUS) Act of 2025 establishes a dedicated federal framework for payment stablecoins: requires 1:1 reserve backing, rigorous AML compliance, and monthly transparency reports for issuers. Passed the House with strong bipartisan support and was signed into law in July 2025.

### 8.2 Senate Banking's Ban on Issuer-Paid Stablecoin Yield

Senate Banking's CLARITY/DAMCA draft introduces a controversial rule: payment stablecoin issuers are prohibited from paying yield solely for holding the stablecoin, effectively barring direct pass-through of reserve interest as a reward to token holders. Users can still earn yield via separate systems — for example, by depositing stablecoins in DeFi lending protocols — provided the yield is associated with the lending product, not the mere holding of the coin.

Traditional financial institutions have favored such limits to reduce head-to-head competition from yield-bearing stablecoins, while crypto firms view them as a threat to innovation and user adoption. Coinbase has singled out the yield prohibition as a key reason it now opposes the Senate draft.

## 9. BSA/AML, Surveillance Powers, and Illicit Finance

### 9.1 Expansion of BSA Coverage

House CLARITY significantly extends the reach of the Bank Secrecy Act (BSA): Section 110 designates digital commodity brokers, dealers, and exchanges that allow direct customer access as "financial institutions" under the BSA. The Treasury Secretary, in consultation with the SEC and CFTC, must impose BSA requirements aligned with those for futures commission merchants, including AML/CFT programs, customer identification, record-keeping, and suspicious activity reporting.

### 9.2 Senate Banking's Enhanced Treasury Powers

The Senate Banking CLARITY/DAMCA draft goes further on financial surveillance:
- Grants Treasury broader authority to impose special measures on crypto transactions or counterparties deemed high-risk for money laundering or terrorism financing.
- Allows for temporary transaction holds (freezes) without court orders under certain conditions.
- Explicitly extends sanctions and AML obligations to blockchain front ends and some DeFi applications, reaching beyond custodial intermediaries.

Analysts at Galaxy Research characterize this as the most significant expansion of financial surveillance powers since the USA PATRIOT Act, drawing sharp criticism from civil-liberties advocates and many industry participants.

### 9.3 Civil Liberties and Surveillance-State Concerns

Civil-liberties and crypto-policy commentators raise several concerns:
- The combination of expanded BSA coverage, special measures, and warrantless transaction holds accelerates the trend toward a "surveillance state" for financial activity, now extended deeply into on-chain transactions.
- Some technologists warn that these provisions expand executive power and create broad monitoring mechanisms that could be misused.

## 10. Agency Capacity, Implementation Risks, and Litigation Outlook

### 10.1 CFTC Resource Constraints

CLARITY and DCIA place substantial new responsibilities on the CFTC. However, the CFTC's capacity is constrained: the agency's workforce declined by roughly 21.5% between FY 2024 and FY 2025, according to its Office of Inspector General. The OIG warns that taking on expansive new crypto oversight would place "exceptional strain" on the CFTC, requiring new technical expertise, data systems, and enforcement resources.

### 10.2 Litigation Risk Vectors

Several elements of CLARITY and DAMCA could invite litigation:
- APA challenges: Complex rulemakings around asset classifications, DeFi interfaces, and surveillance measures may be challenged as arbitrary, capricious, or beyond statutory authority.
- Preemption disputes: The preemption clause treating digital commodities as "covered securities," thereby overriding state registration requirements, could provoke challenges from state regulators.
- Delegation and separation of powers: Expansive definitions of decentralization or ancillary assets, coupled with strong enforcement and surveillance powers, may invite arguments that Congress has delegated too much undefined authority to agencies.

## 11. Industry, Investor, and Policy Reactions

Supporters argue that, despite imperfections, CLARITY is a necessary evolution:
- Ripple's legal leadership and CEO welcome the bill as a long-overdue framework to resolve SEC-CFTC turf wars and give established projects predictable rules.
- Andreessen Horowitz (a16z) supports the legislation's technology-neutral but crypto-aware approach, which they see as enabling innovation in tokens and DeFi while providing investor protection.
- Bitwise argues that passage could serve as an "all-clear" signal for institutional capital in altcoins such as Solana, because legal clarity around classification and venue oversight is a prerequisite for many regulated investors.

Critics highlight multiple areas of concern:
- Coinbase initially supported the House process but later withdrew support for the Senate Banking draft, labeling it "unworkable." Their main objections include restrictions on paying yield on stablecoins, heavy and potentially duplicative disclosure requirements for many tokens, perceived DeFi prohibitions and expanded BSA/surveillance mandates, and unclear treatment of tokenized equities.
- Former CFTC Chair Timothy Massad criticizes the heavy reliance on decentralization as a legal test, arguing it is difficult to define and may undermine established securities-law doctrines.
- Protocol founders, such as Cardano's Charles Hoskinson, worry that Senate drafts grant the SEC excessive discretion to determine when projects are decentralized enough to escape securities status, creating ongoing uncertainty.

## 12. Strategic Implications for Crypto Projects and Market Structure

### 12.1 Token Design and Network Governance

If CLARITY and related bills are enacted broadly along current lines, projects are likely to:
- Prioritize governance and ownership dispersion to meet "mature blockchain" or decentralization criteria, potentially front-loading token distributions or community governance structures.
- Design tokens with clear functional utility — for fees, staking, or governance — to support classification as digital commodities rather than pure investment contracts.
- Consider whether to pursue ancillary-asset treatment (under Senate Banking's regime) versus aiming directly for mature-blockchain status under House concepts.

### 12.2 Fundraising and Compliance Strategy

For fundraising strategies:
- The $75 million exemption offers a significant on-ramp for U.S.-facing projects willing to comply with offering statements and periodic reporting while they build toward maturity.
- Some projects may choose to remain outside U.S. markets to avoid BSA, surveillance, and disclosure burdens, especially where core user bases are global.
- Others may embrace U.S. jurisdiction to gain access to institutional capital and regulated venues, accepting higher compliance costs in return for legal certainty.

### 12.3 Centralized vs. Decentralized Intermediaries

Given expanded registration and BSA requirements:
- Centralized exchanges and large intermediaries are positioned to become primary on- and off-ramps for retail users, especially in the U.S., as they can absorb compliance costs.
- DeFi venues may increasingly serve professional and global users willing to engage directly with smart contracts, while U.S.-facing front ends implement stricter KYC and monitoring.
- Hybrid models — centralized interfaces with on-chain settlement — may proliferate as firms seek to combine regulatory compliance with DeFi's capital efficiency.

### 12.4 Scenarios: With vs. Without CLARITY Enactment

Two medium-term scenarios stand out:
- With CLARITY-style enactment: BTC and ETH become fully entrenched as regulated digital commodities; a clear path from securities to commodity status unlocks new tokenization and DeFi products for institutions; but higher compliance and surveillance may concentrate activity and limit grassroots experimentation in the U.S.
- Without enactment (or with major dilution): The status quo of regulation-by-enforcement persists; industry faces continued uncertainty and offshoring incentives; and the U.S. risks ceding leadership to jurisdictions with clearer frameworks, while still expanding piecemeal surveillance authorities.

## 13. Conclusion

The Digital Asset Market Clarity Act of 2025 and its Senate counterparts represent the most ambitious attempt yet to build a comprehensive U.S. market structure for digital assets. By defining digital commodities, codifying paths from securities to commodities via mature blockchains and ancillary-asset regimes, and clarifying SEC-CFTC jurisdiction, these bills seek to replace a decade of improvisation with a durable rulebook.

Yet the same texts embed far-reaching choices about financial surveillance, state-federal preemption, and the acceptable boundaries of decentralization. Their ultimate impact will depend on how agencies implement key definitions, how courts respond to inevitable challenges, and whether industry participants view the new regime as a foundation for innovation or a catalyst for further fragmentation.

For projects, intermediaries, and investors, the message is clear: token design, governance structures, and compliance strategies will need to be reconsidered through the lens of CLARITY's taxonomy and obligations. Preparing for that shift — while monitoring the evolving legislative and rulemaking process — will be essential to operating successfully in the next phase of the U.S. digital asset market.`;

const EMBEDDED_SAMPLES: Record<string, string> = {
  diligence: SAMPLE_DILIGENCE,
  compare:   SAMPLE_COMPARE,
  bullbear:  SAMPLE_BULLBEAR,
  narrative: SAMPLE_NARRATIVE,
  risk:      SAMPLE_RISK,
};

const ALLOWED_TYPES = new Set(['diligence', 'compare', 'bullbear', 'narrative', 'risk', 'tweet', 'morning']);

export function getPromptTemplate(type: string, query: string): string {
  const safeType = ALLOWED_TYPES.has(type) ? type : null;
  const globalRule = `

CRITICAL SYSTEM CONSTRAINTS:
1. **DYNAMIC LANGUAGE OUTPUT:** You MUST auto-detect the language of the User's Query.
   - If the query is in **English**, act and respond entirely in **English**.
   - If the query is in **Vietnamese**, act, think, and respond entirely in **perfect, natural Vietnamese** (translating all requested template headers to Vietnamese).
   - Only keep industry-standard technical terms (like TVL, Market Cap, Staking, Validators, Smart Contracts) in English for professional authenticity.
2. **DEPTH & LENGTH CONSTRAINT (MINIMUM 1500 WORDS):** For all deep reports (diligence, logic, narrative, compare, risk), you MUST write an exhaustive, highly detailed analysis. Write at least 4-5 dense paragraphs per section. Do not summarize briefly. Expand on historical context, underlying mechanics, and data-driven projections to ensure the final report is comprehensive and exceptionally long.
3. **NO MARKDOWN TABLES:** Do NOT use Markdown tables (e.g., | Column |) under any circumstances. They render terribly on mobile telegram app. Use bulleted lists instead to present any structured data or comparisons.
4. **NO DATA HALLUCINATION:** If grounded data is provided in the context, stick to the exact numbers. Do not invent metrics.`;

  let sampleContext = '';
  if (safeType && EMBEDDED_SAMPLES[safeType]) {
    const sampleContent = EMBEDDED_SAMPLES[safeType];
    sampleContext = `\n\n=== REFERENCE STYLE & FORMATTING SAMPLE ===\nAnalyze and strictly mimic the exact tone, vocabulary, paragraph structure, and formatting style of this sample report. DO NOT copy the dummy data in the sample, ONLY extract and clone its writing style:\n\n${sampleContent}\n\n=== END SAMPLE ===\n\n`;
  }

  if (safeType && REPORT_TEMPLATES[safeType]) {
    return REPORT_TEMPLATES[safeType].replace('[QUERY_PLACEHOLDER]', query) + sampleContext + globalRule;
  }

  // Default Freestyle Fallback prompt for Deep Research
  return `Act as a Master Analyst and Critical Thinker at Messari Crypto. Answer the following query with deep analytical rigor, foresight, and absolute mastery of the subject matter.

MANDATE:
- NEVER constrain yourself to basic or mainstream consensus summaries. Dig deep.
- ALWAYS look for the 'Game Changer'. Provide contrarian, out-of-the-box perspectives.
- BE HIGHLY CRITICAL. Unapologetically point out practical flaws, tokenomics pitfalls, or hidden risks in projects.
- Use pragmatic mental models, strategic frameworks, or real-world TradFi analogies if it helps explain complex systems.

Query: "${query}"` + sampleContext + globalRule;
}
