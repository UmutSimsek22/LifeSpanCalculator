# ⏳ Zamanın İzinde (LifeSpan Calculator & Life Stats)

Bu web uygulaması, kullanıcının doğum tarihini açılır kutulardan (Dropdown) seçerek ne kadar süredir hayatta olduğunu milisaniyesine kadar canlı (ticking) olarak hesaplayan ve eğlenceli yaşam istatistikleri sunan modern, tek sayfalık (SPA) bir web arayüzüdür.



## 🌟 Özellikler

* **Canlı Zaman Akışı (Ticking Ticker)**: Milisaniye hassasiyetinde hayatta kaldığınız süreyi gerçek zamanlı olarak gösteren neon sayaç.
* **Detaylı Takvim Kırılımı**: Miladi takvime göre artık yıllar ve ay günleri tam olarak hesaba katılarak hesaplanmış *Yıl, Ay, Hafta, Gün* verileri.
* **Eğlenceli Yaşam Verileri**:
  * 🫀 **Tahmini Kalp Atış Sayısı**: Ortalama 80 BPM ile toplam kalp atışı.
  * 💨 **Alınan Nefes Sayısı**: Dakikada 16 nefes ile ciğerlerinizdeki hava döngüsü.
  * 💤 **Uykuda Geçen Zaman**: Ömrünüzün ortalama 1/3'ünü uykuda geçirdiğiniz süre (gün ve yıl kırılımıyla).
  * 🎁 **Gelecek Doğum Günü Geri Sayımı**: Yeni yaşınızı kutlamanıza kalan gün, saat ve dakika.
  * ✨ **Zodyak Burcu ve Elementi**: Doğum gününüze göre otomatik belirlenen burcunuz ve elementiniz.
  * ☕ **Tüketilen Öğün Sayısı**: Hayatınız boyunca yediğiniz tahmini ana yemek sayısı.
* **Modern Tasarım**: Koyu mod, cam efekti (glassmorphic), yumuşak gradyan geçişleri ve Lucide ikonları ile premium bir arayüz.

## 🛠️ Kullanılan Teknolojiler

* **HTML5**: Semantik yapı ve veri girişleri.
* **CSS3 (Vanilla)**: Grid & Flexbox düzeni, Backdrop Filter (Cam efekti), Özel neon gölgeler ve animasyonlar.
* **JavaScript (ES6)**: Dinamik gün sayısı kontrolü, gerçekçi takvim matematiği, canlı zamanlayıcı (Timer) ve istatistik hesaplama mantığı.

## 📐 Matematiksel Hesaplama Mantığı (Gerçek Miladi Takvim)

Uygulama, standart takvim günlerini baz alarak artık yıl farklarını ve ayların farklı uzunluklarını (28/29, 30, 31) otomatik dengeler:
1. `Yıl Farkı = Bugünün Yılı - Doğum Yılı`
2. `Ay Farkı = Bugünün Ayı - Doğum Ayı`
3. `Gün Farkı = Bugünün Günü - Doğum Günü`
4. Gün farkı negatif çıkarsa, bir önceki ayın toplam gün sayısı eklenir ve Ay farkı 1 azaltılır.
5. Ay farkı negatif çıkarsa, 12 ay eklenir ve Yıl farkı 1 azaltılır.
6. Kalan artık gün sayısı 7'ye bölünerek **Hafta** ve **Kalan Gün** bulunur.

## 🚀 Nasıl Çalıştırılır?

Projeyi çalıştırmak için herhangi bir derleyici veya yerel sunucu kurulumuna gerek yoktur:
1. Bu depoyu klonlayın:
   ```bash
   git clone https://github.com/KULLANICI_ADINIZ/LifeSpanCalculator.git
   ```
2. Proje klasörüne gidin ve `index.html` dosyasını çift tıklayarak tarayıcınızda açın.

---

## 🤖 Geliştirme Süreci

Bu proje AI destekli (AI-assisted) bir workflow ile geliştirilmiştir; mantık ve yapı tarafımdan tasarlanmış, kod yazımında AI araçlarından (Antigravity) yardım alınmıştır.

*Zamanın kıymetini bilmek, onu nasıl harcadığımızı görmekten geçer.
