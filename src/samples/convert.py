import pymupdf4llm
import glob
import sys

mapping = {
    'diligence': 'Diligence.pdf',
    'compare': 'In-Depth Comparison Report- Optimism vs Arbitrum.pdf',
    'bullbear': 'Bull, Bear, and Balanced Case Report for Aster.pdf',
    'narrative': 'Decentralized AI Compute (DePIN Compute) Sector Analysis.pdf',
    'risk': 'Clarity Act.pdf'
}

for out_name, in_file in mapping.items():
    try:
        md_text = pymupdf4llm.to_markdown(in_file)
        with open(out_name + '.md', 'w') as f:
            f.write(md_text)
        print(f"✅ Created {out_name}.md ({len(md_text)} chars)")
    except Exception as e:
        print(f"❌ Failed {out_name}: {e}")
