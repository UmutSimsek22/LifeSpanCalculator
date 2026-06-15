document.addEventListener('DOMContentLoaded', () => {
    const daySelect = document.getElementById('birthDay');
    const monthSelect = document.getElementById('birthMonth');
    const yearSelect = document.getElementById('birthYear');
    const dateForm = document.getElementById('dateForm');
    const setupCard = document.getElementById('setupCard');
    const resultsContainer = document.getElementById('resultsContainer');
    const recalculateBtn = document.getElementById('recalculateBtn');

    let timerInterval = null;
    let birthDate = null;

    // 1. Dropdown Doldurma
    function initDropdowns() {
        const currentYear = new Date().getFullYear();
        
        // Yılları Doldur (Cari yıldan 1900'e geri)
        for (let y = currentYear; y >= 1900; y--) {
            const opt = document.createElement('option');
            opt.value = y;
            opt.textContent = y;
            yearSelect.appendChild(opt);
        }

        // Günleri başlangıçta 31 gün olarak doldur
        updateDaysDropdown();
    }

    // Seçilen ay ve yıla göre gün sayısını güncelle
    function updateDaysDropdown() {
        const selectedMonth = monthSelect.value;
        const selectedYear = yearSelect.value;
        
        let daysInMonth = 31; // Varsayılan

        if (selectedMonth !== "") {
            const month = parseInt(selectedMonth);
            const year = selectedYear !== "" ? parseInt(selectedYear) : 2024; // Yıl seçilmediyse artık yıl olabilecek varsayılan bir yıl
            
            // JavaScript'te bir sonraki ayın 0. günü, önceki ayın son gününü verir (yani seçilen ayın gün sayısı)
            daysInMonth = new Date(year, month + 1, 0).getDate();
        }

        // Mevcut seçimi korumaya çalış
        const previousSelection = daySelect.value;
        
        // Gün dropdown temizle
        daySelect.innerHTML = '<option value="" disabled selected>Seçiniz</option>';

        for (let d = 1; d <= daysInMonth; d++) {
            const opt = document.createElement('option');
            opt.value = d;
            opt.textContent = d;
            daySelect.appendChild(opt);
        }

        // Eğer eski seçilen gün hala geçerliyse geri yükle
        if (previousSelection && parseInt(previousSelection) <= daysInMonth) {
            daySelect.value = previousSelection;
        }
    }

    monthSelect.addEventListener('change', updateDaysDropdown);
    yearSelect.addEventListener('change', updateDaysDropdown);

    // 2. Burç ve Element Hesaplama
    function getZodiacSign(day, month) {
        const zodiacSigns = [
            { name: "Oğlak", element: "Toprak", icon: "mountain", start: { m: 11, d: 22 }, end: { m: 0, d: 19 } },
            { name: "Kova", element: "Hava", icon: "wind", start: { m: 0, d: 20 }, end: { m: 1, d: 18 } },
            { name: "Balık", element: "Su", icon: "waves", start: { m: 1, d: 19 }, end: { m: 2, d: 20 } },
            { name: "Koç", element: "Ateş", icon: "flame", start: { m: 2, d: 21 }, end: { m: 3, d: 19 } },
            { name: "Boğa", element: "Toprak", icon: "leaf", start: { m: 3, d: 20 }, end: { m: 4, d: 20 } },
            { name: "İkizler", element: "Hava", icon: "users", start: { m: 4, d: 21 }, end: { m: 5, d: 20 } },
            { name: "Yengeç", element: "Su", icon: "shield", start: { m: 5, d: 21 }, end: { m: 6, d: 22 } },
            { name: "Aslan", element: "Ateş", icon: "sun", start: { m: 6, d: 23 }, end: { m: 7, d: 22 } },
            { name: "Başak", element: "Toprak", icon: "align-left", start: { m: 7, d: 23 }, end: { m: 8, d: 22 } },
            { name: "Terazi", element: "Hava", icon: "scale", start: { m: 8, d: 23 }, end: { m: 9, d: 22 } },
            { name: "Akrep", element: "Su", icon: "skull", start: { m: 9, d: 23 }, end: { m: 10, d: 21 } },
            { name: "Yay", element: "Ateş", icon: "compass", start: { m: 10, d: 22 }, end: { m: 11, d: 21 } },
            { name: "Oğlak", element: "Toprak", icon: "mountain", start: { m: 11, d: 22 }, end: { m: 11, d: 31 } }
        ];

        // Ay bazlı arama yapalım
        for (let sign of zodiacSigns) {
            // Aralık-Ocak geçişi Oğlak için özel durum kontrolü
            if (sign.name === "Oğlak") {
                if ((month === 11 && day >= 22) || (month === 0 && day <= 19)) {
                    return sign;
                }
            } else {
                if (month === sign.start.m && day >= sign.start.d) return sign;
                if (month === sign.end.m && day <= sign.end.d) return sign;
            }
        }
        return { name: "Bilinmeyen", element: "Bilinmeyen", icon: "help-circle" };
    }

    // 3. Yaş ve İstatistik Hesaplama Mantığı
    function calculateStaticStats(birth, now) {
        const diffMs = now - birth;
        const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const totalMinutes = Math.floor(diffMs / (1000 * 60));

        // Kalp Atışı (Ortalama 80 BPM)
        const heartbeats = Math.round(totalMinutes * 80);
        document.getElementById('statHeartbeats').textContent = heartbeats.toLocaleString('tr-TR');

        // Alınan Nefes (Ortalama 16/dakika)
        const breaths = Math.round(totalMinutes * 16);
        document.getElementById('statBreaths').textContent = breaths.toLocaleString('tr-TR');

        // Uyku Süresi (Ömrün 1/3'ü)
        const sleepDays = Math.round(totalDays / 3);
        if (sleepDays >= 365) {
            const sleepYears = (sleepDays / 365).toFixed(1);
            document.getElementById('statSleep').textContent = `${sleepDays.toLocaleString('tr-TR')} Gün (~${sleepYears} Yıl)`;
        } else {
            document.getElementById('statSleep').textContent = `${sleepDays.toLocaleString('tr-TR')} Gün`;
        }

        // Tüketilen Öğün (Günde 3 ana öğün)
        const meals = Math.round(totalDays * 3);
        document.getElementById('statMeals').textContent = meals.toLocaleString('tr-TR');

        // Burç Belirleme
        const zodiac = getZodiacSign(birth.getDate(), birth.getMonth());
        document.getElementById('statZodiac').textContent = zodiac.name;
        document.getElementById('statZodiacDesc').textContent = `Element: ${zodiac.element} | Yıldız Grubu`;
        
        // Burç İkonunu Güncelle
        const zodiacIconWrapper = document.querySelector('.zodiac-icon');
        zodiacIconWrapper.innerHTML = `<i data-lucide="${zodiac.icon}"></i>`;
        lucide.createIcons();

        // Sonraki Doğum Günü Geri Sayımı
        updateBirthdayCountdown(birth, now);

        // Detaylı Takvim Kırılımı (Gerçek Yıl, Ay, Hafta, Gün)
        calculateCalendarBreakdown(birth, now);
    }

    function calculateCalendarBreakdown(start, end) {
        let years = end.getFullYear() - start.getFullYear();
        let months = end.getMonth() - start.getMonth();
        let days = end.getDate() - start.getDate();

        if (days < 0) {
            // Bir önceki ayın gün sayısını ekle
            const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }

        if (months < 0) {
            months += 12;
            years--;
        }

        const weeks = Math.floor(days / 7);
        const remainingDays = days % 7;

        document.getElementById('breakYears').textContent = years;
        document.getElementById('breakMonths').textContent = months;
        document.getElementById('breakWeeks').textContent = weeks;
        document.getElementById('breakDays').textContent = remainingDays;
    }

    function updateBirthdayCountdown(birth, now) {
        let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate(), 0, 0, 0, 0);
        
        // Eğer bu seneki doğum günü geçtiyse önümüzdeki seneye ayarla
        if (nextBday < now) {
            nextBday.setFullYear(now.getFullYear() + 1);
        }

        const diffMs = nextBday - now;
        const daysLeft = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const hoursLeft = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minsLeft = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        const countdownElement = document.getElementById('statBirthdayCountdown');
        
        if (daysLeft === 0 && hoursLeft === 0 && minsLeft === 0) {
            countdownElement.textContent = "Bugün Doğum Gününüz! 🎉";
            countdownElement.classList.add('birthday-active');
        } else {
            countdownElement.classList.remove('birthday-active');
            if (daysLeft > 0) {
                countdownElement.textContent = `${daysLeft} Gün, ${hoursLeft} Saat kaldı`;
            } else {
                countdownElement.textContent = `${hoursLeft} Saat, ${minsLeft} Dakika kaldı`;
            }
        }
    }

    // 4. Canlı Ticker Döngüsü
    function startLiveTicker() {
        const valDays = document.getElementById('valDays');
        const valHours = document.getElementById('valHours');
        const valMinutes = document.getElementById('valMinutes');
        const valSeconds = document.getElementById('valSeconds');
        const valMs = document.getElementById('valMs');

        function update() {
            const now = new Date();
            const diffMs = now - birthDate;

            if (diffMs < 0) {
                // Hatalı durum
                clearInterval(timerInterval);
                alert("Hata: Doğum tarihi gelecekte olamaz!");
                showSetup();
                return;
            }

            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
            const ms = diffMs % 1000;

            valDays.textContent = days.toLocaleString('tr-TR');
            valHours.textContent = hours.toString().padStart(2, '0');
            valMinutes.textContent = minutes.toString().padStart(2, '0');
            valSeconds.textContent = seconds.toString().padStart(2, '0');
            valMs.textContent = ms.toString().padStart(3, '0');
        }

        // İlk güncellemeyi hemen yap
        update();
        // 33 milisaniyede bir (~30 FPS) güncelle
        timerInterval = setInterval(update, 33);
    }

    // Arayüz Geçişleri
    function showResults() {
        setupCard.classList.add('hidden');
        resultsContainer.classList.remove('hidden');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function showSetup() {
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        resultsContainer.classList.add('hidden');
        setupCard.classList.remove('hidden');
    }

    // Form Submit Olayı
    dateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const day = parseInt(daySelect.value);
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);

        // Doğum tarihini oluştur (Saat 00:00:00)
        birthDate = new Date(year, month, day, 0, 0, 0, 0);
        const now = new Date();

        if (birthDate > now) {
            alert("Gelecekte mi doğdunuz? Lütfen geçerli bir doğum tarihi giriniz.");
            return;
        }

        // Statik hesaplamaları çalıştır
        calculateStaticStats(birthDate, now);

        // Canlı sayacı başlat
        startLiveTicker();

        // Arayüzü göster
        showResults();
    });

    recalculateBtn.addEventListener('click', showSetup);

    // Uygulamayı Başlat
    initDropdowns();
});
