const avatarInput = document.getElementById('avatar');
const avatarPreview = document.getElementById('preview');

avatarInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function() {
      avatarPreview.src = reader.result;
      avatarPreview.style.display = 'block';
    }
    reader.readAsDataURL(file);
  } else {
    avatarPreview.src = '#';
    avatarPreview.style.display = 'none';
  }
});
