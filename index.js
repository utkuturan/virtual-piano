/* ==========================================================================
   MÜHENDİS PİYANOSU - ANA MOTOR
   (Veriler songs.js dosyasından çekilir)
   ========================================================================== */

const keys = document.querySelectorAll('.key'); /*keys(NodeList) içindeki tüm veriler HTML altındaki divlerin .key sınıfından çekildi*/
const audioCache = {}; /* Ses önbelleği */

// 1. SESLERİ YÜKLE
keys.forEach(key => {  /* Her tuş için */
    const soundName = key.dataset.sound; /* data-sound özelliğini al */
    const audio = new Audio(`24-piano-keys/${soundName}.mp3`); /* Ses dosyasını oluştur */
    audio.preload = 'auto'; /* Ön yükleme */
    audioCache[soundName] = audio; /* Önbelleğe ekle */
});

// 2. NOTA ÇALMA FONKSİYONU
function playNote(keyElement) { /* Tuş elementi alır */
    const soundName = keyElement.dataset.sound; /* Ses adını al */
    const originalAudio = audioCache[soundName]; /* Önbellekten sesi al */
    
    if (originalAudio) { /* Ses varsa */
        const soundClone = originalAudio.cloneNode(); /* Klonla */
        soundClone.play().catch(e => console.warn(e)); /* Çal ve hataları yakala */
    }

    keyElement.classList.add('pressed'); /* Görsel efekt için sınıf ekle */
    setTimeout(() => {  /* Kısa süre sonra sınıfı kaldır */
        keyElement.classList.remove('pressed');
    }, 150);
}

// 3. OLAY DİNLEYİCİLERİ
// keys listesindeki HER BİR tuş (div) için şunu yap:
keys.forEach(key => key.addEventListener('click', () => playNote(key))); /* Tıklama için */

// --- (Dokunmatik Ekranlar İçin) ---
keys.forEach(key => {
    key.addEventListener('touchstart', (e) => {
        /*e.preventDefault(); // 1. Telefonun "beklemesini" ve ekranın kaymasını engelle*/
        playNote(key);      // 2. Hemen notayı çal
    });
});

// --- (Klavye İçin) ---
document.addEventListener('keydown', (e) => { /* Klavye için */
    if (e.repeat) return; /* Basılı tutmayı engelle yani tekrarları yoksay*/
    const keyChar = e.key.toLowerCase(); /* Basılan tuşu al */
    const keyElement = document.querySelector(`.key[data-key="${keyChar}"]`); /* İlgili tuşu bul */
    if (keyElement) playNote(keyElement); /* Nota çal */
});

// 4. MÜZİK KUTUSU MOTORU (RİTİMLİ)
let songTimeouts = []; /* Zamanlayıcı ID'lerini saklar */

function playSelectedSong() { /* Seçilen şarkıyı çalar */
    const selector = document.getElementById('songSelect'); /* Seçici elemanı */
    const selectedValue = selector.value; /* Seçilen değer */
    
    // songs objesi artık songs.js dosyasından otomatik geliyor
    if (selectedValue && songs[selectedValue]) { /* Geçerli şarkı mı? */
        playSong(selectedValue); /* Şarkıyı çal */
    } else { /* Geçersiz seçim */
        alert("Lütfen listeden bir şarkı seçin!"); /* Uyarı ver */
    }
}

function playSong(songName) { /* Şarkı adını alır */
    stopMusic(); /* Önceki şarkıyı durdur */
    const stopBtn = document.querySelector('.stop-btn'); /* Durdur butonu */
    if(stopBtn) stopBtn.classList.add('playing-now'); /* Oynatma durumunu göster */

    const song = songs[songName]; /* Şarkı verisini al */
    console.log(`${songName} başlatılıyor... Tempo: ${song.tempo}`); /* Konsola bilgi */

    let accumulatedTime = 0; /* Toplam gecikme süresi */

    song.notes.forEach((noteData) => { /* Her nota için */
        const keyChar = noteData[0]; /* Tuş karakteri */
        const durationMultiplier = noteData[1]; /* Süre çarpanı */
        
        const timerId = setTimeout(() => { /* Zamanlayıcı ayarla */
            const keyElement = document.querySelector(`.key[data-key="${keyChar}"]`); /* Tuşu bul, Interpolation(Şablon giydirme) var, ${.....} ile dinamik değişken kullanacağımızı söylüyoruz */ 
            if (keyElement) playNote(keyElement); /* Nota çal */
        }, accumulatedTime); /* Gecikme süresi */

        accumulatedTime += (song.tempo * durationMultiplier); /* Toplam süreyi güncelle */
        songTimeouts.push(timerId); /* Zamanlayıcı ID'sini sakla */
    });

    const endTimerId = setTimeout(() => { /* Şarkı bitince */
        if(stopBtn) stopBtn.classList.remove('playing-now'); /* Oynatma durumunu kaldır */
        console.log(`${songName} bitti.`); /* Konsola bilgi */
    }, accumulatedTime + 500); /* Küçük bir ek gecikme */
    
    songTimeouts.push(endTimerId); /* Bitiş zamanlayıcısını sakla */
}

function stopMusic() { /* Çalan müziği durdurur */
    songTimeouts.forEach(id => clearTimeout(id)); /* Tüm zamanlayıcıları temizle */
    songTimeouts = [];  /* Listeyi sıfırla */
    const stopBtn = document.querySelector('.stop-btn'); /* Durdur butonu */
    if(stopBtn) stopBtn.classList.remove('playing-now'); /* Oynatma durumunu kaldır */
    console.log("Müzik durduruldu."); /* Konsola bilgi */
}