# Projeyi GitHub ve Netlify ile Canlıya Alma

Bu doküman, Firebase Studio'da oluşturduğunuz Next.js projesini GitHub'a yükleyip Netlify üzerinden nasıl canlıya alacağınızı adım adım açıklar.

## Ön Koşullar

1.  **GitHub Hesabı:** Kodunuzu barındırmak için bir [GitHub](https://github.com/) hesabınız olmalı.
2.  **Netlify Hesabı:** Projenizi yayınlamak için bir [Netlify](https://app.netlify.com/) hesabınız olmalı.
3.  **Firebase Projesi:** Canlı veritabanı için bir [Firebase projesi](https://console.firebase.google.com/) oluşturmuş olmalısınız.

---

### Adım 1: Projeyi GitHub'a Yükleme

1.  **Yerel Git Reposu Oluşturma:**
    Eğer projenizde henüz bir git reposu yoksa, terminali açıp proje ana dizininde şu komutları çalıştırın:
    ```bash
    git init
    git add .
    git commit -m "İlk proje dosyaları"
    ```

2.  **GitHub'da Yeni Repo Oluşturma:**
    GitHub hesabınıza gidin ve "New repository" diyerek yeni bir repo oluşturun. Repo adını projenize uygun bir isimle (örneğin, `sinif-takip-uygulamasi`) belirleyin. Repoyu **private** (özel) olarak ayarlamanız önerilir.

3.  **Yerel Repoyu GitHub'a Bağlama ve Yükleme:**
    GitHub'da repoyu oluşturduktan sonra size verilen komutları kendi terminalinizde çalıştırın. Bu komutlar genellikle şuna benzer olacaktır:
    ```bash
    git remote add origin https://github.com/KULLANICI_ADINIZ/REPO_ADINIZ.git
    git branch -M main
    git push -u origin main
    ```

---

### Adım 2: Projeyi Netlify'da Canlıya Alma

1.  **Netlify'da Yeni Site Oluşturma:**
    *   Netlify panonuza giriş yapın ve "Add new site" -> "Import an existing project" butonuna tıklayın.
    *   "Deploy with GitHub" seçeneğini seçin ve GitHub hesabınıza erişim izni verin.
    *   Az önce oluşturduğunuz repoyu (örneğin, `sinif-takip-uygulamasi`) listeden seçin.

2.  **Derleme Ayarlarını Yapılandırma:**
    Netlify, projenizi bir Next.js projesi olarak tanıyacaktır. Ayarlar genellikle otomatik olarak doğru şekilde doldurulur:
    *   **Build command:** `next build`
    *   **Publish directory:** `.next`

3.  **En Önemli Adım: Ortam Değişkenlerini (Environment Variables) Ayarlama:**
    Uygulamanızın canlıda Firebase projenize bağlanabilmesi için Firebase yapılandırma anahtarlarını Netlify'a eklemeniz gerekir.

    *   "Show advanced" butonuna, ardından "New variable" butonuna tıklayın.
    *   Projenizdeki `.env` veya `.env.local` dosyasında bulunan her bir anahtar-değer çiftini buraya tek tek ekleyin. Örneğin:
        *   **Key:** `NEXT_PUBLIC_FIREBASE_API_KEY`, **Value:** `AIzaSy...` (kendi anahtarınız)
        *   **Key:** `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, **Value:** `proje-adi.firebaseapp.com`
        *   Tüm `NEXT_PUBLIC_` ile başlayan anahtarları bu şekilde ekleyin.

    ![Netlify Ortam Değişkenleri](https://raw.githubusercontent.com/firebase-studio/docs/main/guides/images/netlify-env-vars.png)

4.  **Projeyi Yayınlama (Deploy):**
    *   Tüm değişkenleri ekledikten sonra "Deploy site" (veya "Deploy `main`") butonuna tıklayın.
    *   Netlify, projenizi GitHub'dan alacak, derleyecek ve size özel bir URL (`https://proje-adi-rastgele.netlify.app`) üzerinden yayınlayacaktır.

---

### Projeyi Güncelleme

Bundan sonra projenizde yaptığınız değişiklikleri `main` branch'ine `git push` komutu ile gönderdiğinizde, Netlify bu değişiklikleri otomatik olarak algılayacak