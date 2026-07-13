(function(){
  const timeDisplay   = document.getElementById('timeDisplay');
  const playBtn        = document.getElementById('playBtn');
  const topPlayIcon    = document.getElementById('playIcon');
  const resetBtn       = document.getElementById('resetBtn');
  const musicIcon      = document.getElementById('musicIcon');
  const weatherIcon    = document.getElementById('weatherIcon');
  const rain           = document.getElementById('rain');
  const modeBtns       = document.querySelectorAll('.mode-btn');
  const sessionLabel   = document.getElementById('sessionLabel');
  const dots           = document.querySelectorAll('.dot');
  const backBtn        = document.getElementById('backBtn');

  const ICON_PLAY  = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_PAUSE = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  const ICON_PLAY_SM  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
  const ICON_PAUSE_SM = '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';

  let totalSeconds = 25 * 60;
  let remaining = totalSeconds;
  let running = false;
  let timerId = null;
  let completedSessions = 0;

  function formatTime(s){
    const m = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return m + ':' + sec;
  }

  function render(){
    timeDisplay.textContent = formatTime(remaining);
  }

  function updateDots(){
    dots.forEach((d, i) => d.classList.toggle('filled', i < completedSessions));
  }

  function tick(){
    if (remaining <= 0){
      pause();
      completedSessions = Math.min(completedSessions + 1, 4);
      updateDots();
      return;
    }
    remaining--;
    render();
  }

  function play(){
    if (remaining <= 0) remaining = totalSeconds;
    running = true;
    playBtn.innerHTML = ICON_PAUSE;
    topPlayIcon.innerHTML = ICON_PAUSE_SM;
    topPlayIcon.classList.add('on');
    timerId = setInterval(tick, 1000);
  }

  function pause(){
    running = false;
    playBtn.innerHTML = ICON_PLAY;
    topPlayIcon.innerHTML = ICON_PLAY_SM;
    topPlayIcon.classList.remove('on');
    clearInterval(timerId);
  }

  function toggle(){
    running ? pause() : play();
  }

  function reset(){
    pause();
    remaining = totalSeconds;
    render();
  }

  
  playBtn.addEventListener('click', toggle);
  topPlayIcon.addEventListener('click', toggle);

  
  resetBtn.addEventListener('click', reset);

  
  timeDisplay.addEventListener('click', () => {
    if (running) return;
    const input = prompt('Введите минуты:', Math.floor(totalSeconds / 60));
    const mins = parseInt(input, 10);
    if (!isNaN(mins) && mins > 0 && mins <= 180){
      totalSeconds = mins * 60;
      remaining = totalSeconds;
      render();
      modeBtns.forEach(b => b.classList.remove('active'));
    }
  });

  
  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      pause();
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const mins = parseInt(btn.dataset.min, 10);
      totalSeconds = mins * 60;
      remaining = totalSeconds;
      sessionLabel.textContent = mins === 25 ? 'Время фокуса' : 'Время отдыха';
      render();
    });
  });

  
  let musicOn = false;
  musicIcon.addEventListener('click', () => {
    musicOn = !musicOn;
    musicIcon.classList.toggle('on', musicOn);
  });

  
  function buildRain(){
    rain.innerHTML = '';
    for (let i = 0; i < 70; i++){
      const d = document.createElement('div');
      d.className = 'drop';
      d.style.left = Math.random() * 100 + '%';
      d.style.width = d.style.height = (2 + Math.random() * 2) + 'px';
      d.style.animationDuration = (4 + Math.random() * 5) + 's';
      d.style.animationDelay = (Math.random() * 6) + 's';
      d.style.opacity = 0.4 + Math.random() * 0.5;
      rain.appendChild(d);
    }
  }
  buildRain();

  let rainOn = false;
  weatherIcon.addEventListener('click', () => {
    rainOn = !rainOn;
    rain.classList.toggle('active', rainOn);
    weatherIcon.classList.toggle('on', rainOn);
  });

  
  backBtn.addEventListener('click', () => {
    if (history.length > 1){
      history.back();
    } else {
      alert('Назад — здесь вы обычно вернётесь к списку задач.');
    }
  });

  render();
})();
