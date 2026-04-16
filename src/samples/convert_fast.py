from pypdf import PdfReader
import glob

mapping = {
    'bullbear': 'Bull, Bear, and Balanced Case Report for Aster.pdf',
    'narrative': 'Decentralized AI Compute (DePIN Compute) Sector Analysis.pdf',
    'risk': 'Clarity Act.pdf'
}

for out_name, in_file in mapping.items():
    try:
        reader = PdfReader(in_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open(out_name + '.md', 'w') as f:
            f.write(text)
        print(f"✅ Created {out_name}.md ({len(text)} chars)")
    except Exception as e:
        print(f"❌ Failed {out_name}: {e}")
