# Handoff: Mobilne usługi — Dorabianie kluczy + Wyrób pieczątek (z dojazdem)

## Overview
Dwie nowe podstrony SEO w serwisie **serwiswrybnej.pl** (repo `NextShopClient` + `NextShopBackend`), promujące usługę mobilną: dorabianie kluczy i wyrób pieczątek z dojazdem do klienta na terenie Krakowa i okolic, dostawa w 2h. Celem jest lepsze pozycjonowanie pod frazy „dorabianie kluczy z dojazdem do klienta” oraz „wyrób pieczątek ekspresowo z dojazdem do klienta” — stąd dwie osobne podstrony zamiast jednej wspólnej.

## About the design files
Pliki `.html` w tym folderze (`klucze-mobilne.reference.html`, `pieczatki-mobilne.reference.html`) to **referencje projektowe** stworzone w prototypie — pokazują docelowy układ, treść i zachowanie, NIE kod produkcyjny do wklejenia. Zadanie: odtworzyć ten projekt w istniejącym środowisku repo (**Next.js 14 (App Router) + TypeScript + Tailwind** na froncie, **Django + DRF** na backendzie), używając wzorców i komponentów już obecnych w kodzie — nie nowego frameworku.

## Fidelity
**Wysoka wierność (hifi)**: kolory, typografia, teksty i struktura sekcji w plikach referencyjnych są ostateczne. Odtwórz układ i treść pixel-perfect, ale zbuduj go z istniejących komponentów Tailwind/React repo (`NavBar`, `Footer`, karty produktowe itd.) zamiast inline-style z prototypu.

## Kontekst repo (WAŻNE — przeczytaj kod przed startem)
- Frontend: `github.com/KennyDaktyl/NextShopClient` (branch `master`)
- Backend: `github.com/KennyDaktyl/NextShopBackend` (branch `master`, Django)
- Istniejący wzorzec kategorii usług: `src/app/uslugi/page.tsx` (kategoria „Usługi”, pobiera dane przez `getMenuItems`, pola `meta_title`, `meta_description`, `seo_text` — to już jest **edytowalne z Django admina**, użyj tego samego mechanizmu).
- Istniejący wzorzec pojedynczej usługi: `src/app/usluga/[productSlug]/page.tsx` + `ServiceDetailsComponent` — usługi typu „Dorobienie klucza mieszkaniowego”, „Programowanie kluczy samochodowych” już istnieją jako produkty w kategorii `uslugi` (zobacz `slugsToGenerate` w tym pliku).
- Backend ma apki: `web/categories`, `web/products`, `web/deliveries`, `web/cms`. Ceny produktów (`web/products`) i dostawy (`web/deliveries`) już są zarządzalne z Django admina — **nie twórz nowego systemu cen od zera**, rozszerz istniejące modele.

**Zanim zaczniesz kodować: przeejrzyj `web/categories/models.py`, `web/products/models.py`, `web/deliveries/models.py` oraz `src/components/category/CategoryDetails.tsx` i `src/components/product/atoms/ServiceDetailsComponent.tsx`, żeby dopasować się do istniejących konwencji (typy, nazwy pól API, stylowanie Tailwind, komponent karty produktu, SideBar/menu).**

## Zadanie krok po kroku

### 1. Backend (Django) — dwie nowe podkategorie + pola logistyczne
1. W `web/categories` dodaj (przez admin lub fixture/migrację danych) dwie nowe podkategorie pod istniejącą kategorią `uslugi`:
   - `mobilne-dorabianie-kluczy` — nazwa „Mobilne dorabianie kluczy”, `meta_title`: „Dorabianie kluczy z dojazdem do klienta — Kraków”, `meta_description` i `seo_text` wg treści w pliku referencyjnym (sekcja „Obszar działania”).
   - `mobilne-wyrob-pieczatek` — nazwa „Mobilne pieczątki”, `meta_title`: „Wyrób pieczątek ekspresowo z dojazdem do klienta — Kraków”, `meta_description`/`seo_text` analogicznie z drugiego pliku referencyjnego.
2. Dodaj do każdej kategorii produkty odpowiadające kartom usług z referencji (ceny edytowalne w adminie, pole `price` już istnieje w `web/products`):
   - Klucze: „Klucze mieszkaniowe” (od 15 zł/szt.), „Klucze samochodowe” (od 180 zł), „Zdalniki i piloty” (od 150 zł), „Klucze zabezpieczone” (od 35 zł/szt.).
   - Pieczątki: „Pieczątki firmowe” (od 45 zł), „Pieczątki imienne” (od 40 zł), „Pieczątki samotuszujące” (od 55 zł), „Pieczątki z datownikiem” (od 50 zł), „Pieczątki drewniane” (od 35 zł), „Duplikaty i naprawy” (od 40 zł).
3. **Nowe pole konfiguracyjne „minimum logistyczne”** — potrzebujesz go edytowalnego z Django admina, osobno dla każdej z dwóch usług:
   - Rozszerz `web/deliveries` (lub dodaj mały model `MobileServiceSettings` w `web/cms` czy `web/categories` — wybierz miejsce najbliższe konwencji repo) o pola:
     - `min_keys_qty` (int, domyślnie 3) — minimalna liczba kluczy na dojazd bez dopłaty.
     - `min_stamp_order_value` (decimal, domyślnie 100.00 zł) — minimalna wartość zamówienia na pieczątki bez dopłaty za dojazd.
     - `wholesale_qty` (int, domyślnie 10) — próg ilościowy do ceny hurtowej (wspólny dla obu usług lub osobno, wg wygody).
     - `wholesale_discount_percent` (int, domyślnie 15).
   - Zarejestruj model w `web/admin.py` (`web/*/admin.py`) tak, żeby właściciel serwisu mógł to zmieniać sam, bez dewelopera.
   - Wystaw te wartości w istniejącym API kategorii/menu (rozszerz serializer `web/categories` lub dodaj mały endpoint w `web/cms/views_api.py`) tak, by front mógł je pobrać przy renderze strony (SSR/ISR), a nie hardkodować.
4. Numer telefonu, link WhatsApp (`https://wa.me/48<numer>`) i link Messenger (`https://m.me/<strona>`) — sprawdź czy jest już gdzieś w repo (np. w danych kontaktowych firmy w adminie/CMS) skąd je pobrać; jeśli nie ma, dodaj proste pola tekstowe do istniejącego modelu ustawień firmy (contact settings), żeby też były edytowalne z panelu.

### 2. Frontend (Next.js) — dwie strony
1. Utwórz trasy zgodnie z istniejącą konwencją repo (prawdopodobnie `src/app/uslugi/[productSlug]/page.tsx` już obsługuje podkategorie usług przez `getMenuItems` — sprawdź, czy wystarczy dodać wpisy kategorii w kroku 1, czy potrzebny jest dedykowany route). Jeśli potrzebny nowy layout inny niż generyczny `CategoryDetails`, stwórz:
   - `src/app/uslugi/mobilne-dorabianie-kluczy/page.tsx`
   - `src/app/uslugi/mobilne-wyrob-pieczatek/page.tsx`
   
   Każda strona: `generateMetadata` z `meta_title`/`meta_description`/`canonical` (wzoruj się na `src/app/uslugi/page.tsx`), `JsonLd` z `generateCategoryJsonLd` jak w istniejącym wzorcu.

2. Zbuduj sekcje strony (kolejność i treść — patrz plik referencyjny danej usługi):
   - **Hero**: H1 z frazą kluczową + dojazdem, opis 2-3 zdania, dwa CTA (Zadzwoń / WhatsApp), oraz karta z minimalnym zamówieniem logistycznym (wartość z API, nie hardkod).
   - **Karty usług/produktów**: siatka 4 kolumn (klucze) / 3 kolumny (pieczątki) — użyj istniejącego komponentu karty produktu z `src/components/product/`, zasilonego danymi z API kategorii (nie duplikuj cen ręcznie w JSX).
   - **Cennik i warunki dojazdu**: dwie karty (minimum logistyczne, cena hurtowa) + lista cen — wartości progu i rabatu pobrane z nowego pola konfiguracyjnego (krok 1.3), nie hardkodowane, żeby właściciel mógł je zmieniać bez wdrożenia.
   - **Obszar działania / SEO**: akapit + siatka miejscowości z unikalną frazą usługa+miejscowość na kartę (treść w plikach referencyjnych, sekcja „Obszar działania”).
   - **Kontakt**: trzy równe karty — Zadzwoń (`tel:`), WhatsApp (`https://wa.me/...`), Messenger (`https://m.me/...`) — użyj numeru/linków z ustawień kontaktowych (krok 1.4), nie hardkoduj w komponencie.
3. **WhatsApp i Messenger na obu stronach** (wymóg klienta): dodaj też do wspólnego `Footer` lub jako mały pływający/inline `ContactBar` komponent reużywalny między obiema stronami usług mobilnych (i ewentualnie w przyszłości na innych stronach usługowych), zamiast kopiować markup w dwóch miejscach.
4. Dodaj wzajemne linki między obiema podstronami (breadcrumb + link w menu/nawigacji), tak jak w plikach referencyjnych (`Mobilne dorabianie kluczy` ↔ `Mobilne pieczątki`).
5. Dodaj obie strony do `src/app/sitemap.ts` i upewnij się, że linkują się z istniejącej strony `src/app/uslugi/page.tsx` (np. jako wyróżnione kafle na górze listy usług).

## Design tokens (z plików referencyjnych)
- Font: Montserrat (400/500/600/700) — zgodnie z już używanym stylem repo, jeśli inny font jest ustawiony w `globals.css`/Tailwind config, zachowaj ISTNIEJĄCY font repo zamiast wymuszać Montserrat.
- Kolory: tło strony `#ffffff`, tło sekcji naprzemiennie `#f3f4f6`; tekst główny `#1f2937`, tekst pomocniczy `#4b5563`/`#6b7280`; akcent/linki `#2563eb`; przycisk główny `#1f2937` (hover `#111827`); WhatsApp `#25D366` (hover `#1ea952`); Messenger `#0084FF` (hover `#0066cc`).
- Promienie: karty i przyciski `border-radius: 8px` (przyciski kontaktowe pastylkowe `6px`).
- Cienie: karty `box-shadow: 0 1px 3px rgba(0,0,0,0.06)` do `0 4px 16px rgba(0,0,0,0.12)` na obrazkach.
- Siatki: hero `1.2fr / 1fr`, karty usług 4 kolumny (mobile: 1 kolumna), karty pieczątek 3 kolumny, obszar działania `auto-fit minmax(230px, 1fr)`.

## Teksty (dokładna treść do wykorzystania)

### Strona „Mobilne dorabianie kluczy”
- H1: „Dorabianie kluczy z dojazdem do klienta — Kraków i okolice”
- Lead: „Klucze mieszkaniowe, samochodowe i do skrzynek pocztowych dorabiamy na miejscu — u Ciebie w domu, biurze lub na parkingu. Bez wizyty w punkcie stacjonarnym w Rybnej. Dojazd na terenie Krakowa i okolic w ciągu 2 godzin od zamówienia.”
- Sekcja obszaru: „Dorabiamy klucze mieszkaniowe i samochodowe z dojazdem do klienta na terenie Krakowa i okolicznych miejscowości. Klucz dostarczamy do 2 godzin od przyjęcia zamówienia — bez konieczności przyjazdu do punktu w Rybnej.”
- Miejscowości + frazy: patrz `areaCards` w pliku referencyjnym (12 miejscowości, unikalna fraza usługa+miejscowość każda).

### Strona „Mobilne pieczątki”
- H1: „Wyrób pieczątek ekspresowo z dojazdem do klienta”
- Lead: „Pieczątki firmowe, imienne i samotuszujące projektujemy i wykonujemy tego samego dnia, z dostawą prosto do Ciebie — do domu lub biura. Dojazd na terenie Krakowa i okolic w ciągu 2 godzin od zatwierdzenia projektu.”
- Sekcja obszaru: „Wyrób pieczątek ekspresowo z dojazdem do klienta świadczymy na terenie Krakowa i okolicznych miejscowości. Projekt akceptujesz zdalnie, a gotową pieczątkę dostarczamy do 2 godzin — bez wizyty w punkcie w Rybnej.”
- Miejscowości + frazy: patrz `areaCards` w pliku referencyjnym.

Dokładne nazwy/opisy/ceny kart usług i pieczątek — patrz tablice `keyTypes`/`stampTypes`/`prices` w odpowiednich plikach `.reference.html` (sekcja `<script>` na dole pliku, czytelny JS).

## Assets
- `logo-serwiswrybnej-pl.webp` — logo firmy, już istnieje w repo pod `public/images/logo-serwiswrybnej-pl.webp`, nie kopiuj ponownie.
- `pieczatka-przyklad.webp` — przykładowe zdjęcie pieczątki, użyte na stronie pieczątek; źródło: `public/images/profesjonalne-pieczatki-firmowe-i-imienne-na-zamowienie-online_350x350.webp` w repo — użyj tego pliku lub podmień na docelowe zdjęcie klienta.

## Pliki w tym pakiecie
- `klucze-mobilne.reference.html` — pełna referencja wizualna i treściowa strony kluczy (otwórz w przeglądarce).
- `pieczatki-mobilne.reference.html` — pełna referencja wizualna i treściowa strony pieczątek.
- `assets/` — logo i zdjęcie przykładowe użyte w referencji.

## Do potwierdzenia z klientem przed wdrożeniem
- Prawdziwy numer telefonu / link WhatsApp / link Messenger (w referencji użyto danych przykładowych: telefon `506 029 980`, `wa.me/48506029980`, `m.me/serwiswrybnej`) — podmień na prawdziwe dane firmy.
- Prawdziwe zdjęcia z realizacji (referencja nie zawiera galerii — jeśli klient chce, dodać sekcję ze zdjęciami z pracy w terenie).
