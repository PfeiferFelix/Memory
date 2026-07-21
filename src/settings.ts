import './styles/settings.scss';

function toggleImages(): void {
  const theme1 = document.getElementById('Theme1') as HTMLElement;
  const theme2 = document.getElementById('Theme2') as HTMLElement;
  const codeVibes = document.getElementById('code_vibes_theme') as HTMLInputElement;

  if (codeVibes.checked) {
    theme1.style.display = 'block';
    theme2.style.display = 'none';
  } else {
    theme1.style.display = 'none';
    theme2.style.display = 'block';
  }
}

const codeVibesRadio = document.getElementById('code_vibes_theme') as HTMLInputElement;
const gamingVibesRadio = document.getElementById('gaming_vibes_theme') as HTMLInputElement;

codeVibesRadio.addEventListener('change', toggleImages);
gamingVibesRadio.addEventListener('change', toggleImages);

toggleImages();

