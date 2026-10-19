"""Create a reproducible submission archive without dependencies or local state."""
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'submission'
SKIP={'node_modules','.git','.expo','dist','dist-ssr','web-build','__pycache__','.idea','.vscode'}
REQUIRED=['docs/main-report.md','docs/main-report.pdf','docs/ai-audit-report.md','docs/ai-audit-report.pdf',
          'docs/ai-critique.md','docs/ai-critique.pdf','docs/README.md','docs/bug-report.md',
          'docs/git-commit-log.txt','.cursor/skills/fr-domain-testing/SKILL.md']

def package():
    for relative in REQUIRED:
        if not (ROOT/relative).is_file():raise FileNotFoundError(relative)
    OUT.mkdir(exist_ok=True)
    target=OUT/'23120175_HW02_AI_DomainTesting_099.zip'
    with ZipFile(target,'w',ZIP_DEFLATED) as z:
        z.write(ROOT/'docs/README.md','README.md')
        for path in sorted(ROOT.rglob('*')):
            rel=path.relative_to(ROOT)
            if not path.is_file() or any(p in SKIP for p in rel.parts):continue
            if rel.parts[0]=='submission':continue
            if '.cursor' in rel.parts and 'skills' not in rel.parts:continue
            if path.name.startswith('.env') or path.name=='.DS_Store':continue
            if path.suffix in {'.sqlite','.db','.log','.zip'} or '-journal' in path.name:continue
            z.write(path,str(Path('eshop-sut')/rel))
    with ZipFile(target) as z:
        assert z.testzip() is None
        assert 'README.md' in z.namelist()
        for rel in REQUIRED:assert f'eshop-sut/{rel}' in z.namelist()
    print(target)

if __name__=='__main__':package()
